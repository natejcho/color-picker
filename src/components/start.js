import React, { useState, useMemo } from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  colorBlock: {
    color: "white",
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
  const topColor = [center[0] / 2, center[1] / 2, (center[2] + 256) / 2];
  const bottomColor = [
    (center[0] + 256) / 2,
    (center[1] + 256) / 2,
    center[2] / 2
  ];

  const changeTheme = () => {};

  const _onPressButton = () => {
    props.navigation.navigate("Game", {
      topColor,
      center,
      bottomColor
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
            backgroundColor: `rgb(${topColor.join()})`
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
          <Text>START!</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={goToLeaderBoard}>
        <View
          style={{
            ...styles.colorBlock,
            backgroundColor: `rgb(${bottomColor.join()})`
          }}
        />
      </TouchableHighlight>
    </View>
  );
};

export default Start;
