import { useState,useEffect,useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import audio from "../../sounds/chat-mesagge.mp3";
export  function Chat({socket,username,room}){
  const [currentMeesagge,setCurrentMesagge] = useState("");
  const [messageList,setMessageList] = useState([]);
  const audioRef=useRef();

  const sendMessage = async ()=>{
    if(currentMeesagge!==""){
      let time = new Date(Date.now());
      time = time.getHours()+':'+time.getMinutes()
      const messageData = {
        room,
        author:username,
        mesagge:currentMeesagge,
        time
      }
      await socket.emit("send_message",messageData)
      setMessageList((list)=>[...list,messageData])
      setCurrentMesagge("");
    }
  } 
  useEffect(()=>{
    socket.on("receive_message",(data)=>{
      setMessageList((list)=>[...list,data])
      audioRef.current.play()
    })  
  },[socket])
    return(
        <section className="chat">
            <header>
              <p>Live Chat</p>
              <span>Room {room}</span>
            </header>
          <ScrollToBottom className="body-chat">
            <div className="body-messages">
              {
                messageList.map((messageContent,i)=>{
                  return(
                    <div key={i} className={`mesagge ${username===messageContent.author? 'me' : 'other'}`}>
                      <div>
                        {
                          messageContent.mesagge.includes('http') ? 
                          <a href={messageContent.mesagge}  target="_blank">{messageContent.mesagge}</a>
                          : <h3>{messageContent.mesagge}</h3>
                        }
                      </div>
                      <footer>
                        <span className="author">{messageContent.author}</span>
                        <span className="time">{messageContent.time}</span>
                      </footer>
                    </div>
                  )
                })
              }
            </div>
          </ScrollToBottom>
          <footer>
            <input value={currentMeesagge} type="text" placeholder="Hey..." onChange={(e)=>setCurrentMesagge(e.target.value)} onKeyUp={(e)=>e.key==="Enter" && sendMessage(e.target.value)}/>
            <button onClick={sendMessage}>&#9658;</button>
          </footer>
          <audio ref={audioRef}>
            <source src={audio} type="audio/mpeg"/>
          </audio>
        </section>
    )
}