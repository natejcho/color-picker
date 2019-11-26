import React, { useEffect, useState, useRef } from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";
import Confetti from "react-native-confetti";
import { levels } from "../assets";
import useInterval from "../hooks/useInterval";

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

const Game = props => {
  const _confettiView = useRef();

  const [level, setLevel] = useState(0);
  const [delay, setDelay] = useState(300);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    props.navigation.getParam("otherParam", "default value");
  }, []);

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
    setLevel(prev => prev + 1);

    alert(`Close! ${Math.abs(mystique) * delay}ms`);
    setIsRunning(false);
    if (_confettiView.current) {
      _confettiView.current.startConfetti();
    }
  };

  // const gameReset = () => {
  //   if (_confettiView.current) {
  //     _confettiView.current.stopConfetti();
  //   }
  //   setIsRunning(false);
  //   setMoney(256);
  //   setMystique(256);
  //   setIsRunning(true);
  // };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => {
          props.navigation.navigate("Home");
        }}
      >
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
          <Text>
            rgb(256, {money}, {mystique})
          </Text>
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
      <Confetti
        ref={_confettiView}
        confettiCount={50}
        duration={3000}
        timeout={30}
      />
    </View>
  );
};

export default Game;

/**
 * red + yellow = orange
 * (256,0,0) + (256,256,0) = (256,128,0)
 * red + blue = violet
 * (256,0,0) + (0,0,256) = (128,0,128)
 * blue + yellow = green
 * (0,0,256) + (256,256,0) = (0,256,0)
 */
