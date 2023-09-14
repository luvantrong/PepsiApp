import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  RootState,
  getDataUserRedux,
  storage,
  updateCoins,
} from "@shared-state";
import { getUrlImage } from "../sign-in";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@navigation";
import {
  BackgroundApp,
  Button,
  FlatlistExchangeGift,
  FlatlistGiftOfMe,
  Header,
  PopupErrorQR,
  PopupSignOut,
  PopupSucces,
  TextField,
  TextView,
} from "@components";
import {
  BACKGROUND_DETAIL,
  BACKGROUND_PRESENT,
  BACKGROUND_RULES,
  BACKGROUND_SIGNUP,
  BG_BUTTON_SELECT_PLAY,
  BG_SIGNIN_CHECK,
  BILL_QR,
  ICON_ARROW,
  ICON_LOGOUT,
  fontFamily,
} from "@assets";
import { Colors, DimensionsStyle } from "@resources";
import { Gift, User } from "@domain";
import { AppContext } from "@shared-state";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { TextInput } from "react-native-gesture-handler";
import { DataUpdateCoins } from "@shared-state";
import { useAppDispatch, getAllExchangeGift } from "@shared-state";
import { connect } from "react-redux";

type PropsType = NativeStackScreenProps<HomeStackParamList, "DetailGift">;

const _DetailGift: React.FC<PropsType> = (props) => {
  const { navigation } = props;
  const { dataUser, setDataUser, setLoggedIn } = React.useContext(AppContext);
  const dispatch = useAppDispatch();

  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );

  const userDataa = useSelector<RootState, User>(
    (state) => state.user.dataUsers
  );
  const exchangeGifts = useSelector<RootState, Gift[]>(
    (state) => state.exchangeGift.exchangeGifts
  );
  const [modalVisibleSignOut, setModalVisibleSignOut] = useState(false);
  const [backgroundColorExchagne, setBackgroundColorExchagne] = useState(
    Colors.RED
  );
  const [backgroundColorGift, setBackgroundColorGift] = useState(Colors.WHITE);
  const [colorExchange, setColorExchange] = useState(Colors.WHITE);
  const [colorGift, setColorGift] = useState(Colors.RED);
  const [typeShow, setTypeShow] = useState(true);

  const handleOnPressExchange = () => {
    setBackgroundColorExchagne(Colors.RED);
    setColorExchange(Colors.WHITE);
    setBackgroundColorGift(Colors.WHITE);
    setColorGift(Colors.RED);
    setTypeShow(true);
  };

  const handleOnPressGift = () => {
    setBackgroundColorExchagne(Colors.WHITE);
    setColorExchange(Colors.RED);
    setBackgroundColorGift(Colors.RED);
    setColorGift(Colors.WHITE);
    setTypeShow(false);
  };

  const handleUpdateCoin = () => {
    const coins = Math.floor(Math.random() * 1000);
    const dataUpdateCoins: DataUpdateCoins = {
      key: dataUser.key,
      coins: coins,
    };
    dispatch(updateCoins(dataUpdateCoins));
  };

  return (
    <BackgroundApp uri={listAllImages[BACKGROUND_DETAIL]}>
      <SafeAreaView style={{ flex: 1, marginBottom: -35 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleSignOut}
        >
          <PopupSignOut
            onPressSignOut={() => {
              setModalVisibleSignOut(!modalVisibleSignOut);
              setLoggedIn(false);
              setDataUser({} as User);
              navigation.push("SignIn");
            }}
            onPressCancel={() => {
              setModalVisibleSignOut(!modalVisibleSignOut);
            }}
          />
        </Modal>
        <Header
          iconLeft={listAllImages[ICON_ARROW]}
          titleCenter="Chi tiết quà tặng"
          iconRight={listAllImages[ICON_LOGOUT]}
          loginStatus={true}
          containerStyle={{ marginTop: 10 }}
          onPressRight={() => setModalVisibleSignOut(true)}
          onPressLeft={() => navigation.push("Home")}
        />
        <View>
          <TouchableOpacity onPress={handleUpdateCoin}>
            <Text>abc</Text>
          </TouchableOpacity>
        </View>
        <View style={_styles.viewTopTabs}>
          <Pressable
            style={[
              _styles.viewPressableTopTabs,
              {
                backgroundColor: backgroundColorExchagne,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              },
            ]}
            onPress={handleOnPressExchange}
          >
            <Text style={[_styles.textTopTabs, { color: colorExchange }]}>
              Đổi quà
            </Text>
          </Pressable>
          <Pressable
            style={[
              _styles.viewPressableTopTabs,
              {
                backgroundColor: backgroundColorGift,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
              },
            ]}
            onPress={handleOnPressGift}
          >
            <Text style={[_styles.textTopTabs, { color: colorGift }]}>
              Quà của tôi
            </Text>
          </Pressable>
        </View>

        <View style={_styles.viewFlatlist}>
          {typeShow ? (
            <FlatlistExchangeGift
              user={userDataa}
              exchangeGifts={exchangeGifts}
            />
          ) : (
            <FlatlistGiftOfMe />
          )}
        </View>
      </SafeAreaView>
    </BackgroundApp>
  );
};

const _styles = StyleSheet.create({
  viewTopTabs: {
    flexDirection: "row",
    alignItems: "center",
    width: "78%",
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    alignSelf: "center",
    height: 40,
    justifyContent: "space-between",
    marginTop: 10,
  },

  viewPressableTopTabs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: "50%",
  },

  textTopTabs: {
    fontFamily: fontFamily.Black721,
    fontSize: 18,
    marginTop: -2,
  },
  viewFlatlist: {
    width: "100%",
    alignSelf: "center",
    marginTop: 30,
    flex: 1,
  },
});
export const DetailGift = React.memo(_DetailGift);
