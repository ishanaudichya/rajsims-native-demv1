import { View, Text, Button} from 'react-native'
import React,{useContext} from 'react'
import { AuthContext } from '../context/AuthContext';


export default function HomeScreen() {
  const {logout} = useContext(AuthContext);

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Logout" onPress={()=>{logout()}} />
<Text>Welcome to RAJSIMS</Text>
    </View>
  )
}