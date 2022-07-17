import {useEffect, useRef, useState} from "react";
import socketIOClient, {Socket} from "socket.io-client";
import {Platform} from "react-native";
import {ANDROID_SOCKET_SERVER_URL, SOCKET_SERVER_URL} from "../constants/constant";
import moment from "moment";

const CHAT_MESSAGE_EVENT = "chat message";
const SEND_MESSAGE_EVENT = "receive message";


const useGroupChat = (roomId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket>();
  useEffect(() => {
    socketRef.current = socketIOClient(Platform.OS === 'android' ? ANDROID_SOCKET_SERVER_URL : SOCKET_SERVER_URL)!;
    socketRef.current?.emit('join room', roomId, (response : any) => {
      setMessages(response)
    })
    socketRef.current?.on(CHAT_MESSAGE_EVENT, (data: any) => {
      setMessages(data);
    })
    // socketRef.current?.on(roomId, (data: any) => {
    //   console.log(data);
    //   setMessages(data);
    // })


    return () => {
      socketRef.current?.disconnect();
    }
  },[])

  const sendMessage = (name: string, message: string) => {
    socketRef.current?.emit(SEND_MESSAGE_EVENT, {
      name: name,
      message: message,
      time: moment().format(),
      roomId: roomId
    })
  }

  return {messages, sendMessage}
}

export default useGroupChat;
