import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { Colors, DimensionsStyle } from "@resources";
import { BackgroundModal } from "../backgroundModal";
import { useSelector } from "react-redux";
import { RootState } from "@shared-state";
import {
  BACKGROUND_ERROR_CODE,
  BACKGROUND_NOTIFICATION,
  BUTTON_CLOSE,
  IMAGE_TOP_NOTI,
  fontFamily,
} from "@assets";
import { Button } from "../button";
import { TextViewBold } from "../textBold";

type Props = {
  onPressReScan: () => void;
  onPressPlay: () => void;
  sumPlay: string;
};

const _PopupSucces: React.FC<Props> = (props) => {
  const { onPressPlay, onPressReScan, sumPlay } = props;
  const textBold = `Bạn có tổng cộng 0${sumPlay} lượt chơi`;
  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );
  return (
    <View style={_styles.centeredView}>
      <BackgroundModal />
      <ImageBackground
        source={{ uri: listAllImages[BACKGROUND_NOTIFICATION] }}
        style={_styles.viewImageBackground}
      >
        <Pressable onPress={onPressReScan}>
          <Image
            source={{ uri: listAllImages[BUTTON_CLOSE] }}
            style={_styles.buttonClose}
          />
        </Pressable>
        <View style={_styles.viewPopup}>
          <Text style={_styles.textTitle}>Bạn nhận được</Text>
          <Text style={_styles.textCoint}>5</Text>
          <Text style={_styles.textTitle}>Lượt chơi</Text>
          <TextViewBold
            text={textBold}
            boldTexts={[`0${sumPlay}`]}
            textStyle={_styles.textSumBold}
            boldStyle={_styles.textBold}
          />
          <Button
            sumPlay=""
            title="Scan tiếp"
            pressableStyle={_styles.buttonConfirm}
            onPress={onPressReScan}
          />
          <Button
            sumPlay=""
            title="Chơi ngay"
            pressableStyle={_styles.buttonConfirm}
            onPress={onPressPlay}
          />
        </View>
      </ImageBackground>
      <Image
        source={{ uri: listAllImages[IMAGE_TOP_NOTI] }}
        style={_styles.imageTopNoti}
      />
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
    width: DimensionsStyle.width * 0.7,
    height: DimensionsStyle.width * 0.95,
    alignSelf: "center",
    borderRadius: 12,
    overflow: "hidden",
  },

  viewPopup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
  },

  imageTopNoti: {
    width: DimensionsStyle.width * 0.5,
    height: DimensionsStyle.width * 0.25,
    alignSelf: "center",
    position: "absolute",
    top: DimensionsStyle.height * 0.215,
    resizeMode: "stretch",
  },

  textTitle: {
    fontFamily: fontFamily.medium,
    fontSize: 20,
    color: Colors.BLACK,
  },

  textCoint: {
    fontFamily: fontFamily.Black721,
    fontSize: 72,
    color: Colors.BLUE_3,
    marginTop: -10,
  },

  textSumBold: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: Colors.BLACK,
    marginBottom: 10,
    marginTop: 35,
  },

  textBold: {
    fontFamily: fontFamily.Black721,
    fontSize: 18,
    color: Colors.BLUE_3,
  },

  buttonConfirm: {
    backgroundColor: Colors.RED,
    width: "55%",
    borderWidth: 2,
    borderColor: Colors.YELLOW,
    marginVertical: 3,
  },

  buttonClose: {
    width: 24,
    height: 24,
    position: "absolute",
    right: 10,
    top: 10,
  },
});
export const PopupSucces = React.memo(_PopupSucces);
