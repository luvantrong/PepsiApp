import {
  StyleSheet,
  View,
  Image,
  StyleProp,
  ImageStyle,
  Pressable,
  ViewStyle,
  Text,
  TextStyle,
} from "react-native";
import React from "react";
import { fontFamily } from "@assets";
import { Colors } from "@resources";

export type HeaderProps = {
  iconLeft: string | undefined;
  onPressLeft?: () => void;
  iconLeftStyle?: StyleProp<ImageStyle>;
  titleCenter: string;
  titleCenterStyle?: StyleProp<TextStyle>;
  iconRight: string | undefined;
  onPressRight?: () => void;
  iconRightStyle?: StyleProp<ImageStyle>;
  loginStatus?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

const _Header: React.FC<HeaderProps> = (props) => {
  const {
    iconLeft,
    onPressLeft,
    titleCenter,
    iconRight,
    onPressRight,
    loginStatus,
  } = props;
  return (
    <View style={StyleSheet.flatten([_styles.container, props.containerStyle])}>
      <Pressable onPress={onPressLeft}>
        <Image
          style={StyleSheet.flatten([_styles.iconLeft, props.iconLeftStyle])}
          source={{ uri: iconLeft }}
        />
      </Pressable>

      <Text
        style={StyleSheet.flatten([
          _styles.titleCenter,
          props.titleCenterStyle,
        ])}
      >
        {titleCenter}
      </Text>

      <Pressable onPress={onPressRight}>
        <Image
          style={StyleSheet.flatten([
            _styles.iconRight,
            props.iconRightStyle,
            { opacity: loginStatus ? 1 : 0 },
          ])}
          source={{ uri: iconRight }}
        />
      </Pressable>
    </View>
  );
};

const _styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingStart: 30,
    paddingEnd: 20,
  },

  iconLeft: {
    width: 9,
    height: 18,
    resizeMode: "stretch",
  },

  titleCenter: {
    fontSize: 24,
    fontFamily: fontFamily.Black721,
    color: Colors.WHITE,
  },

  iconRight: {
    width: 28,
    height: 28,
    display: "flex",
    opacity: 0,
  },
});

export const Header = React.memo(_Header);
