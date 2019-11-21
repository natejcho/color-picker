import React, { useState, useEffect } from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";
import useInterval from "../hooks/useInterval";

export default function App() {
  const [money, setMoney] = useState(256);
  const [mystique, setMystique] = useState(256);
  const [delay, setDelay] = useState(0.1);

  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      if (money > 128) {
        setMoney(money - 0.5);
      }
      if (mystique > 0) {
        setMystique(mystique - 2);
      }
    },
    isRunning ? delay : null
  );

  // Make it faster every second!
  // useInterval(() => {
  //   setDelay(delay / 10);
  // }, 1000);

  const _onPressButton = () => {
    alert(`Close! ${Math.abs(mystique) * delay}ms`);
    setIsRunning(false);
  };

  const gameReset = () => {
    setIsRunning(false);
    setMoney(256);
    setMystique(256);
    setIsRunning(true);
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={gameReset} underlayColor="white">
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "rgb(256,0,0)"
          }}
        />
      </TouchableHighlight>
      <TouchableHighlight onPress={_onPressButton} underlayColor="white">
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: `rgb(256, ${money}, ${mystique})`
          }}
        />
      </TouchableHighlight>
      <Text>
        rgb(256, {money}, {mystique})
      </Text>
      <TouchableHighlight onPress={gameReset} underlayColor="white">
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "rgb(256,256,0)"
          }}
        />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignContent: "space-between",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 100
  }
});

/**
 * red + yellow = orange
 * (256,0,0) + (256,256,0) = (256,128,0)
 * red + blue = violet
 * (256,0,0) + (0,0,256) = (128,0,128)
 * blue + yellow = green
 * (0,0,256) + (256,256,0) = (0,256,0)
 */
