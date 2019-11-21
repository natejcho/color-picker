import React from "react";
import { StyleSheet } from "react-native";
import RedYellow from "./src/components/redYellow";

export default function App() {
  return <RedYellow />;
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
