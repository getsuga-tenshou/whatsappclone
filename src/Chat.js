import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";


function Chat() {
  const [input, setInput] = useState("");

  const [chatImg, setChatImg] = useState("");

  const { roomId } = useParams();

  const [roomName, setRoomName] = useState("");

  const [messages, setMessages] = useState([]);

  const [{user}, dispatch] =useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection('chatRooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      db.collection('chatRooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data()))
      );  
    }
  }, [roomId]);

  useEffect(() => {
    setChatImg(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(input);
    db.collection('chatRooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),

    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_name">
        <Avatar src={`https://avatars.dicebear.com/api/human/${chatImg}.svg`} />
        <div className="chat_info">
          <h3>{roomName}</h3>
          <p>click here for contact info</p>
        </div>
        <div className="room_icons">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map(message => (


        
        <p className={`chatContent ${true && "chatsent"}`}>
          {" "}
          {/*adding a condition for later so that to tell if the msg was sent by the user or the sender */}
          <span className="senderInfo">{message.name}</span>
          {message.message}
          <span className="timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
        </p>
        ))}
      </div>
      <div className="chatFoot">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.Value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>

        <Mic />
      </div>
    </div>
  );
}

export default Chat;
