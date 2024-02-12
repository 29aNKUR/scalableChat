//context should execute on client and not on server
"use client" ;
import React, { useCallback, useContext, useEffect } from "react"
import { io } from "socket.io-client"
interface SocketProviderProps {
    children?: React.ReactNode 
}

interface ISocketContext {
    sendMessage: (msg : string) => any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error('State is Undefined');

    return state;
}

//FC-functional component
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const sendMessage: ISocketContext['sendMessage'] = useCallback((msg) => {
        console.log("send msg", msg)
    },[])


    useEffect(() => {
        const _socket = io("http://localhost:8000");

        return () => {
            _socket.disconnect();
        }
    },[])

    return (
        <SocketContext.Provider value={null}>
            {children}
        </SocketContext.Provider>
    )
}