import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {createContext, useEffect, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
const [userToken, setUserToken]= useState(null);
const login = () => {
    setUserToken(true);
    AsyncStorage.setItem('userToken', 'loggedin' )
}
const logout = ()=> {
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
}
const isLoggedIn= async () =>{
    try{

        let userToken = await AsyncStorage.getItem('userToken');
        setUserToken(userToken);
    }
    catch(err){
        console.log(`isLoggedin Error ${e}`)

    }
} 
useEffect(()=>{
isLoggedIn();
},[])

    return(
        <AuthContext.Provider value={{login, logout, userToken}} >
            {children}
        </AuthContext.Provider>
    )
}