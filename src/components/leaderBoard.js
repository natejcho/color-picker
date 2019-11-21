import React from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";
import Leaderboard from "react-native-leaderboard";

export default function LeaderBoard() {
  const data = {
    ladder: [
      { userName: "Joe", highScore: 52 },
      { userName: "Jenny", highScore: 120 }
    ]
  };

  return (
    <Leaderboard data={data.ladder} sortBy="highScore" labelBy="userName" />
  );
}
