import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { BackgroundApp } from "@components";
import {
  BACKGROUND_START,
  BUTTON_INSTRUCT,
  BUTTON_RULES,
  ICON_BOTTOM_MIC_ACTIVE,
  IMAGE_HEADLINE,
  IMAGE_TALEN,
} from "@assets";
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
            <Image
              source={{ uri: BUTTON_RULES }}
              style={_styles.styleButtonRulesAndInstruct}
            />
          </Pressable>
          <Pressable>
            <Image
              source={{ uri: ICON_BOTTOM_MIC_ACTIVE }}
              style={_styles.styleButtonMic}
            />
          </Pressable>
          <Pressable>
            <Image
              source={{ uri: BUTTON_INSTRUCT }}
              style={_styles.styleButtonRulesAndInstruct}
            />
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
    bottom: DimensionsStyle.width * 0.075,
  },

  styleViewButton: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: DimensionsStyle.width * 0.32,
  },

  styleButtonRulesAndInstruct: {
    width: DimensionsStyle.width * 0.35,
    height: DimensionsStyle.width * 0.15,
    resizeMode: "stretch",
  },

  styleButtonMic: {
    width: DimensionsStyle.width * 0.3,
    height: DimensionsStyle.width * 0.3,
    resizeMode: "stretch",
    marginHorizontal: -20,
  },
});
export const Start = React.memo(_Start);
