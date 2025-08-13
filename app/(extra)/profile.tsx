import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

export default function Profile() {
  return (
     <SafeAreaView style={{ flex: 1,  marginTop: 26,   }}>
        <View  >
            <Text style={{  color:"black" }}> 
                Profile
            </Text>
            <Text>
                this is profile page
            </Text>
            <Text style={{ color: "black" }}>
            </Text>
        </View>
       <StatusBar  barStyle="dark-content" />
     </SafeAreaView>
  );
}
