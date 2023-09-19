import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { BackgroundApp, Header, PopupSignOut, TextViewBold } from "@components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@navigation";
import { Colors, DimensionsStyle } from "@resources";
import {
  BACKGROUND_PRESENT,
  ICON_ARROW,
  ICON_LOGOUT,
  IMG_INSTRUCT_1,
  IMG_INSTRUCT_2,
  fontFamily,
} from "@assets";
import { IInstruct } from "@domain";
import { useSelector } from "react-redux";
import { AppContext, RootState, signOut, useAppDispatch } from "@shared-state";
import { getUrlImage } from "../sign-in";

type PropsType = NativeStackScreenProps<HomeStackParamList, "Instruct">;
type ItemProps = {
  item: IInstruct;
};

const Item = ({ item }: ItemProps) => (
  <View style={{ marginBottom: 45 }}>
    <Image
      source={{ uri: item.image }}
      style={{
        width: DimensionsStyle.width * 0.8,
        height: DimensionsStyle.width * 0.8,
        marginBottom: 20,
        borderRadius: 20,
      }}
    />
    <TextViewBold
      text={item.content}
      boldTexts={["Bước 1:", "Bước 2:", "Bước 3"]}
      textStyle={{ fontSize: 18, textAlign: "center" }}
      boldStyle={{
        fontSize: 18,
        color: Colors.WHITE,
        fontFamily: fontFamily.Black721,
      }}
      viewStyle={{ width: DimensionsStyle.width * 0.7, alignSelf: "center" }}
    />
  </View>
);

const _Instruct: React.FC<PropsType> = (props) => {
  const { navigation } = props;
  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );
  const dispatch = useAppDispatch();
  const { isLoggedIn, setLoggedIn } = React.useContext(AppContext);
  const [modalVisibleSignOut, setModalVisibleSignOut] = useState(false);
  const handleGoToHome = () => navigation.push("Home");
  const handleShowPopupSignOut = () => {
    setModalVisibleSignOut(true);
  };
  return (
    <BackgroundApp uri={listAllImages[BACKGROUND_PRESENT]}>
      <SafeAreaView style={{ flex: 1, marginBottom: -40 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleSignOut}
        >
          <PopupSignOut
            onPressSignOut={() => {
              setModalVisibleSignOut(!modalVisibleSignOut);
              setLoggedIn(false);
              dispatch(signOut());
              navigation.push("SignIn");
            }}
            onPressCancel={() => {
              setModalVisibleSignOut(!modalVisibleSignOut);
            }}
          />
        </Modal>
        <Header
          iconLeft={listAllImages[ICON_ARROW]}
          titleCenter="Hướng dẫn"
          iconRight={listAllImages[ICON_LOGOUT]}
          loginStatus={isLoggedIn}
          onPressLeft={handleGoToHome}
          onPressRight={handleShowPopupSignOut}
        />
        <ScrollView
          style={_styles.scrollViewStyle}
          scrollIndicatorInsets={{ right: 4 }}
          showsVerticalScrollIndicator={false}
        >
          {DATA.map((item) => (
            <Item item={item} key={item.key} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </BackgroundApp>
  );
};

const _styles = StyleSheet.create({
  scrollViewStyle: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
  },
});

export const Instruct = React.memo(_Instruct);

const DATA: IInstruct[] = [
  {
    key: "1",
    image:
      "https://firebasestorage.googleapis.com/v0/b/pepsiapp-3476d.appspot.com/o/IMG_INSTRUCT_1.png?alt=media&token=bd75401d-57a9-49ac-a434-261d21017aee",
    content:
      "Bước 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius in pulvinar feugiat rutrum libero volutpat.",
  },
  {
    key: "2",
    image:
      "https://firebasestorage.googleapis.com/v0/b/pepsiapp-3476d.appspot.com/o/IMG_INSTRUCT_2.png?alt=media&token=85f3fac2-96de-4cb3-a692-ae291a175b5d",
    content:
      "Bước 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius in pulvinar feugiat rutrum libero volutpat.",
  },
  {
    key: "3",
    image:
      "https://firebasestorage.googleapis.com/v0/b/pepsiapp-3476d.appspot.com/o/IMG_INSTRUCT_1.png?alt=media&token=bd75401d-57a9-49ac-a434-261d21017aee",
    content:
      "Bước 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius in pulvinar feugiat rutrum libero volutpat.",
  },
];
