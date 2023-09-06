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
import { Colors } from "@resources";

export type ButtonProps = {
  title: string;
  pressableStyle?: StyleProp<ViewStyle>;
  uriImage?: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: (screen?: string) => void;
};

const _Button: React.FC<ButtonProps> = (props) => {
  const { uriImage, title, onPress } = props;

  const handlePress = () => {
    onPress && onPress();
  };
  return uriImage ? (
    <ImageBackground
      style={StyleSheet.flatten([_styles.container, props.pressableStyle])}
      source={{ uri: uriImage }}
    >
      <Pressable onPress={handlePress}>
        <Text style={StyleSheet.flatten([_styles.textStyle, props.textStyle])}>
          {title}
        </Text>
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
    marginHorizontal: 20,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    resizeMode: "cover",
    overflow: "hidden",
  },

  textStyle: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: Colors.WHITE,
  },
});

export const Button = React.memo(_Button);
