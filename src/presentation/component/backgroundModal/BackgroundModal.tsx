import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@resources";

const _BackgroundModal = () => {
  return <View style={_styles.modalBackground}></View>;
};

const _styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: Colors.BG_MODAL,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export const BackgroundModal = React.memo(_BackgroundModal);
