import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import { Colors, DimensionsStyle } from "@resources";
import { BackgroundModal } from "../backgroundModal";
import { useSelector } from "react-redux";
import { RootState } from "@shared-state";
import { BACKGROUND_ERROR_CODE, fontFamily } from "@assets";
import { Button } from "../button";

type Props = {
  onPress: () => void;
};

const _PopupErrorQR: React.FC<Props> = (props) => {
  const { onPress } = props;
  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );
  return (
    <View style={_styles.centeredView}>
      <BackgroundModal />
      <ImageBackground
        source={{ uri: listAllImages[BACKGROUND_ERROR_CODE] }}
        style={_styles.viewImageBackground}
      >
        <View style={_styles.viewPopup}>
          <Text style={_styles.textTitle}>
            Hệ thống không nhận diện được hình ảnh
          </Text>
          <Button
            sumPlay=""
            title="Scan lại"
            pressableStyle={_styles.buttonConfirm}
            onPress={onPress}
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
    width: DimensionsStyle.width * 0.6,
    height: DimensionsStyle.width * 0.4,
    alignSelf: "center",
    borderRadius: 12,
    overflow: "hidden",
  },

  viewPopup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },

  textTitle: {
    fontSize: 14,
    textAlign: "center",
    width: "80%",
    color: Colors.RED,
    fontFamily: fontFamily.Black721,
    marginVertical: 20,
  },

  buttonConfirm: {
    backgroundColor: Colors.RED,
    width: "65%",
    borderWidth: 2,
    borderColor: Colors.YELLOW,
  },
});
export const PopupErrorQR = React.memo(_PopupErrorQR);
