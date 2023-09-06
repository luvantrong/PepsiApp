import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { fontFamily } from "@assets";

type Props = {
  boldTexts: string[];
  text: string;
  boldStyle?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const _TextViewBold: React.FC<Props> = (props) => {
  const { boldTexts, text } = props;
  const getTextWithBoldAndUpper = (text: string, boldTexts: string[]) => {
    const regex = new RegExp(`(${boldTexts.join("|")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) => {
      const isBoldAndUpper = boldTexts.includes(part);
      return isBoldAndUpper ? (
        <Text
          key={index}
          style={StyleSheet.flatten([_styles.textBold, props.boldStyle])}
        >
          {part}
        </Text>
      ) : (
        <Text key={index}>{part}</Text>
      );
    });
  };

  return (
    <View style={StyleSheet.flatten([_styles.container, props.viewStyle])}>
      <Text style={StyleSheet.flatten([_styles.text, props.textStyle])}>
        {getTextWithBoldAndUpper(text, boldTexts)}
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
  textBold: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  text: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
  },
});

export const TextViewBold = React.memo(_TextViewBold);
