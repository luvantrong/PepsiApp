import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  DataUpdateCoins,
  RootState,
  storage,
  updateCoins,
  useAppDispatch,
} from "@shared-state";
import { getUrlImage } from "../sign-in";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@navigation";
import {
  BackgroundApp,
  Button,
  Header,
  PopupErrorQR,
  PopupExchangeGift,
  PopupSignOut,
  PopupSucces,
  TextField,
  TextView,
  TextViewBold,
} from "@components";
import {
  BACKGROUND_COLLECTION,
  BACKGROUND_SIGNUP,
  BG_BUTTON_SELECT_PLAY,
  BG_GETCODE,
  BG_SIGNIN,
  BG_SIGNIN_CHECK,
  BILL_QR,
  C1,
  C2,
  C3,
  COINT,
  ICON_ARROW,
  ICON_LOGOUT,
  fontFamily,
} from "@assets";
import { Colors, DimensionsStyle } from "@resources";
import { User } from "@domain";

type PropsType = NativeStackScreenProps<HomeStackParamList, "Collection">;

const _Collection: React.FC<PropsType> = (props) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const [modalVisibleSignOut, setModalVisibleSignOut] = useState(false);
  const [modalVisibleExchangeGift, setModalVisibleExchangeGift] =
    useState(false);
  const [modalVisibleNotificationGift, setModalVisibleNotificationGift] =
    useState(false);
  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );

  const userData = useSelector<RootState, User>(
    (state) => state.user.dataUsers
  );
  const [backgroundLeft, setBackgroundLeft] = useState(Colors.BLUE_3);
  const [backgroundRight, setBackgroundRight] = useState(Colors.BLUE_3);
  const [sumPepsi, setSumPepsi] = useState(4);
  const [sum7Up, setSum7Up] = useState(5);
  const [sumMirinda, setSumMirinda] = useState(2);
  const [quantity, setQuantity] = useState(1);

  const numbers: number[] = [sumPepsi, sum7Up, sumMirinda];

  const findSmallestNumber = (nums: number[]): number => {
    let smallestNumber = nums[0];

    for (let i = 1; i < nums.length; i++) {
      if (nums[i] < smallestNumber) {
        smallestNumber = nums[i];
      }
    }

    return smallestNumber;
  };

  const smallestNumber = findSmallestNumber(numbers);

  useEffect(() => {
    if (quantity < smallestNumber) {
      setBackgroundRight(Colors.RED);
      setBackgroundLeft(Colors.BLUE_3);
    } else {
      setBackgroundRight(Colors.BLUE_3);
      setBackgroundLeft(Colors.RED);
    }

    if (quantity == 0) {
      setBackgroundRight(Colors.BLUE_3);
      setBackgroundLeft(Colors.BLUE_3);
    }
  }, [quantity]);

  useEffect(() => {
    if (smallestNumber == 0) {
      setQuantity(0);
    }
  }, [sumPepsi, sum7Up, sumMirinda]);

  const handlePressLeft = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePressRight = () => {
    if (quantity < smallestNumber) {
      setQuantity(quantity + 1);
    }
  };

  const handleUpdateCoin = () => {
    const coins = 300;
    const dataUpdateCoins: DataUpdateCoins = {
      key: userData.key,
      coins: userData.coins + coins,
    };
    dispatch(updateCoins(dataUpdateCoins));
  };

  return (
    <BackgroundApp uri={listAllImages[BACKGROUND_COLLECTION]}>
      <SafeAreaView style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleExchangeGift}
        >
          <PopupExchangeGift
            onPressClose={() => setModalVisibleExchangeGift(false)}
            onPressExchange={handleUpdateCoin}
            sum={quantity}
          />
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleSignOut}
        >
          <PopupSignOut
            onPressSignOut={() => {
              setModalVisibleSignOut(!modalVisibleSignOut);
              // setLoggedIn(false);
              // setDataUser({} as User);
              navigation.push("SignIn");
            }}
            onPressCancel={() => {
              setModalVisibleSignOut(!modalVisibleSignOut);
            }}
          />
        </Modal>
        <Header
          iconLeft={listAllImages[ICON_ARROW]}
          titleCenter="Bộ sưu tập"
          iconRight={listAllImages[ICON_LOGOUT]}
          loginStatus={true}
          containerStyle={{ marginTop: 10 }}
          onPressLeft={() => navigation.push("Home")}
          onPressRight={() => setModalVisibleSignOut(true)}
        />
        <View style={_styles.viewCoin}>
          <Image
            source={{ uri: listAllImages[COINT] }}
            style={_styles.imageCoin}
          />
          <Text style={_styles.textCoinNow}>Số coins hiện tại của bạn</Text>
          <Text style={_styles.textCoin}>{userData.coins}</Text>
        </View>
        <View style={_styles.viewImageCenter}>
          <View style={_styles.viewChildImageCenter}>
            <Image
              source={{ uri: listAllImages[C1] }}
              style={_styles.imageCenter}
            />
            <Text style={_styles.textCenter}>{sumPepsi}</Text>
          </View>
          <View style={_styles.viewChildImageCenter}>
            <Image
              source={{ uri: listAllImages[C2] }}
              style={_styles.imageCenter}
            />
            <Text style={_styles.textCenter}>{sum7Up}</Text>
          </View>
          <View style={_styles.viewChildImageCenter}>
            <Image
              source={{ uri: listAllImages[C3] }}
              style={_styles.imageCenter}
            />
            <Text style={_styles.textCenter}>{sumMirinda}</Text>
          </View>
        </View>

        <TextViewBold
          text="Đổi ngay bộ sưu tập AN - LỘC - PHÚC để có cơ hội nhận ngay 300 coins hoặc một phần quà may mắn"
          boldTexts={["AN - LỘC - PHÚC", "300 coins", "phần quà may mắn"]}
          textStyle={{ fontSize: 16, textAlign: "center" }}
          boldStyle={{ fontSize: 16 }}
          viewStyle={{
            marginHorizontal: DimensionsStyle.width * 0.2,
            marginTop: -25,
          }}
        />

        <View style={_styles.viewNumbericInput}>
          <Pressable
            style={[
              _styles.viewTextNumbericInput,
              { backgroundColor: backgroundLeft },
            ]}
            onPress={handlePressLeft}
          >
            <Text style={_styles.textNumberic}>-</Text>
          </Pressable>
          <Text style={[_styles.textCenter, { marginTop: 0 }]}>{quantity}</Text>
          <Pressable
            style={[
              _styles.viewTextNumbericInput,
              { backgroundColor: backgroundRight },
            ]}
            onPress={handlePressRight}
          >
            <Text style={_styles.textNumberic}>+</Text>
          </Pressable>
        </View>

        <Button
          sumPlay=""
          title="Đổi ngay"
          uriImage={
            quantity == 0
              ? listAllImages[BG_GETCODE]
              : listAllImages[BG_SIGNIN_CHECK]
          }
          pressableStyle={_styles.buttonConfirm}
          onPress={() => setModalVisibleExchangeGift(true)}
        />
      </SafeAreaView>
    </BackgroundApp>
  );
};

