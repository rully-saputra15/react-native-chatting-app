import {FC} from "react";
import {
  VStack,
  Text,
  ScrollView,
  Button,
  HStack,
  Input,
  Icon,
  Box,
  Divider,
  PresenceTransition,
  Avatar, KeyboardAvoidingView
} from "native-base";
import { Feather, Entypo} from '@expo/vector-icons';
import {Platform} from "react-native";
import moment from "moment";

interface HomeScreenProps {
  messages: Message[];
  name: string;
  currentMessage: string;
  handleSendMessage: () => void;
  handleChangeName: (name: string) => void;
  handleGoBack: () => void;
  handlePickCamera: () => void;
  handleChangeCurrentMessage: (message: string) => void;
}

const GroupChatScreen:FC<HomeScreenProps> = (
  {
    messages,
    name,
    currentMessage,
    handleSendMessage,
    handleChangeName,
    handleGoBack,
    handlePickCamera,
    handleChangeCurrentMessage,
  }
) => {
  const renderMessageList = () => {
    let messageList: JSX.Element[] = [];

    messages.forEach((msg, index) => {
      const formattedTime = moment(msg.time).format('HH:mm')
      messageList.push(
        <PresenceTransition key={`effect ${msg.name} ${index}`} visible initial={{
          opacity: 0,
          translateY: -20
        }} animate={{
          opacity: 1,
          translateY: 0,
          transition: {
            duration: 200 * index
          }
        }}>
          <VStack mb={2}>
            <Box key={`message ${msg.name} ${index}`}
                 p={4}
                 bg="muted.100"
                 mx={2}
                 borderRadius={20}
                 shadow={10}
                 maxW={64}
                 alignSelf={msg.name === name ? "flex-end": "flex-start"}
                 >
              <Text fontWeight={700} fontSize={14}>{msg.name}</Text>
              <Text fontSize={14}>{msg.message}</Text>
            </Box>
            <Text px={4}
                  fontSize={12}
                  fontWeight={200}
                  alignSelf={msg.name === name ? "flex-end": "flex-start"}>
              {formattedTime}
            </Text>
          </VStack>
        </PresenceTransition>
      )
    })
    return messageList;
  }
  const renderHeader = () => {
    return (
      <VStack _android={{
        pt:"4"
      }}>
        <HStack justifyContent="flex-start" alignItems="center">
          <Icon as={Entypo} name="chevron-left" size={9} onPress={handleGoBack}/>
          <Avatar bg="green.500" alignSelf="center" size="md" ml={2} source={{
            uri: Platform.OS === "android"
            ? "https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2876&q=80"
              : "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }}/>
          <Input variant="unstyled"
                 value={name}
                 size="xl"
                 pl={4}
                 onChangeText={(val) => handleChangeName(val)}/>
        </HStack>
        <Divider my={2} bg="blue.400"/>
      </VStack>
    )
  }
  const renderFormMessage = () => (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : "height"}>
      <HStack w="100%"
              bg="white"
              alignItems="center"
              justifyContent="center"
              _android={{
                mb:4
              }}
              _ios={{
                mb:2
              }}
              key="bottom hstack"
      >
        <Input w="80%"
               key="message input"
               mx={2}
               multiline
               rightElement={<Icon as={Feather} name="camera" size={6} color="blue.600" mr={2}/>}
               value={currentMessage}
               borderWidth={1}
               borderColor="muted.200"
               _android={{
                 py: 1
               }}
               _ios={{
                 py: 3
               }}
               borderRadius={15}
               onChangeText={(text) => handleChangeCurrentMessage(text)}/>
        <Button
          bg="blue.500"
          onPress={() => handleSendMessage()}
        >
          <Icon as={Feather} name="send" size={5} color="white"/>
        </Button>
      </HStack>
    </KeyboardAvoidingView>
  )
  return(
    <VStack safeArea mb={4} h="100%" key="main vstack">
      {renderHeader()}
      <ScrollView key="main scroll view" mb={2} showsVerticalScrollIndicator={false}>
        <VStack >
          {renderMessageList()}
        </VStack>
      </ScrollView>
      {renderFormMessage()}
    </VStack>
  )
}

export default GroupChatScreen;
