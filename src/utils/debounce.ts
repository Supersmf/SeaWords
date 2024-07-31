export const debounce = <T,_>(func: (data: T) => void, timeout = 300) => {
  let timer: number;

  return (...args: [data: T]) => {
    clearTimeout(timer);
    
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
