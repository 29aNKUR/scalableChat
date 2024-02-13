'use client';

import { useRef, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";

 const Page = () => {

  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState('');
  
    return (
      <div>

        <div>
          <input onChange = {(e) => setMessage(e.target.value)} className={classes["chat-input"]} placeholder="Message..."/>
          <button onClick = {() => sendMessage(message)} className={classes["button"]}>Send</button>
        </div>
        <div>

          {messages.map(e => <li>{e}</li>)}
        </div>
      </div>
      )
}

export default Page;