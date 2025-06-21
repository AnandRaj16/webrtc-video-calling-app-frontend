import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';

const Room: React.FC = () => {

    const { id } = useParams();
    const { socket, user } = useContext(SocketContext);

    const fetchParticipantList = ({roomId, participants}: {roomId: string, participants: string[]}) => {
        console.log("fetch room participants");
        console.log(roomId, participants);
    }

    useEffect(() => {
        // Emitting this event so that either creator of room or joinee in the room
        // anyone is added the server knows that the pwople have been added
        // to this room
        if(user) {
            console.log("New user with id", user._id, "has joined room", id);
            socket.emit("joined-room", {roomId: id, peerId: user._id})
            socket.on("get-users", fetchParticipantList);
        };
    }, [id, user, socket]);

    return (
        <div>
            room : {id}
        </div>
    )
}

export default Room;