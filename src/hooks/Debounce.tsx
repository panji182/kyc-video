import { useRef } from 'react';

const useDebounce = (duration: number) => {
  const timerRef = useRef<any | null>(null);

  const debouncing = (callback: () => void) => {
    timerRef.current && clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      callback();
    }, duration);
  };
  return { debouncing };
};

export default useDebounce;
