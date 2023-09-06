import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { BACKGROUND_SIGNUP, fontFamily } from "@assets";
import { storage } from "@shared-state";
import { BackgroundApp, TextField, TextView } from "@components";
import { DimensionsStyle } from "@resources";

export const getImageUrl = (path: string) => {
  try {
    const [url, setUrl] = React.useState<string | undefined>();
    const getUrl = async () => {
      const result = await storage.ref(path).getDownloadURL();
      if (result) setUrl(result);
    };
    getUrl();
    return url;
  } catch (error) {
    console.error("Error getting image URL:", error);
    return undefined;
  }
};

const _SignUp = () => {
  return (
    <BackgroundApp uri={getImageUrl(BACKGROUND_SIGNUP)}>
      <SafeAreaView>
        <View style={_styles.headlineStyle}>
          <TextView title="Hey, mừng bạn đến với" />
          <TextView
            title="Pepsi Tết"
            textStyle={_styles.textPepsiHeadlineStyle}
          />
        </View>

        <TextView title="Đăng ký" textStyle={_styles.textSignUpStyle} />
        <TextField placeholder="Số điện thoại" />
        <TextField placeholder="Tên người dùng" />
      </SafeAreaView>
    </BackgroundApp>
  );
};

const _styles = StyleSheet.create({
  headlineStyle: {
    marginTop: DimensionsStyle.width * 0.23,
  },

  textPepsiHeadlineStyle: {
    fontSize: 30,
    fontFamily: fontFamily.Black721,
  },

  textSignUpStyle: {
    textTransform: "uppercase",
    fontFamily: fontFamily.Black721,
    fontSize: 24,
    marginTop: DimensionsStyle.width * 0.15,
  },
});

export const SignUp = React.memo(_SignUp);
