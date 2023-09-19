import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Image,
  Dimensions,
  SafeAreaView,
  Text,
  Modal,
} from "react-native";
import React, { useRef, useState } from "react";
import { DimensionsStyle } from "@resources";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@navigation";
import { BackgroundApp, Header, PopupSignOut, TextViewBold } from "@components";
import {
  BACKGROUND_HAPPY,
  BACKGROUND_PLAY,
  BG_SIGNIN_CHECK,
  BUTTON_HAPPY,
  ICON_ARROW,
  ICON_LOGOUT,
  IMAGE_CENTER_PLAY,
  IMAGE_HOME,
  IMAGE_TARGET,
  PRESENT_BLUE,
  PRESENT_GREEN,
  PRESENT_ORANGE,
} from "@assets";
import { useSelector } from "react-redux";
import {
  AppContext,
  DataUpdateCansAndCoins,
  DataUpdateTurn,
  RootState,
  signOut,
  updateCansAndCoins,
  updateTurn,
  useAppDispatch,
} from "@shared-state";
import { getUrlImage } from "../sign-in";
import { Cans, Present, User } from "@domain";
import { Button } from "@components";
type PropsType = NativeStackScreenProps<HomeStackParamList, "HappyPresent">;

const _HappyPresent: React.FC<PropsType> = (props) => {
  const { navigation, route } = props;
  const type = route.params?.type;
  const dispatch = useAppDispatch();
  const { setLoggedIn, isLoggedIn } = React.useContext(AppContext);
  const [modalVisibleSignOut, setModalVisibleSignOut] = useState(false);

  const dataPresent: Present[] = [
    {
      key: "1",
      image: PRESENT_BLUE,
      point: 50,
      name: "1 lon Pepsi AN",
    },
    {
      key: "2",
      image: PRESENT_GREEN,
      point: 50,
      name: "1 lon 7Up LỘC",
    },
    {
      key: "3",
      image: PRESENT_ORANGE,
      point: 100,
      name: "1 lon Mirinda PHÚC",
    },
  ];
  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );

  const dataUser = useSelector<RootState, User>(
    (state) => state.user.dataUsers
  );

  const randomNumber = Math.floor(Math.random() * 3);

  const [imagePresent, setImagePresent] = React.useState<string>(
    dataPresent[randomNumber].image
  );

  const titlePresent =
    "Chúc mừng bạn đã nhận được \n" +
    dataPresent[randomNumber].name +
    " ứng với " +
    dataPresent[randomNumber].point +
    " coins";

  const handleGoToHome = () => {
    let cans: Cans = {
      blue: 0,
      green: 0,
      orange: 0,
    };

    if (dataPresent[randomNumber].key == "1") {
      cans.blue = dataUser.cans.blue + 1;
      cans.green = dataUser.cans.green;
      cans.orange = dataUser.cans.orange;
    } else if (dataPresent[randomNumber].key == "2") {
      cans.blue = dataUser.cans.blue;
      cans.green = dataUser.cans.green + 1;
      cans.orange = dataUser.cans.orange;
    } else if (dataPresent[randomNumber].key == "3") {
      cans.blue = dataUser.cans.blue;
      cans.green = dataUser.cans.green;
      cans.orange = dataUser.cans.orange + 1;
    }

    const dataUpdate: DataUpdateCansAndCoins = {
      key: dataUser.key,
      cans: cans,
      coins: dataPresent[randomNumber].point + dataUser.coins,
    };

    let turns = {
      free: dataUser.turn.free,
      exchange: dataUser.turn.exchange,
    };

    if (type == true) {
      turns.free = dataUser.turn.free - 1;
    } else {
      turns.exchange = dataUser.turn.exchange - 1;
    }

    const dataUpdateTurn: DataUpdateTurn = {
      key: dataUser.key,
      turn: turns,
    };

    dispatch(updateCansAndCoins(dataUpdate));
    dispatch(updateTurn(dataUpdateTurn));
    navigation.push("Home");
  };

  const handleLogOut = () => {
    let cans: Cans = {
      blue: 0,
      green: 0,
      orange: 0,
    };

    if (dataPresent[randomNumber].key == "1") {
      cans.blue = dataUser.cans.blue + 1;
      cans.green = dataUser.cans.green;
      cans.orange = dataUser.cans.orange;
    } else if (dataPresent[randomNumber].key == "2") {
      cans.blue = dataUser.cans.blue;
      cans.green = dataUser.cans.green + 1;
      cans.orange = dataUser.cans.orange;
    } else if (dataPresent[randomNumber].key == "3") {
      cans.blue = dataUser.cans.blue;
      cans.green = dataUser.cans.green;
      cans.orange = dataUser.cans.orange + 1;
    }

    const dataUpdate: DataUpdateCansAndCoins = {
      key: dataUser.key,
      cans: cans,
      coins: dataPresent[randomNumber].point + dataUser.coins,
    };

    let turns = {
      free: dataUser.turn.free,
      exchange: dataUser.turn.exchange,
    };

    if (type == true) {
      turns.free = dataUser.turn.free - 1;
    } else {
      turns.exchange = dataUser.turn.exchange - 1;
    }

    const dataUpdateTurn: DataUpdateTurn = {
      key: dataUser.key,
      turn: turns,
    };

    dispatch(updateCansAndCoins(dataUpdate));
    dispatch(updateTurn(dataUpdateTurn));
    setLoggedIn(false);
    dispatch(signOut());
    navigation.push("SignIn");
  };

  return (
    <BackgroundApp uri={listAllImages[BACKGROUND_HAPPY]}>
      <SafeAreaView>
        <Header
          iconLeft={listAllImages[ICON_ARROW]}
          titleCenter="Vuốt lên để chơi"
          iconRight={listAllImages[ICON_LOGOUT]}
          loginStatus={isLoggedIn}
          iconLeftStyle={{ opacity: 0 }}
          titleCenterStyle={{ opacity: 0 }}
          onPressRight={() => setModalVisibleSignOut(true)}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleSignOut}
        >
          <PopupSignOut
            onPressSignOut={() => {
              setModalVisibleSignOut(!modalVisibleSignOut);
              handleLogOut();
            }}
            onPressCancel={() => {
              setModalVisibleSignOut(!modalVisibleSignOut);
            }}
          />
        </Modal>

        <Image
          source={{ uri: listAllImages[imagePresent] }}
          style={_styles.imagePresent}
        />
        <TextViewBold
          text={titlePresent}
          boldTexts={[
            dataPresent[randomNumber].name,
            dataPresent[randomNumber].point + " coins",
          ]}
          textStyle={{ fontSize: 18, textAlign: "center" }}
          boldStyle={{ fontSize: 18 }}
          viewStyle={{
            width: DimensionsStyle.width * 0.7,
            alignSelf: "center",
            marginTop: 20,
          }}
        />
        <Button
          title="Xác nhận"
          uriImage={listAllImages[BUTTON_HAPPY]}
          sumPlay=""
          pressableStyle={{
            alignSelf: "center",
            marginTop: 30,
            width: DimensionsStyle.width * 0.45,
          }}
          onPress={handleGoToHome}
        />
      </SafeAreaView>
    </BackgroundApp>
  );
};

const _styles = StyleSheet.create({
  imagePresent: {
    width: DimensionsStyle.width * 0.5,
    height: DimensionsStyle.height * 0.52,
    resizeMode: "stretch",
    alignSelf: "center",
    marginStart: DimensionsStyle.width * 0.13,
    marginTop: -25,
  },
});
export const HappyPresent = React.memo(_HappyPresent);
