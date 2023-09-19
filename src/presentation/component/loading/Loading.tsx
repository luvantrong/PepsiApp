import { StyleSheet, ActivityIndicator, SafeAreaView } from "react-native";
import React from "react";

type Props = {
  height?: number;
};

const _Loading: React.FC<Props> = (props) => {
  const { height } = props;
  return (
    <SafeAreaView
      style={[_styles.container, _styles.horizontal, { height: height }]}
    >
      <ActivityIndicator />
    </SafeAreaView>
  );
};

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export const Loading = React.memo(_Loading);