const _styles = StyleSheet.create({
  buttonConfirm: {
    alignSelf: "center",
    position: "absolute",
    bottom: DimensionsStyle.height * 0.085,
  },

  viewCoin: {
    alignItems: "center",
    marginTop: 20,
  },

  imageCoin: {
    width: DimensionsStyle.width * 0.3,
    height: DimensionsStyle.width * 0.3,
    resizeMode: "stretch",
  },

  textCoinNow: {
    fontSize: 18,
    fontFamily: fontFamily.Black721,
    color: Colors.WHITE,
    marginTop: 5,
  },

  textCoin: {
    fontSize: 42,
    fontFamily: fontFamily.Black721,
    color: Colors.WHITE,
    textShadowColor: Colors.YELLOW,
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 2,
    position: "absolute",
    top: DimensionsStyle.height * 0.03,
  },

  viewImageCenter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: DimensionsStyle.height * 0.05,
  },

  viewChildImageCenter: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  imageCenter: {
    width: DimensionsStyle.width * 0.2,
    height: DimensionsStyle.width * 0.5,
    resizeMode: "stretch",
  },

  textCenter: {
    fontSize: 16,
    fontFamily: fontFamily.Black721,
    color: Colors.WHITE,
    marginTop: 10,
  },

  viewNumbericInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: DimensionsStyle.width * 0.05,
  },

  textNumberic: {
    fontSize: 16,
    color: Colors.WHITE,
    textAlign: "center",
    fontWeight: "bold",
  },

  viewTextNumbericInput: {
    width: 28,
    height: 28,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: Colors.BLUE_3,
    marginHorizontal: 20,
  },
});
export const Collection = React.memo(_Collection);
