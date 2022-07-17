import {FC} from "react";
import {
  ScrollView,
  VStack,
  Text,
  HStack,
  Icon,
  Box,
  Pressable,
  PresenceTransition,
  Input,
  Divider,
  Heading
} from "native-base";
import {Feather, MaterialIcons} from "@expo/vector-icons";

interface GroupListScreenProps {
  rooms: Room[]
  name: string;
  handleChangeName: (name: string) => void;
  handleJoinSelectedGroup: (groupId: string) => void;
  handleGoToScreen: (screenName: string) => void;
}

const GroupListScreen:FC<GroupListScreenProps> = (
  {
    rooms,
    name,
    handleChangeName,
    handleGoToScreen,
    handleJoinSelectedGroup
  }
) => {
  const renderRoomList = () => {
    let roomElements: JSX.Element[] = [];
    rooms.forEach((room, index) => {
      roomElements.push(
        <PresenceTransition key={room.id} visible initial={{
          opacity: 0,
          translateY: -20
        }} animate={{
          opacity: 1,
          translateY: 0,
          transition:{
            duration: 200 * index
          }
        }}>
          <Pressable onPress={() => handleJoinSelectedGroup(room.id)}>
            <Box m={3}
                 borderRadius={15}
                 bg="white"
                 shadow={5}>
              <HStack p={4} justifyContent="flex-start" alignItems="flex-start">
                <Box bg="muted.100" borderRadius={30} p={3}>
                  <Icon as={MaterialIcons} name="group" size={8}/>
                </Box>
                <VStack pl={2}>
                  <Text fontWeight={700} fontSize={16}>{room.title}</Text>
                  {
                    room.message ?
                      <Text fontWeight={200}
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            w={48}>{`${room.message.name}: ${room.message.message}`}</Text>
                      :
                      null
                  }
                </VStack>
              </HStack>
              <Box bg="blue.400" position="absolute" right={0} w={4} h="full" borderRightRadius={15} borderBottomRightRadius={15}/>
            </Box>
          </Pressable>
        </PresenceTransition>
      )
    })
    return roomElements;
  }
  return (
    <ScrollView >
      <VStack safeArea mb={4} h="100%" key="main vstack">
        {/*<Input variant="unstyled"*/}
        {/*       value={name}*/}
        {/*       size="xl"*/}
        {/*       pl={4}*/}
        {/*       onChangeText={(val) => handleChangeName(val)}/>*/}
        <VStack mx={4} mt={2} justifyContent="flex-start" alignItems="flex-start">
          <HStack justifyContent="space-between" alignItems="center" w="100%">
            <Heading size="2xl">Chats</Heading>
            <Pressable onPress={() => handleGoToScreen("ProfileScreen")}>
              <Feather name="settings" size={20} color="black"/>
            </Pressable>

          </HStack>
          <Divider borderRadius={5} w={32} bg={{
            linearGradient: {
              colors: ["lightBlue.100", "blue.500"],
              start: [0, 0],
              end: [1, 0]
            }
            }} h={1}/>
        </VStack>
        {renderRoomList()}
      </VStack>
    </ScrollView>
  )
}

export default GroupListScreen;
