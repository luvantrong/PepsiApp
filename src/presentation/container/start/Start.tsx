import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BackgroundApp } from "@components";
import { BACKGROUND_START, BUTTON_THELE, IMAGE_HEADLINE, IMAGE_TALEN } from "@assets";
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
        <View style={_styles.styleViewButton}>
          <Pressable>
            <Image source={{ uri: BUTTON_THELE }} />
          </Pressable>
        </View>
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
    bottom: 35,
  },

  styleViewButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export const Start = React.memo(_Start);
