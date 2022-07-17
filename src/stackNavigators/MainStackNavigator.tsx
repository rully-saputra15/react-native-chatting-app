import {createNativeStackNavigator} from "@react-navigation/native-stack";
import GroupChatScreenContainer from "../containers/GroupChatScreenContainer";
import GroupListScreenContainer from "../containers/GroupListScreenContainer";
import ProfileScreenContainer from "../containers/ProfileScreenContainer";

export const MainStackNavigator = ({navigation} : any) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="GroupListScreen" screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="GroupListScreen"
                    component={GroupListScreenContainer}
      />
      <Stack.Screen name="GroupChatScreen"
                    component={GroupChatScreenContainer} />
      <Stack.Screen name="ProfileScreen"
                    component={ProfileScreenContainer} />
    </Stack.Navigator>
  )
}
