import ProfileScreen from "../screens/ProfileScreen";
import {useCallback, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {useMainStore} from "../store/useMainStore";

const GroupListScreenContainer = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useMainStore(s => [s.name, s.setName]);
  const [updatedName, setUpdatedName] = useState(name);
  const [isNameChanged, setIsNameChanged] = useState(false);

  useEffect(() => {
    return () => {
      setIsNameChanged(false)
    }
  },[])

  const handleChangeName = useCallback((updatedName: string) => {
    setIsNameChanged(updatedName !== name);
    setUpdatedName(updatedName);
  },[])

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  },[])

  const handleSaveName = useCallback(() => {
    setName(updatedName)
    setIsNameChanged(false)
  },[updatedName])

  return (
    <ProfileScreen updatedName={updatedName}
                   isNameChanged={isNameChanged}
                   handleChangeName={handleChangeName}
                   handleSaveName={handleSaveName}
                   handleGoBack={handleGoBack}/>
  );
};

export default GroupListScreenContainer;
