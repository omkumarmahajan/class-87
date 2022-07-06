import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from 'firebase'

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class Profile extends Component {
 constructor(props){
   super(props)
   this.state = {
    fontsLoaded: false, 
    isEnable : false,
    light_theme : true,
    profile_image : "",
    name : "",
   }
 }

 async _loadFontsAsync()
{
  await Font.loadAsync(customFonts)
  this.setState({fontsLoaded:true})
}

toggleSwitch(){
   var previous_state = this.state.isEnable
   var theme = ! this.state.isEnable ?"dark":"light"
   var updates = {}
   updates["/users/"+firebase.auth().currentUser.uid+"/current_theme"]= theme
   firebase.database().ref().update(updates)
   this.setState({isEnable:!previous_state,light_theme:previous_state})
 }

 async fetchUser(){
   var theme,name ,image
   await firebase.database().ref("/users/"+firebase.auth().currentUser.uid)
   .on("value",function(snapshot){
     theme = snapshot.val().current_theme
     name = `${snapshot.val().first_name}${snapshot.val().last_name}`
     image = snapshot.val().profile_picture
   })
   this.setState({
     light_theme :theme === "light" ? true:false,
     isEnable: theme === "light" ? false:true,
     name:name,
     profile_image: image,
   })
   }
   
 componentDidMount (){
   this._loadFontsAsync();
   this.toggleSwitch();
 }
 

  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
