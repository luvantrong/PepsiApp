import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  BACKGROUND_SIGNUP,
  BG_GETCODE,
  BG_SIGNIN,
  BG_SIGNIN_CHECK,
  ICON_CHECK,
  fontFamily,
} from "@assets";
import { storage } from "@shared-state";
import { BackgroundApp, Button, TextField, TextView } from "@components";
import { Colors, DimensionsStyle } from "@resources";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@navigation";

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
type PropsType = NativeStackScreenProps<HomeStackParamList, "SignUp">;

const _SignUp: React.FC<PropsType> = (props) => {
  const { navigation } = props;
  const [checkboxState, setCheckboxState] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [backgroundGetCode, setBackgroundGetCode] = useState(BG_GETCODE);

  const checkRemember = () => {
    setCheckboxState(!checkboxState);
  };

  const handlePhoneNumberTextChange = (text: string) => {
    setPhoneNumber(text);
  };

  const handleUserNameTextChange = (text: string) => {
    setUserName(text);
  };

  const handleGoToRules = () => {
    navigation.push("Rules");
  };

  useEffect(() => {
    if (checkboxState && phoneNumber && userName)
      setBackgroundGetCode(BG_SIGNIN_CHECK);
    else setBackgroundGetCode(BG_GETCODE);
  }, [phoneNumber, userName, checkboxState]);

  return (
    <BackgroundApp uri={getImageUrl(BACKGROUND_SIGNUP)}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={_styles.headlineStyle}>
          <TextView title="Hey, mừng bạn đến với" />
          <TextView
            title="Pepsi Tết"
            textStyle={_styles.textPepsiHeadlineStyle}
          />
        </View>

        <TextView title="Đăng ký" textStyle={_styles.textSignUpStyle} />
        <TextField
          placeholder="Số điện thoại"
          value={phoneNumber}
          onChange={handlePhoneNumberTextChange}
        />
        <TextField
          placeholder="Tên người dùng"
          value={userName}
          onChange={handleUserNameTextChange}
        />
        <View style={_styles.viewCheckRulesStyle}>
          <BouncyCheckbox
            onPress={checkRemember}
            isChecked={checkboxState}
            fillColor={Colors.WHITE}
            size={20}
            innerIconStyle={{
              borderRadius: 9,
            }}
            iconStyle={{
              borderRadius: 9,
            }}
            checkIconImageSource={ICON_CHECK}
          />
          <Text style={[_styles.textCheckRulesStyle, { marginStart: -10 }]}>
            Tôi đã đọc và đồng ý với
          </Text>
          <Pressable onPress={handleGoToRules}>
            <Text
              style={[
                _styles.textCheckRulesStyle,
                {
                  color: Colors.YELLOW,
                  fontFamily: fontFamily.Black721,
                  marginBottom: 1,
                },
              ]}
            >
              {" "}
              thể lệ chương trình
            </Text>
          </Pressable>
          <Text style={_styles.textCheckRulesStyle}> Pepsi Tết.</Text>
        </View>
        <View style={_styles.viewButtonStyle}>
          <Button
            title="Lấy mã OTP"
            uriImage={getImageUrl(backgroundGetCode)}
            pressableStyle={{
              borderColor:
                backgroundGetCode == BG_SIGNIN_CHECK
                  ? Colors.YELLOW
                  : Colors.WHITE,
            }}
          />
          <Text style={_styles.textOrStyle}>Hoặc</Text>
          <Button
            title="Đăng nhập"
            uriImage={getImageUrl(BG_SIGNIN)}
            textStyle={{ color: Colors.BLUE_2 }}
            pressableStyle={{
              borderColor: Colors.YELLOW,
              backgroundColor: Colors.WHITE,
            }}
          />
        </View>
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

  viewCheckRulesStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 20,
    marginTop: 12,
  },

  textCheckRulesStyle: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: Colors.WHITE,
  },

  viewButtonStyle: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "absolute",
    alignSelf: "center",
    bottom: DimensionsStyle.height * 0.16,
  },

  textOrStyle: {
    fontFamily: fontFamily.medium,
    marginVertical: 10,
    color: Colors.WHITE,
  },
});

export const SignUp = React.memo(_SignUp);
