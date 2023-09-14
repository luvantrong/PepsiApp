import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import {
  BACKGROUND_SIGNUP,
  BG_GETCODE,
  BG_SIGNIN_CHECK,
  fontFamily,
} from "@assets";
import { BackgroundApp, Button, TextField, TextView } from "@components";
import { Colors, DimensionsStyle } from "@resources";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@navigation";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useSelector } from "react-redux";
import {
  RootState,
  firestore,
  getAllExchangeGift,
  getDataUserRedux,
  storage,
} from "@shared-state";
import { User } from "@domain";
import { AppContext, useAppDispatch } from "@shared-state";

type PropsType = NativeStackScreenProps<HomeStackParamList, "ConfirmOTP">;

const _ConfirmOTP: React.FC<PropsType> = (props) => {
  const { navigation, route } = props;
  const phoneNumber = route.params?.phoneNumber;
  const type = route.params?.type;
  const phone = phoneNumber + "";

  const dispatch = useAppDispatch();
  const { setLoggedIn, setDataUser, isLoggedIn } = React.useContext(AppContext);
  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );
  const userData = useSelector<RootState, User>(
    (state) => state.user.dataUsers
  );
  const [code, setCode] = useState<string>("");
  const [borderColorOTP, setBorderColorOTP] = useState<string>(Colors.WHITE);
  const [backgroundConfirmOTP, setBackgroundConfirmOTP] =
    useState<string>(BG_GETCODE);
  const [validate, setValidate] = useState(false);
  const codeOTP = "1234";

  useEffect(() => {
    if (code.length === 4) {
      setBackgroundConfirmOTP(BG_SIGNIN_CHECK);
      setValidate(true);
    } else {
      setBackgroundConfirmOTP(BG_GETCODE);
      setValidate(false);
    }
  }, [code]);

  const getDataUser = async () => {
    try {
      const snapshot = await firestore
        .collection("users")
        .where("phone", "==", phone)
        .get();
      if (!snapshot.empty) {
        const userDoc = snapshot.docs[0];
        const user = userDoc.data();
        const key = userDoc.id;
        const userWithKey: User = {
          key: key,
          name: user.name,
          phone: user.phone,
          coins: user.coins,
        };
        setDataUser(userWithKey);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmOTP = () => {
    if (code === codeOTP && validate) {
      if (type) {
        dispatch(getDataUserRedux(phone));
        getDataUser();
        setLoggedIn(true);
        navigation.push("Home");
      } else {
        console.log("SignUp", "SignUp");
        navigation.push("Home");
      }
    } else {
      setBorderColorOTP(Colors.RED);
      return false;
    }
  };

  const handleReSendOTP = () => {
    setBorderColorOTP(Colors.WHITE);
    setCode("");
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
        <View style={_styles.viewConfirmOTP}>
          <Text style={_styles.textConfirmOTP}>Xác minh OTP</Text>
          <Text style={_styles.textSendOTP}>
            Nhập mã OTP vừa được gửi về điện thoại của bạn
          </Text>
        </View>
        <View style={_styles.viewOTP}>
          <OTPInputView
            style={{ width: "100%", height: 50 }}
            pinCount={4}
            autoFocusOnLoad={true}
            codeInputFieldStyle={StyleSheet.flatten([
              _styles.underlineStyleBase,
              {
                borderColor: borderColorOTP,
                backgroundColor: Colors.WHITE,
              },
            ])}
            code={code}
            onCodeChanged={(code) => {
              setCode(code);
            }}
            onCodeFilled={(code) => {
              setCode(code);
            }}
            placeholderCharacter="-"
            placeholderTextColor={Colors.BLACK_PLA}
            editable={true}
          />
        </View>
        <View style={_styles.viewButton}>
          <Button
            title="Xác nhận"
            uriImage={listAllImages[backgroundConfirmOTP]}
            sumPlay=""
            onPress={handleConfirmOTP}
          />
          <View style={_styles.viewReSendOTP}>
            <Text style={_styles.textReSendOTP}>Bạn chưa nhận được mã? </Text>
            <Pressable onPress={handleReSendOTP}>
              <Text style={[_styles.textReSendOTP, { color: Colors.YELLOW }]}>
                Gửi lại mã
              </Text>
            </Pressable>
          </View>
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

  viewConfirmOTP: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: DimensionsStyle.height * 0.1,
  },

  textConfirmOTP: {
    fontSize: 22,
    fontFamily: fontFamily.Black721,
    color: Colors.WHITE,
  },

  textSendOTP: {
    fontSize: 14,
    color: Colors.WHITE,
    fontFamily: fontFamily.medium,
    marginTop: 5,
    marginBottom: 10,
  },

  viewOTP: {
    marginTop: 20,
    marginHorizontal: DimensionsStyle.width * 0.2,
    marginBottom: 50,
  },

  underlineStyleBase: {
    width: 44,
    height: 44,
    borderWidth: 2,
    borderColor: Colors.BLACK,
    color: Colors.BLACK,
    fontSize: 20,
    fontWeight: "700",
    borderRadius: 8,
  },

  underlineStyleHighLighted: {
    borderColor: "#7F4E1D",
  },

  viewButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  viewReSendOTP: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  textReSendOTP: {
    fontSize: 14,
    color: Colors.WHITE,
    fontFamily: fontFamily.medium,
  },
});

export const ConfirmOTP = React.memo(_ConfirmOTP);
