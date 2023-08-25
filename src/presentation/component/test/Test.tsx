import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { fontFamily } from "@assets";
import { Colors } from "@resources";

const _Test = () => {
  return (
    <SafeAreaView>
      <Text style={{ fontFamily: fontFamily.italic }}>Test</Text>
    </SafeAreaView>
  );
};

const _styles = StyleSheet.create({});

export const Test = React.memo(_Test);
