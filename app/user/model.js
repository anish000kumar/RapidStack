const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { email } = require('@helpers/validations');
const { mailable } = require('@services/mailService');

const userSchema = Schema(
  {
    firstName: {
      required: [true, 'firstName is required'],
      type: String,
    },
    lastName: String,
    email: {
      required: [true, 'email is required'],
      type: String,
      unique: true,
      validate: email,
    },
    username: {
      required: [true, 'username is required'],
      type: String,
      unique: true,
    },
    password: {
      required: [true, 'password is required'],
      type: String,
    },
    age: Number,
    resetPasswordHash: String,
  },
  {
    timestamps: true,
  }
);

mailable({
  schema: userSchema,
  emailField: 'email',
});

userSchema.plugin(uniqueValidator, {
  message: 'This {PATH} exists already, it should be unique',
});

module.exports = model('User', userSchema);
