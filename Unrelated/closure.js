const myFunc = (num) => {
  return ++num;
};

const once = (func) => {
  let timesRun = 0;
  return (num) => {
    if (timesRun < 1) {
      timesRun++;
      return func(num);
    } else {
      return "already ran once";
    }
  };
};

const myFuncOnce = once(myFunc);

console.log(myFuncOnce(2));
console.log(myFuncOnce(5));
