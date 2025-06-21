import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import UserFeedPlayer from '../component/UserFeedPlayer';

const Room: React.FC = () => {

    const { id } = useParams();
    const { socket, user, stream } = useContext(SocketContext);

    useEffect(() => {
        // Emitting this event so that either creator of room or joinee in the room
        // anyone is added the server knows that the pwople have been added
        // to this room
        if(user) {
            console.log("New user with id", user._id, "has joined room", id);
            socket.emit("joined-room", {roomId: id, peerId: user._id})
        };
    }, [id, user, socket]);

    return (
        <div>
            room : {id}
            <UserFeedPlayer stream = {stream} />
        </div>
    )
}

export default Room;