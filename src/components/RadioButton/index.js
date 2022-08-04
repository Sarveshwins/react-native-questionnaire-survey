import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const RadioButton = (props) => {
  const { setSelectedOption, isSelected, options, index, answer } = props;
  console.log("answer", answer);

  return (
    <View style={styles.radioButtonCard} key={index}>
      <Text style={styles.optionText}>{options?.optionText}</Text>
      <Pressable
        onPress={() => setSelectedOption(options?.optionValue)}
        style={
          answer === options?.optionValue
            ? styles.circle
            : isSelected(options.optionValue)
            ? styles.circle
            : styles.circleHighlight
        }
      ></Pressable>
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radioButtonCard: {
    // marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.5,
    marginVertical: 3,
    width: "100%",
    borderColor: "#C4C4C4",
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
  },
  question: {},
  circle: {
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: "#C057D8",
  },
  circleHighlight: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 25,
  },
});
