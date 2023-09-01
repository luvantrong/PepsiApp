import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BackgroundApp } from "@components";
import { BACKGROUND_START, IMAGE_HEADLINE, IMAGE_TALEN } from "@assets";
import { DimensionsStyle } from "@resources";

const _Start = () => {
  return (
    <BackgroundApp uri={BACKGROUND_START}>
      <SafeAreaView>
        <Image
          source={{ uri: IMAGE_HEADLINE }}
          style={_styles.styleImageHeadline}
        />
        <Image source={{ uri: IMAGE_TALEN }} style={_styles.styleImageTalen} />
      </SafeAreaView>
    </BackgroundApp>
  );
};

const _styles = StyleSheet.create({
  styleImageHeadline: {
    width: DimensionsStyle.width * 0.7,
    height: DimensionsStyle.height * 0.3,
    alignSelf: "center",
    marginTop: DimensionsStyle.width * 0.1,
  },

  styleImageTalen: {
    width: "100%",
    height: DimensionsStyle.height * 0.65,
    resizeMode: "stretch",
    marginTop: -35,
  },
});
export const Start = React.memo(_Start);
