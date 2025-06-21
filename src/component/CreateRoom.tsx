import React from "react";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const CreateRoom: React.FC = () => {

    const { socket } = useContext(SocketContext);

    const initRoom = () => {
        console.log("Creating a new room", socket);
        socket.emit("create-room");
    }

    return (
        <button onClick={initRoom}
        className="btn btn-secondary"
        >
            Start a new meeting in a new room
        </button>
    )
}

export default CreateRoom;