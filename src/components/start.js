import React, { useState } from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";
import { getRandomColor } from "../utils";

const styles = StyleSheet.create({
  colorBlock: {
    flexBasis: "33.33%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },

  container: {
    flex: 1,
    resizeMode: "cover"
  }
});

const Start = props => {
  const [center, setCenter] = useState([38, 189, 127]);

  const changeTheme = () => {
    setCenter(getRandomColor([128, 256, 128], [0, 128, 0]));
  };

  const _onPressButton = () => {
    props.navigation.navigate("Game", {
      center
    });
  };

  const goToLeaderBoard = () => {
    props.navigation.navigate("LeaderBoard");
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={changeTheme}>
        <View
          style={{
            ...styles.colorBlock,
            backgroundColor: `rgb(${center.join()})`
          }}
        />
      </TouchableHighlight>
      <TouchableHighlight onPress={_onPressButton}>
        <View
          style={{
            ...styles.colorBlock,
            backgroundColor: `rgb(${center.join()})`
          }}
        >
          <Text style={{ color: "white" }}>START!</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={goToLeaderBoard}>
        <View
          style={{
            ...styles.colorBlock,
            backgroundColor: `rgb(${center.join()})`
          }}
        />
      </TouchableHighlight>
    </View>
  );
};

export default Start;
