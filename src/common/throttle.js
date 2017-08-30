export default (func, ms) => {
  let isThrottled = false;
  let savedArgs;
  let savedThis;
  const wrapper = (...args) => {
    if (isThrottled) {
      savedArgs = args;
      savedThis = this;
      return;
    }
    func.apply(this, args);
    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedThis = null;
        savedArgs = savedThis;
      }
    }, ms);
  };
  return wrapper;
};
