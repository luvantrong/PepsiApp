import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
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
  BOX_GIFT_ONE,
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
  type: number;
};

const _PopupNotificationGift: React.FC<Props> = (props) => {
  const { onPressClose, onPressExchange, sum, type } = props;
  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );

  const [typeGift, setTypeGift] = React.useState("300 coins");
  useEffect(() => {
    if (type == 0) {
      setTypeGift("300 coins");
    } else if (type == 1) {
      setTypeGift("Pepsi Bucket Hat");
    } else if (type == 2) {
      setTypeGift("Pepsi Jacket");
    } else if (type == 3) {
      setTypeGift("Pepsi Tote Bag");
    } else if (type == 4) {
      setTypeGift("Pepsi Tumbler");
    } else if (type == 5) {
      setTypeGift("Airpod case (Black Pink)");
    } else if (type == 6) {
      setTypeGift("Electronic lunch bo");
    } else if (type == 7) {
      setTypeGift("Portable speaker");
    }
  }, []);
  const textNotification = `Bạn nhận được \n ${typeGift}`;
  return (
    <View style={_styles.centeredView}>
      <BackgroundModal />
      <View style={_styles.viewPopup}>
        <Image
          source={{ uri: listAllImages[BOX_GIFT_ONE] }}
          style={_styles.imageBox}
        />
        <TextViewBold
          text={textNotification}
          boldTexts={[typeGift]}
          textStyle={{ fontSize: 18, textAlign: "center" }}
          boldStyle={{ fontSize: 18 }}
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
    width: DimensionsStyle.width * 0.8,
    height: DimensionsStyle.width * 0.5,
    resizeMode: "stretch",
    marginBottom: 10,
    marginTop: DimensionsStyle.height * 0.07,
  },
});

export const PopupNotificationGift = React.memo(_PopupNotificationGift);
