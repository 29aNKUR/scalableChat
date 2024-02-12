//context should execute on client and not on server
"use client" ;
import React, { useCallback, useContext, useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"
interface SocketProviderProps {
    children?: React.ReactNode 
}

interface ISocketContext {
    sendMessage: (msg : string) => any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error(`State is Undefined`);
    return state;
}

//FC-functional component
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | undefined>();

    const sendMessage: ISocketContext['sendMessage'] = useCallback((msg) => {
        console.log("send msg", msg)
        if(socket) {
            socket.emit('event:message', {message: msg});
        }
    },[socket]);


    useEffect(() => {
        const _socket = io("http://localhost:8000");

        return () => {
            _socket.disconnect();
        }
    },[])

    const contextValue: ISocketContext = { sendMessage };

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    )
}