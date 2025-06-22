import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import UserFeedPlayer from '../Components/UserFeedPlayer';

const Room: React.FC = () => {

    const { id } = useParams();
    const { socket, user, stream, peers } = useContext(SocketContext);

    useEffect(() => {
        // Emitting this event so that either creator of room or joinee in the room
        // anyone is added the server knows that the pwople have been added
        // to this room
        if(user) {
            console.log("New user with id", user._id, "has joined room", id);
            socket.emit("joined-room", {roomId: id, peerId: user._id})
        }
    }, [id, user, socket]);

    return (
        <div>
            room : {id}
            <br />
            Your own user feed
            <UserFeedPlayer stream = {stream} />
            <div>
                Others users feed
                {Object.keys(peers).map((peerId) => (
                    <>
                        <UserFeedPlayer key={peerId} stream={peers[peerId].stream} />
                    </>
                ))}
            </div>
        </div>
    )
}

export default Room;