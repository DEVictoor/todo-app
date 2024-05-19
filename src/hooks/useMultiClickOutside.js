import { useEffect } from 'react';

const useMultiClickOutside = func => {
  const refs = [];

  useEffect(() => {
    const handler = event => {
      if (
        refs.every(ref => ref.current && !ref.current.contains(event.target))
      ) {
        func();
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  const register = domNode => {
    refs.push(domNode);
    return domNode;
  };

  return { register };
};

export { useMultiClickOutside };
