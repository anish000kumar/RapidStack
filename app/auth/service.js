const { sendMail } = require('@helpers');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('@config');
const { hash: hashPassword, compare } = require('bcryptjs');
const { crudify } = require('@helpers');

function AuthService(User, fields) {
  const {
    password = 'password',
    hash = 'hash',
    username = ['email'],
    email = 'email',
  } = fields;

  const userCrudMethods = crudify(User);

  async function findByUsername(inputUserName) {
    const queries = [];
    username.forEach(uname => {
      queries.push({
        [uname]: inputUserName,
      });
    });
    const user = await User.findOne({
      $or: queries,
    });
    if (!user) throw Error('Invalid credentials');
    return user;
  }

  async function createOrFail(data) {
    try {
      const user = new User(data);
      await setPassword(user, user[password]);
      return user;
    } catch (err) {
      throw err;
    }
  }

  // saves hashed password for user
  async function setPassword(user, inputPassword) {
    user[password] = await hashPassword(inputPassword, 10);
    await user.save();
    await setResetPasswordHash(user, null);
    return true;
  }

  async function authorizeOrFail(user, inputPassword) {
    const isCorrect = await compare(inputPassword, user[password]);
    if (!isCorrect) throw Error('Incorrect password');
    return true;
  }

  function getToken(user) {
    return jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: config.jwtExpiry,
    });
  }

  async function sendResetPasswordMail(user) {
    //send mail to the user
    await sendMail({
      to: user[email],
      subject: 'Reset Password',
      html: `
              <p>use this link to reset password: </p>
              <a href="http://localhost:3000/api/auth/reset-password/${
                user.id
              }/${user[hash]}"> RESET </a>
            `,
    });
    return true;
  }

  async function setResetPasswordHash(user, value) {
    const hash = value || crypto.randomBytes(64).toString('hex');
    user[hash] = hash;
    await user.save();
    return user;
  }

  function matchHashOrFail(user, hash) {
    if (user[hash] !== hash) throw Error('Invalid hash');
    return true;
  }

  return {
    ...userCrudMethods,
    findByUsername,
    createOrFail,
    setPassword,
    authorizeOrFail,
    getToken,
    sendResetPasswordMail,
    setResetPasswordHash,
    matchHashOrFail,
  };
}

module.exports = AuthService;
