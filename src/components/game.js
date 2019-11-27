import React, { useEffect, useState, useRef } from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";
import Confetti from "react-native-confetti";
import { levels } from "../assets";
import useInterval from "../hooks/useInterval";
import { getRandomColor, getRandomInt } from "../utils";

const styles = StyleSheet.create({
  colorBlock: {
    color: "white",
    flexBasis: "30%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },

  container: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover"
  }
});

const Game = props => {
  const _confettiView = useRef();

  const [level, setLevel] = useState(0);
  const [rightAnswer, setRightAnswer] = useState([]);
  const [isRunning, setIsRunning] = useState(true);
  const [index, setIndex] = useState(1);
  const [options, setOptions] = useState([[], []]);

  useEffect(() => {
    const start = props.navigation.getParam("center", [0, 256, 0]);
    setRightAnswer(start);
    nextLevel(0, start);
  }, [props.navigation]);

  useInterval(
    () => {
      // setIndex((index + 1) % (levels[level].options + 1));
      setIndex(getRandomInt(0, options.length));
    },
    isRunning ? 500 : null
  );

  const nextLevel = (next, correct) => {
    if (next < levels.length) {
      const temp = [];
      for (let i = 0; i < levels[next].correct; i++) {
        temp.push(correct);
      }
      for (let i = 0; i < levels[next].options; i++) {
        temp.push(getRandomColor([0, 128, 0], [128, 256, 128]));
      }
      setOptions(temp);
    }
  };

  const _onPressButton = () => {
    setIsRunning(false);
    const next = level + 1;
    if (options[index] == rightAnswer) {
      nextLevel(next, rightAnswer);
      setLevel(next);
      setIsRunning(true);
    } else {
      alert(`Good Job, You Reached Level ${next}!`);
      if (_confettiView.current && level > 1) {
        _confettiView.current.startConfetti();
      }
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: `rgb(${rightAnswer.join()})`
      }}
    >
      <TouchableHighlight onPress={_onPressButton}>
        <View
          style={{
            ...styles.colorBlock,
            backgroundColor: `rgb(${options[index].join()})`,
            flexBasis: `${30 + 10 * level}%`
          }}
        >
          <Text>{options[index] == rightAnswer ? "Click Now" : "Wait!"}</Text>
        </View>
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
