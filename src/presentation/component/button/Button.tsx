import {
  ImageBackground,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import React from "react";
import { fontFamily } from "@assets";
import { Colors, DimensionsStyle } from "@resources";
import { TextViewBold } from "../textBold";

export type ButtonProps = {
  title: string;
  titleSmall?: string;
  titleSmallStyle?: StyleProp<TextStyle>;
  pressableStyle?: StyleProp<ViewStyle>;
  uriImage?: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: (screen?: string) => void;
  sumPlay: string;
};

const _Button: React.FC<ButtonProps> = (props) => {
  const { uriImage, title, onPress, titleSmall, sumPlay } = props;

  const handlePress = () => {
    onPress && onPress();
  };

  return uriImage ? (
    <ImageBackground
      style={StyleSheet.flatten([_styles.container, props.pressableStyle])}
      source={{ uri: uriImage }}
    >
      <Pressable onPress={handlePress} style={{ width: "100%" }}>
        <Text style={StyleSheet.flatten([_styles.textStyle, props.textStyle])}>
          {title}
        </Text>
        {titleSmall && <TextViewBold text={titleSmall} boldTexts={[sumPlay]} />}
      </Pressable>
    </ImageBackground>
  ) : (
    <Pressable
      onPress={handlePress}
      style={StyleSheet.flatten([_styles.container, props.pressableStyle])}
    >
      <Text style={StyleSheet.flatten([_styles.textStyle, props.textStyle])}>
        {title}
      </Text>
    </Pressable>
  );
};

const _styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: DimensionsStyle.width * 0.6,
    resizeMode: "stretch",
    overflow: "hidden",
    borderColor: Colors.BORDER_GRAY,
    borderWidth: 1,
    backgroundColor: Colors.BLACK_PLA,
  },

  textStyle: {
    fontSize: 18,
    fontFamily: fontFamily.Black721,
    color: Colors.WHITE,
    marginBottom: 2,
    textAlign: "center",
  },

  textSmallStyle: {
    display: "none",
    textAlign: "center",
    fontSize: 10,
    fontFamily: fontFamily.medium,
    color: Colors.WHITE,
  },
});

export const Button = React.memo(_Button);
