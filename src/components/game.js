import React, { useEffect, useState, useRef } from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";
import Confetti from "react-native-confetti";
import { levels } from "../assets";
import useInterval from "../hooks/useInterval";
import {
  getRandomNumber,
  combineTwoColors,
  getRandomColor,
  getRandomInt
} from "../utils";

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
  const [topColor, setTopColor] = useState([]);
  const [bottomColor, setBottomColor] = useState([]);
  const [rightAnswer, setRightAnswer] = useState([]);
  const [isRunning, setIsRunning] = useState(true);
  const [index, setIndex] = useState(1);
  const [options, setOptions] = useState([[], []]);

  useEffect(() => {
    console.log("hit");
    const blue = props.navigation.getParam("topColor", [0, 0, 256]);
    const yellow = props.navigation.getParam("bottomColor", [256, 256, 0]);
    blue[2] -= getRandomNumber(0, 10.6);
    yellow[0] += getRandomNumber(0, 10.6);
    yellow[1] += getRandomNumber(0, 10.6);
    const green = combineTwoColors(blue, yellow);

    setTopColor(blue);
    setBottomColor(yellow);
    setRightAnswer(green);

    const temp = [green];
    for (let i = 0; i < levels[0].options; i++) {
      temp.push(getRandomColor(blue, yellow));
    }
    setOptions(temp);
  }, [props.navigation]);

  useInterval(
    () => {
      // setIndex((index + 1) % (levels[level].options + 1));
      setIndex(getRandomInt(0, options.length));
    },
    isRunning ? 1000 : null
  );

  const _onPressButton = () => {
    setIsRunning(false);
    if (options[index] == rightAnswer) {
      const blue = topColor;
      const yellow = bottomColor;
      blue[2] -= getRandomNumber(0, 10.6);
      yellow[0] += getRandomNumber(0, 10.6);
      yellow[1] += getRandomNumber(0, 10.6);
      setTopColor(blue);
      setBottomColor(yellow);
      const green = combineTwoColors(blue, yellow);
      setRightAnswer(green);
      const temp = [green];
      for (let i = 0; i < levels[level + 1].options; i++) {
        temp.push(getRandomColor(blue, yellow));
      }
      setOptions(temp);
      setLevel(prev => prev + 1);
      setIsRunning(true);
    } else {
      alert(`Good Job! You Reached Level ${level + 1}!`);
      if (_confettiView.current && level > 10) {
        _confettiView.current.startConfetti();
      }
    }
  };

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
        >
          <Text>
            {level + 1}
            {`rgb(${topColor.join()})`}
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={_onPressButton}>
        <View
          style={{
            ...styles.colorBlock,
            backgroundColor: `rgb(${options[index].join()})`
          }}
        >
          <Text>{options[index] == rightAnswer ? "Click Now" : "Wait!"}</Text>
        </View>
      </TouchableHighlight>
      <View
        style={{
          ...styles.colorBlock,
          backgroundColor: `rgb(${bottomColor.join()})`
        }}
      >
        <Text>{`rgb(${bottomColor.join()})`}</Text>
      </View>
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
