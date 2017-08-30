export default {
  strToBool: str => str.toString().toLowerCase() === 'true',
  boolToStr: condition => (!!condition).toString().toUpperCase(),
};
