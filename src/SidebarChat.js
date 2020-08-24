import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
  const [chatImg, setChatImg] = useState("");
  useEffect(() => {
    setChatImg(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const newRoom = prompt("Enter the name for Chatroom ");

    if (newRoom) {
      // will define what to do later
      db.collection("chatRooms").add({
        name: newRoom,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/chatRooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${chatImg}.svg`} />
        <div className="sidebar_chat_info">
          <h2>{name}</h2>
          <p>Aaj koi naya scam krte hain...</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new ChatRoom</h2>
    </div>
  );
}

export default SidebarChat;
