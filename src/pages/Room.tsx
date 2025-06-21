import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';

const Room: React.FC = () => {

    const { id } = useParams();
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        // Emitting this event so that either creator of room or joinee in the room
        // anyone is added the server knows that the pwople have been added
        // to this room
        socket.emit("joined-room", {roomId: id});
    }, []);

    return (
        <div>
            room : {id}
        </div>
    )
}

export default Room;