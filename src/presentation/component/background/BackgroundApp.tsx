import React from "react";
import {
  StyleSheet,
  StatusBar,
  ImageBackground,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Colors } from "@resources";

export type BackgroundProps = {
  children: React.ReactNode;
  uri: string | undefined;
  styleBackground?: StyleProp<ViewStyle>;
};

const _BackgroundApp: React.FC<BackgroundProps> = (props) => {
  const { children, styleBackground, uri } = props;
  return (
    <ImageBackground
      source={{ uri: uri }}
      style={[styles.container, styleBackground]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={"transparent"}
        translucent
      />
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const BackgroundApp = React.memo(_BackgroundApp);
