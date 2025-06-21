import SocketIoClient from 'socket.io-client';
import { createContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WS_Server = "http://localhost:5500";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WS_Server);


interface Props {
    children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {

    const navigate = useNavigate(); // we will help to programically handle navigation
    useEffect(() => {

        const enterRoom = ({ roomId } : { roomId: string }) => {
            navigate(`/room/${roomId}`);
        }

        // we will transfer the user when we collect an event of room-created from server
        socket.on("room-created", enterRoom); 
    }, []);
    
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
} 

export default SocketContext;

