import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import React from "react";
import { fontFamily } from "@assets";
import { Colors } from "@resources";

export type TextViewProps = {
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  textStyle?: StyleProp<TextStyle>;
};

const _TextView: React.FC<TextViewProps> = (props) => {
  const { title } = props;
  return (
    <View style={StyleSheet.flatten([_styles.container, props.containerStyle])}>
      <Text style={StyleSheet.flatten([_styles.textStyle, props.textStyle])}>
        {title}
      </Text>
    </View>
  );
};

const _styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  textStyle: {
    fontFamily: fontFamily.medium,
    color: Colors.WHITE,
    fontSize: 18,
  },
});
export const TextView = React.memo(_TextView);
