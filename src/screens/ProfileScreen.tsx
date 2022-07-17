import {FC} from "react";
import {VStack, Text, ScrollView, Pressable, Box, Avatar, Input, HStack} from "native-base";
import {Ionicons} from "@expo/vector-icons";

interface ProfileScreenProps {
  updatedName: string;
  isNameChanged: boolean;
  handleGoBack: () => void;
  handleChangeName: (updatedName: string) => void;
  handleSaveName: () => void;
}

const ProfileScreen: FC<ProfileScreenProps> = (
  {
    updatedName,
    isNameChanged,
    handleChangeName,
    handleGoBack,
    handleSaveName
  }
) => {
  return (
    <VStack flex={1} alignItems="center" space="3" mx={4} safeArea>
      <HStack justifyContent="space-between"
              alignItems="center"
              mt={3}
              w="100%">
        <Pressable onPress={handleGoBack}>
          <Ionicons name="chevron-back-circle-outline" size={36} color="black"/>
        </Pressable>
        {
          isNameChanged && (
            <Pressable onPress={handleSaveName}>
              <Text fontWeight="bold" color="blue.500">Save</Text>
            </Pressable>
          )
        }
      </HStack>
      <Avatar bg="blue.300" size="2xl"/>
      <Box w="100%" mx={3}>
        <Input fontWeight="700"
               variant="underlined"
               fontSize={24}
               onChange={(ev) => handleChangeName(ev.nativeEvent.text)}
               _focus={{
                 borderColor: 'blue.500'
               }}
               textAlign="left">
          {updatedName}
        </Input>
      </Box>
    </VStack>
  );
};

export default ProfileScreen;
