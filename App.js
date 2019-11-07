import React, { useState, useEffect } from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [yellowish, setYellowish] = useState(256);
  const [blueish, setBlueish] = useState(256);
  const [gameOver, setGameOver] = useState();

  useEffect(() => {
    setGameOver(
      setInterval(() => {
        setYellowish(yellowish => yellowish - 0.5);
        setBlueish(blueish => blueish - 0.5);
      }, 0.5)
    );
    return () => clearInterval(interval);
  }, []);

  const _onPressButton = () => {
    alert("Close! " + Math.abs(blueish));
    clearInterval(gameOver);
  };

  return (
    <View style={styles.container}>
      <View
        style={{ width: 100, height: 100, backgroundColor: "rgb(255, 255, 0)" }}
      />
      <TouchableHighlight onPress={_onPressButton} underlayColor="white">
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: `rgb(${yellowish}, 255, ${blueish})`
          }}
        />
      </TouchableHighlight>
      <View
        style={{ width: 100, height: 100, backgroundColor: "rgb(0, 0, 255)" }}
      />
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
