import React, { useState, useRef } from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";
import Confetti from "react-native-confetti";
import useInterval from "../hooks/useInterval";

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

const RedYellow = props => {
  const _confettiView = useRef();

  const [money, setMoney] = useState(256);
  const [mystique, setMystique] = useState(256);
  const [delay, setDelay] = useState(0.1);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      if (money > 165) {
        setMoney(money - 0.35);
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
    if (_confettiView.current) {
      _confettiView.current.startConfetti();
    }
  };

  const gameReset = () => {
    if (_confettiView.current) {
      _confettiView.current.stopConfetti();
    }
    setIsRunning(false);
    setMoney(256);
    setMystique(256);
    setIsRunning(true);
  };

  const goToLeaderBoard = () => {
    props.navigation.navigate("LeaderBoard");
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
      <TouchableHighlight onPress={goToLeaderBoard} underlayColor="white">
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "rgb(256,256,0)"
          }}
        />
      </TouchableHighlight>
      <Confetti
        ref={_confettiView}
        confettiCount={50}
        duration={3000}
        timeout={30}
      />
    </View>
  );
};

export default RedYellow;

/**
 * red + yellow = orange
 * (256,0,0) + (256,256,0) = (256,128,0)
 * red + blue = violet
 * (256,0,0) + (0,0,256) = (128,0,128)
 * blue + yellow = green
 * (0,0,256) + (256,256,0) = (0,256,0)
 */
