'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | undefined;
  //   setOnline: (status: boolean) => void;
  //   setLastSeen: (lastSeen: string | undefined) => void; // Update the type of setLastSeen function
  //   lastSeen: string | undefined;
  //   online: boolean | undefined;
}

const SocketContext = createContext<SocketContextType | undefined>({
  socket: undefined,
});

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket>();

  const [online, setOnline] = useState<boolean | undefined>(false); // Update the type of online state
  const [lastSeen, setLastSeen] = useState<string | undefined>();

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || '', {
      transports: ['polling', 'websocket'],
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  //   useEffect(() => {
  //     if (!socket) return;
  //     if (userData?._id) {
  //       socket.emit('authenticate', userData._id);
  //       socket.on('checkedReceiverStatus', (data: any) => {
  //         setOnline(data?.checkAvlReceiverStatus?.isOnline);
  //         if (data?.checkAvlReceiverStatus?.lastSeen) {
  //           let formatTime = formatLastSeen(
  //             data?.checkAvlReceiverStatus?.lastSeen
  //           );
  //           setLastSeen(formatTime);
  //         }
  //       });
  //     }

  //     return () => {
  //       socket.off('checkedReceiverStatus');
  //     };
  //   }, [socket, userData]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        // online,
        // lastSeen,
        // setOnline,
        // setLastSeen,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
