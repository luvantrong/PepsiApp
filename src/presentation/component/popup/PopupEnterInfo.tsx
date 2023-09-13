import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, DimensionsStyle } from "@resources";
import { BackgroundModal } from "../backgroundModal";
import {
  fontFamily,
  BACKGROUND_SELECT_PLAY,
  BG_BUTTON_SELECT_PLAY,
  BUTTON_CLOSE,
  BUTTON_SELECT_ZERO,
  BACKGROUND_ENTER_INFO,
  BUTTON_SIGNOUT,
} from "@assets";
import { Button } from "../button";
import { getUrlImage } from "@containers";
import { useSelector } from "react-redux";
import { RootState } from "@shared-state";
import { Gift, User } from "@domain";
import { TextField } from "../textField";

type Props = {
  onPressClose: () => void;
  onPressConfirm: () => void;
  item: Gift;
  user: User;
};

const _PopupEnterInfo: React.FC<Props> = (props) => {
  const { onPressClose, onPressConfirm, item, user } = props;
  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );

  const [name, setName] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [borderColor, setBorderColor] = useState(Colors.WHITE);
  const [display, setDisplay] = useState<"flex" | "none" | undefined>("none");

  const handleNameTextChange = (text: string) => {
    setName(text);
  };

  const handlePhoneNumberTextChange = (text: string) => {
    setPhoneNumber(text);
  };

  const handleAddressTextChange = (text: string) => {
    setAddress(text);
  };

  const handleNoteTextChange = (text: string) => {
    setNote(text);
  };

  const handleConfirm = () => {
    if (address) {
      setBorderColor(Colors.WHITE);
    } else {
      setBorderColor(Colors.RED);
      setDisplay("flex");
    }
  };

  useEffect(() => {
    setBorderColor(Colors.WHITE);
    setDisplay("none");
  }, [address]);

  return (
    <View style={_styles.centeredView}>
      <BackgroundModal />
      <ImageBackground
        source={{ uri: listAllImages[BACKGROUND_ENTER_INFO] }}
        style={_styles.viewImageBackground}
      >
        <View style={_styles.viewPopup}>
          <Pressable onPress={onPressClose}>
            <Image
              source={{ uri: listAllImages[BUTTON_CLOSE] }}
              style={_styles.buttonClose}
            />
          </Pressable>
          <Text style={_styles.textSelect}>Thông tin nhận quà</Text>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={_styles.textName}>
            Quà của bạn:
            <Text style={[_styles.textName, { color: Colors.RED }]}>
              {" "}
              {item.name}
            </Text>
          </Text>
          <View>
            <Text style={[_styles.textName, { fontSize: 14 }]}>Họ và tên</Text>
            <TextField
              placeholder="Nhập họ và tên"
              value={name}
              onChange={handleNameTextChange}
              textStyle={{ marginTop: 10 }}
              viewStyle={{ marginHorizontal: 0 }}
            />
          </View>
          <View>
            <Text style={[_styles.textName, { fontSize: 14 }]}>
              Số điện thoại
            </Text>
            <TextField
              placeholder="Nhập số điện thoại"
              value={phoneNumber}
              onChange={handlePhoneNumberTextChange}
              textStyle={{ marginTop: 10 }}
              viewStyle={{ marginHorizontal: 0 }}
            />
          </View>
          <View>
            <Text style={[_styles.textName, { fontSize: 14 }]}>Địa chỉ</Text>
            <TextField
              placeholder="Nhập địa chỉ của bạn"
              value={address}
              onChange={handleAddressTextChange}
              textStyle={{
                marginTop: 10,
                height: 72,
                paddingTop: 10,
                borderWidth: 1,
                borderColor: borderColor,
              }}
              viewStyle={{ marginHorizontal: 0 }}
              type={true}
            />
            <Text style={[_styles.textError, { display: display }]}>
              Vui lòng nhập địa chỉ của bạn
            </Text>
          </View>
          <View>
            <Text style={[_styles.textName, { fontSize: 14 }]}>Ghi chú</Text>
            <TextField
              placeholder="Nhập ghi chú (nếu có)"
              value={note}
              onChange={handleNoteTextChange}
              textStyle={{
                marginTop: 10,
                height: 92,
                paddingTop: 10,
              }}
              viewStyle={{ marginHorizontal: 0 }}
              type={true}
            />
          </View>
        </View>
        <Button
          sumPlay=""
          uriImage={listAllImages[BUTTON_SIGNOUT]}
          title="Xác nhận"
          pressableStyle={{
            width: DimensionsStyle.width * 0.3,
            alignSelf: "center",
            position: "absolute",
            bottom: 40,
          }}
          onPress={handleConfirm}
        />
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
    width: DimensionsStyle.width * 0.9,
    height: DimensionsStyle.height * 0.74,
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
    color: Colors.BLUE_3,
    width: DimensionsStyle.width * 0.5,
    textTransform: "uppercase",
  },

  buttonClose: {
    width: 24,
    height: 24,
    resizeMode: "stretch",
    position: "absolute",
    top: -15,
    right: -180,
  },

  textName: {
    fontSize: 16,
    fontFamily: fontFamily.Black721,
    color: Colors.BLUE_3,
    marginTop: 20,
  },

  textError: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: Colors.RED,
    marginTop: 5,
  },
});

export const PopupEnterInfo = React.memo(_PopupEnterInfo);
