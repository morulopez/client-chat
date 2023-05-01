import { useState } from "react";
import { io } from "socket.io-client"
import { Chat } from "./Chat";
import './styles.css';
const socket = io.connect(import.meta.env.VITE_APIURL);
export  function App(){
    const [username,setUsernamae] = useState("");
    const [room,setRoom] = useState("");
    const [showRoom,SetShowRoom] =  useState(false);
    const joinRoom = ()=>{
        if(username!=='' && room!==''){
            socket.emit("join_room",room);
            SetShowRoom(true);
        }
    }
    return(
        <main className="App">
            {
                !showRoom ?
                (
                    <section className="join">
                        <h3>Join A Chat</h3>
                        <input type="text" placeholder="Jesus..." onChange={(e)=>setUsernamae(e.target.value)}/>
                        <input type="text" placeholder="Room Id..."  onChange={(e)=>setRoom(e.target.value)}/>
                        <button onClick={joinRoom}>Join A Room</button>
                    </section>
                )
                :  <Chat socket={socket} username={username} room={room}/>
            }
        </main>
    )
}