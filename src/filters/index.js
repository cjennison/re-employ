module.exports = (Vue) => {
  Vue.filter('truncate', (value, characterLimit, replacement) => {
    if (!value) {
      return null
    } else if (value.length < characterLimit) {
      return value
    } else {
      const result = value.substring(0, characterLimit)
      if (replacement) {
        return result.concat(replacement)
      } else {
        return result
      }
    }
  });
};