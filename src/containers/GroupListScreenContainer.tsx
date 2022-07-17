import GroupListScreen from "../screens/GroupListScreen";
import {useMainStore} from "../store/useMainStore";
import socketIOClient, {Socket} from "socket.io-client";
import {useCallback, useEffect, useRef, useState} from "react";
import {ANDROID_SOCKET_SERVER_URL, SOCKET_SERVER_URL} from "../constants/constant";
import {Platform} from "react-native";
import {Center, Spinner} from "native-base";
import {useNavigation} from "@react-navigation/native";

const GroupListScreenContainer = () => {
  const [name, setName] = useMainStore(s => [s.name, s.setName]);
  const [roomList, setRoomList] = useState<Room[]>([]);
  const socketRef = useRef<Socket>();
  const navigation = useNavigation<any>();
  const ROOM_LIST_EVENT = "rooms";

  useEffect(() => {
    socketRef.current = socketIOClient(Platform.OS === 'android' ? ANDROID_SOCKET_SERVER_URL : SOCKET_SERVER_URL)
    socketRef.current.on(ROOM_LIST_EVENT, (data: any) => {
      setRoomList(data);
    })
    return () => {
      socketRef.current?.disconnect();
    }
  },[])

  const handleChangeName = useCallback((name: string) => {
    setName(name);
  },[setName])

  const handleJoinSelectedGroup = useCallback((roomId: string) => {
    navigation.navigate("GroupChatScreen", {
      roomId: roomId,
    });
  },[socketRef])

  const handleGoToScreen = useCallback((screenName: string) => {
    navigation.navigate(screenName);
  },[])

  return (
    <>
      {
        roomList.length > 0 ?
          <GroupListScreen rooms={roomList}
                           name={name}
                           handleJoinSelectedGroup={handleJoinSelectedGroup}
                           handleGoToScreen={handleGoToScreen}
                           handleChangeName={handleChangeName}/>
          :
          <Center w="100%" h="100%">
            <Spinner size="lg" color="blue.500"/>
          </Center>
      }
    </>
  )
}

export default GroupListScreenContainer;
