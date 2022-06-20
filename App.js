//imports
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import imagey from './Assets/MayhewShortLogoDark.png';
import imagex from './Assets/MayhewShortLogoBright.png';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

//app central development block
const App =  () => {

  const [toggle, setToggle] = useState(false);
  const handleChangeToggle = ()=>setToggle((oldToggle)=>!oldToggle);
  
  //turning on/off the cellphone's flashlight
  useEffect(()=>{
    Torch.switchState(toggle);
    console.log('trocou estado da lanterna')
  },[toggle]);

  //listening the shake event and changing toggle variable's value
  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    //this function will be called when the component be unmounted.
    return () => subscription.remove();
  }, []);

  return (
  <View style = {toggle ? style.containerLight : style.container}>
    <TouchableOpacity onPress = {handleChangeToggle}>
      <Image style = {style.boltOn} 
      source = {toggle
      ? imagex
      : imagey
      }/>
      </TouchableOpacity>
    </View>
  );
};
export default App;

//stylesheets
const style = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'black', 
    alignItems: 'center',
    justifyContent: 'center', 
  },
  containerLight:{
    flex: 1,
    backgroundColor: 'white', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  boltOn:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 450,
    height: 450,
  },
});