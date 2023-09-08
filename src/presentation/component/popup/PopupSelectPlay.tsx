import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { Colors, DimensionsStyle } from "@resources";
import { BackgroundModal } from "../backgroundModal";
import { getImageUrl } from "@containers";
import {
  fontFamily,
  BACKGROUND_SELECT_PLAY,
  BG_BUTTON_SELECT_PLAY,
  BUTTON_CLOSE,
  BUTTON_SELECT_ZERO,
} from "@assets";
import { Button } from "../button";

type Props = {
  onPressClose: () => void;
  onPressFree: () => void;
  onPressExchange: () => void;
  sumPlayFree: string;
  sumPlayExchange: string;
};

const _PopupSelectPlay: React.FC<Props> = (props) => {
  const {
    onPressFree,
    onPressExchange,
    onPressClose,
    sumPlayFree,
    sumPlayExchange,
  } = props;
  let titleSum = "Bạn còn 3 lượt chơi";
  let newTitleSumFree = titleSum.replace("3", sumPlayFree);
  let newTitleSumExchange = titleSum.replace("3", sumPlayExchange);
  return (
    <View style={_styles.centeredView}>
      <BackgroundModal />
      <ImageBackground
        source={{ uri: getImageUrl(BACKGROUND_SELECT_PLAY) }}
        style={_styles.viewImageBackground}
      >
        <View style={_styles.viewPopup}>
          <Pressable onPress={onPressClose}>
            <Image
              source={{ uri: getImageUrl(BUTTON_CLOSE) }}
              style={_styles.buttonClose}
            />
          </Pressable>
          <Text style={_styles.textSelect}>
            Bạn muốn sử dụng lượt chơi nào?
          </Text>
          <Button
            title="Lượt chơi miễn phí"
            uriImage={
              Number(sumPlayFree) == 0
                ? getImageUrl(BUTTON_SELECT_ZERO)
                : getImageUrl(BG_BUTTON_SELECT_PLAY)
            }
            sumPlay={sumPlayFree}
            pressableStyle={_styles.buttonFree}
            textStyle={{ fontSize: 18, color: Colors.WHITE }}
            onPress={onPressFree}
            titleSmall={newTitleSumFree}
          />
          <Button
            title="Lượt chơi quy đổi"
            uriImage={
              Number(sumPlayExchange) == 0
                ? getImageUrl(BUTTON_SELECT_ZERO)
                : getImageUrl(BG_BUTTON_SELECT_PLAY)
            }
            sumPlay={sumPlayExchange}
            pressableStyle={_styles.buttonExchange}
            textStyle={{ fontSize: 18, color: Colors.WHITE }}
            onPress={onPressExchange}
            titleSmall={newTitleSumExchange}
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
    width: DimensionsStyle.width * 0.75,
    height: DimensionsStyle.width * 0.75,
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
  },

  viewPopup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },

  textSelect: {
    fontFamily: fontFamily.Black721,
    fontSize: 22,
    textAlign: "center",
    color: Colors.RED,
    width: DimensionsStyle.width * 0.5,
    textTransform: "uppercase",
  },

  buttonFree: {
    width: DimensionsStyle.width * 0.6,
    height: 70,
    marginTop: 30,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: "transparent",
  },

  buttonExchange: {
    width: DimensionsStyle.width * 0.6,
    height: 70,
    borderRadius: 12,
    backgroundColor: "transparent",
  },

  buttonClose: {
    width: 24,
    height: 24,
    resizeMode: "stretch",
    position: "absolute",
    top: -20,
    right: -150,
  },
});

export const PopupSelectPlay = React.memo(_PopupSelectPlay);
