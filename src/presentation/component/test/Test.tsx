import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { fontFamily } from "@assets";

const _Test = () => {
  return (
    <View>
      <Text style={{ fontFamily: fontFamily.italic }}>Test</Text>
    </View>
  );
};

const _styles = StyleSheet.create({});

export const Test = React.memo(_Test);
