import { StyleSheet, Text, View } from "react-native";
import React from "react";

const _Home = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export const Home = React.memo(_Home);
