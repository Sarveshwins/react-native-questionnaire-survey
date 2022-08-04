import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";

const IndicatorProgress = (props) => {
  const { indicator, length, indexNumber } = props;
  return (
    <SafeAreaView
      style={{
        width: "80%",

        alignSelf: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Text style={{ fontSize: 10, color: "#C057D8" }}>
          {indexNumber + 1}/{length}
        </Text>
        <Text style={{ fontSize: 10, color: "#C057D8" }}>
          {indicator >= 95
            ? `${Math.floor(Math.max(indicator, 100))}%`
            : `${Math.floor(indicator)}%`}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: 10,
          backgroundColor: "#C4C4C4",
          borderRadius: 10,
          marginBottom: 50,
        }}
      >
        <View></View>
        <View
          style={{
            width:
              indicator >= 95
                ? `${Math.max(indicator, 100)}%`
                : `${Math.floor(indicator)}%`,
            height: "100%",
            backgroundColor: "#C057D8",
            borderRadius: 10,
            position: "absolute",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default IndicatorProgress;

const styles = StyleSheet.create({});
