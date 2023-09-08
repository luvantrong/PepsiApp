import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, DimensionsStyle } from "@resources";
import { BackgroundModal } from "../backgroundModal";
import { getImageUrl } from "@containers";
import {
  BG_SIGNIN,
  BACKGROUND_SIGNOUT,
  BACKGROUND_SIGNUP,
  BUTTON_SIGNOUT,
  fontFamily,
  BG_CANCEL,
} from "@assets";
import { TextViewBold } from "../textBold";
import { Button } from "../button";

type Props = {
  onPressSignOut: () => void;
  onPressCancel: () => void;
};

const _PopupSignOut: React.FC<Props> = (props) => {
  const { onPressSignOut, onPressCancel } = props;
  return (
    <View style={_styles.centeredView}>
      <BackgroundModal />
      <ImageBackground
        source={{ uri: getImageUrl(BACKGROUND_SIGNOUT) }}
        style={_styles.viewImageBackground}
      >
        <View style={_styles.viewPopup}>
          <TextViewBold
            text="Bạn có chắc chắn muốn đăng xuất không?"
            boldTexts={["đăng xuất"]}
            textStyle={_styles.textSignout}
            boldStyle={{ color: Colors.BLUE_2, fontSize: 16 }}
          />
          <Button
            title="Đăng xuất"
            uriImage={getImageUrl(BUTTON_SIGNOUT)}
            sumPlay=""
            pressableStyle={_styles.buttonSignout}
            textStyle={{ fontSize: 14 }}
            onPress={onPressSignOut}
          />
          <Button
            title="Huỷ"
            uriImage={getImageUrl(BG_CANCEL)}
            sumPlay=""
            pressableStyle={_styles.buttonCancel}
            textStyle={{ fontSize: 14, color: Colors.BLUE_2 }}
            onPress={onPressCancel}
          />
        </View>
      </ImageBackground>
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

  viewImageBackground: {
    width: DimensionsStyle.width * 0.55,
    height: DimensionsStyle.width * 0.4,
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
  },

  viewPopup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },

  textSignout: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    textAlign: "center",
    color: Colors.BLUE_2,
    width: DimensionsStyle.width * 0.4,
  },

  buttonSignout: {
    width: DimensionsStyle.width * 0.28,
    height: 32,
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 12,
  },

  buttonCancel: {
    width: DimensionsStyle.width * 0.28,
    height: 32,
    borderRadius: 12,
  },
});

export const PopupSignOut = React.memo(_PopupSignOut);
