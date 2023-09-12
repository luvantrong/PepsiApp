import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Colors, DimensionsStyle } from "@resources";
import { BackgroundModal } from "../backgroundModal";
import {
  BG_SIGNIN,
  BACKGROUND_SIGNOUT,
  BACKGROUND_SIGNUP,
  BUTTON_SIGNOUT,
  fontFamily,
  BG_CANCEL,
  IMAGE_BOX_1,
  BUTTON_CLOSE_WHITE,
} from "@assets";
import { TextViewBold } from "../textBold";
import { Button } from "../button";
import { getUrlImage } from "@containers";
import { useSelector } from "react-redux";
import { RootState } from "@shared-state";

type Props = {
  onPressExchange: () => void;
  onPressClose: () => void;
  sum: number;
};

const _PopupExchangeGift: React.FC<Props> = (props) => {
  const { onPressClose, onPressExchange, sum } = props;
  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );
  const textNotification = `Bạn có chắc chắn muốn đổi \n ${sum} combo hay không?`;
  return (
    <View style={_styles.centeredView}>
      <BackgroundModal />
      <View style={_styles.viewPopup}>
        <Image
          source={{ uri: listAllImages[IMAGE_BOX_1] }}
          style={_styles.imageBox}
        />
        <TextViewBold
          text={textNotification}
          boldTexts={[`${sum} combo`]}
          textStyle={{ fontSize: 18, textAlign: "center" }}
          boldStyle={{ fontSize: 18 }}
        />
        <Button
          title="Đổi quà"
          uriImage={listAllImages[BUTTON_SIGNOUT]}
          sumPlay=""
          pressableStyle={_styles.buttonExchange}
          textStyle={{ fontSize: 14 }}
        />
        <Pressable onPress={onPressClose}>
          <Image
            source={{ uri: listAllImages[BUTTON_CLOSE_WHITE] }}
            style={{ width: 24, height: 24 }}
          />
        </Pressable>
      </View>
    </View>
  );
};

const _styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 199,
  },

  viewPopup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },

  imageBox: {
    width: DimensionsStyle.width * 0.7,
    height: DimensionsStyle.width * 0.5,
    resizeMode: "stretch",
    marginBottom: 10,
  },

  buttonExchange: {
    width: DimensionsStyle.width * 0.28,
    height: 36,
    marginTop: DimensionsStyle.width * 0.08,
    marginBottom: DimensionsStyle.width * 0.12,
    borderRadius: 10,
  },
});

export const PopupExchangeGift = React.memo(_PopupExchangeGift);
