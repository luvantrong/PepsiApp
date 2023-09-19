import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  BACKGROUND_SIGNUP,
  BG_GETCODE,
  BG_SIGNIN,
  BG_SIGNIN_CHECK,
  IMAGE_3_LON_1,
  fontFamily,
} from "@assets";
import { RootState, storage } from "@shared-state";
import { BackgroundApp, Button, TextField, TextView } from "@components";
import { Colors, DimensionsStyle } from "@resources";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@navigation";
import { useSelector } from "react-redux";
import { getUrlImage } from "./SignUp";
import { firestore } from "@shared-state";
import { User } from "@domain";

type PropsType = NativeStackScreenProps<HomeStackParamList, "SignIn">;

const _SignIn: React.FC<PropsType> = (props) => {
  const { navigation } = props;
  const [phoneNumber, setPhoneNumber] = useState("");

  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );

  const [backgroundGetCode, setBackgroundGetCode] = useState(BG_GETCODE);
  const [validate, setValidate] = useState(false);

  const handlePhoneNumberTextChange = (text: string) => {
    setPhoneNumber(text);
  };

  useEffect(() => {
    if (phoneNumber) {
      setBackgroundGetCode(BG_SIGNIN_CHECK);
      setValidate(true);
    } else {
      setBackgroundGetCode(BG_GETCODE);
      setValidate(false);
    }
  }, [phoneNumber]);

  const handleGoToConfirmOTP = async (phoneNumber: string) => {
    if (validate) {
      if (phoneNumber && !Number.isInteger(Number(phoneNumber))) {
        Alert.alert("Thông báo", "Số điện thoại không hợp lệ");
        return;
      }
      if (phoneNumber.length > 10 || phoneNumber.length < 10) {
        Alert.alert("Thông báo", "Số điện thoại phải có 10 số");
        return;
      }

      const snapshot = await firestore
        .collection("users")
        .where("phone", "==", phoneNumber)
        .get();
      if (!snapshot.empty) {
        // Số điện thoại đã tồn tại trong Firestore
        navigation.push("ConfirmOTP", { phoneNumber: phoneNumber, type: true });
      } else {
        // Số điện thoại không tồn tại trong Firestore
        Alert.alert("Thông báo", "Tài khoản không tồn tại");
      }
    }
  };

  const handleGoToSignUp = () => {
    navigation.push("SignUp");
  };
  return (
    <BackgroundApp uri={listAllImages[BACKGROUND_SIGNUP]}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={_styles.headlineStyle}>
          <TextView title="Hey, mừng bạn đến với" />
          <TextView
            title="Pepsi Tết"
            textStyle={_styles.textPepsiHeadlineStyle}
          />
        </View>

        <TextView title="Đăng nhập" textStyle={_styles.textSignUpStyle} />
        <Text style={_styles.textPhone}>Số điện thoại</Text>
        <TextField
          placeholder="Nhập số điện thoại"
          value={phoneNumber}
          onChange={handlePhoneNumberTextChange}
          textStyle={{ marginTop: 5 }}
        />

        <Image
          source={{ uri: listAllImages[IMAGE_3_LON_1] }}
          style={{
            width: DimensionsStyle.width * 0.5,
            height: DimensionsStyle.height * 0.22,
            resizeMode: "stretch",
            alignSelf: "center",
            marginTop: 25,
          }}
        />

        <View style={_styles.viewButtonStyle}>
          <Button
            sumPlay=""
            title="Lấy mã OTP"
            uriImage={listAllImages[backgroundGetCode]}
            pressableStyle={{
              borderColor:
                backgroundGetCode == BG_SIGNIN_CHECK
                  ? Colors.YELLOW
                  : Colors.WHITE,
            }}
            onPress={() => handleGoToConfirmOTP(phoneNumber)}
          />
          <Text style={_styles.textOrStyle}>Hoặc</Text>
          <Button
            sumPlay=""
            title="Đăng ký"
            uriImage={listAllImages[BG_SIGNIN]}
            textStyle={{ color: Colors.BLUE_2 }}
            pressableStyle={{
              borderColor: Colors.YELLOW,
              backgroundColor: Colors.WHITE,
            }}
            onPress={handleGoToSignUp}
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

  textPhone: {
    fontFamily: fontFamily.Black721,
    marginHorizontal: 20,
    color: Colors.WHITE,
    fontSize: 14,
    marginTop: 15,
  },
});
export const SignIn = React.memo(_SignIn);
