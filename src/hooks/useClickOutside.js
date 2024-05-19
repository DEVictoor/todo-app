import { useEffect, useRef } from 'react';

const useClickOutside = func => {
  const domNode = useRef();

  useEffect(() => {
    const handler = event => {
      if (domNode.current?.contains(event.target)) return;
      func();
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return domNode;
};

export { useClickOutside };
