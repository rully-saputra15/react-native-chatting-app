import GroupChatScreen from "../screens/GroupChatScreen";
import useGroupChat from "../hooks/useGroupChat";
import {useCallback, useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useMainStore} from "../store/useMainStore";
import * as ImagePicker from 'expo-image-picker';


const GroupChatScreenContainer = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const roomId = route.params ? route.params.roomId: "";
  const {messages, sendMessage} = useGroupChat(roomId);
  const [name, setName] = useMainStore(s => [s.name, s.setName]);
  const [currentMessage, setCurrentMessage] = useState("");
  const handleSendMessage = useCallback(() => {
    sendMessage(name, currentMessage);
    setCurrentMessage("");
  }, [name, currentMessage]);

  const handleChangeCurrentMessage = useCallback((message: string) => {
    setCurrentMessage(message);
  }, [])

  const handleChangeName = useCallback((name: string) => {
    setName(name);
  },[setName])

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  },[])

  const handlePickCamera = async () => {
    const permissionResult = await ImagePicker.getCameraPermissionsAsync();
    if (!permissionResult.granted) {
      return ;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1
    });
    console.log(result)
  }
  return(
    <GroupChatScreen messages={messages}
                     name={name}
                     handleGoBack={handleGoBack}
                     currentMessage={currentMessage}
                     handleChangeName={handleChangeName}
                     handlePickCamera={handlePickCamera}
                     handleChangeCurrentMessage={handleChangeCurrentMessage}
                     handleSendMessage={handleSendMessage}/>
  )
}

export default GroupChatScreenContainer;
