const email = {
  validator(v) {
    return /^[\w-]+@([\w-]+\.)+[\w-]+$/.test(v);
  },
  message: props => `${props.value} is not valid email`,
};

const useAll = (...validators) => ({
  validator(value) {
    validators.forEach(validator => {
      if (!validator(value)) {
        return false;
      }
      return true;
    });
  },
  message: `validation failed`,
});

module.exports = {
  email,
  useAll,
};
