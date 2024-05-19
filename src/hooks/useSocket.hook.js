import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { toast } from 'sonner';

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_URL_WSS);

    setSocket(newSocket);
    newSocket.on('connect_error', connectError);
    newSocket.on('connect_timeout', connectTimeout);

    return () => {
      newSocket.disconnect();
      newSocket.off('connect_error', connectError);
      newSocket.off('connect_timeout', connectTimeout);
    };
  }, []);

  const connectError = () => {
    // toast.error(
    //   'Lo sentimos, estamos teniendo problemas para conectarnos al servidor.'
    // );
  };

  const connectTimeout = () => {
    // toast.error(
    //   'Lo sentimos, tenemos problemas para actualizar la información en tiempo real.'
    // );
  };

  return socket;
};

export { useSocket };
