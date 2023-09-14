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
  GIFT_AIRPORT,
  GIFT_COIN,
  GIFT_BAG,
  GIFT_ELECTRONIC,
  GIFT_SONY,
  GIFT_TUMBLER,
  GIFT_JACKET,
  GIFT_HAT,
} from "@assets";
import { TextViewBold } from "../textBold";
import { Button } from "../button";
import { getUrlImage } from "@containers";
import { useSelector } from "react-redux";
import { RootState } from "@shared-state";
import { Gift } from "@domain";
import Swiper from "react-native-swiper";

type Props = {
  onPressExchange: () => void;
  onPressClose: () => void;
  sum: number;
};

const randomNumbers = (n: number) => {
  var numbers = [];
  if (n === 1) {
    numbers.push(Math.floor(Math.random() * 8));
    return numbers;
  } else if (n > 1) {
    for (var i = 0; i < n; i++) {
      numbers.push(Math.floor(Math.random() * 8));
    }
    return numbers;
  } else {
    return [];
  }
};

const getElements = (array: Gift[], indexes: number[], n: number) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    const index = indexes[i];
    if (index >= 0 && index < array.length) {
      result.push(array[index]);
    }
  }
  return result;
};

export const DATAGIFT: Gift[] = [
  {
    key: "0",
    image: GIFT_COIN,
    name: "300 coins",
    quantity: 100,
    coinExchange: 100,
  },
  {
    key: "1",
    image: GIFT_ELECTRONIC,
    name: "Electronic lunch bo",
    quantity: 10,
    coinExchange: 100,
  },
  {
    key: "2",
    image: GIFT_AIRPORT,
    name: "Airpod case",
    quantity: 100,
    coinExchange: 100,
  },
  {
    key: "3",
    image: GIFT_BAG,
    name: "Pepsi Tote Bag",
    quantity: 100,
    coinExchange: 100,
  },
  {
    key: "4",
    image: GIFT_SONY,
    name: "Portable speaker",
    quantity: 3,
    coinExchange: 50,
  },
  {
    key: "5",
    image: GIFT_TUMBLER,
    name: "Pepsi Tumbler",
    quantity: 100,
    coinExchange: 100,
  },
  {
    key: "6",
    image: GIFT_JACKET,
    name: "Pepsi Jacket",
    quantity: 100,
    coinExchange: 100,
  },
  {
    key: "7",
    image: GIFT_HAT,
    name: "Pepsi Bucket Hat",
    quantity: 5,
    coinExchange: 80,
  },
];

const _PopupExchangeGift: React.FC<Props> = (props) => {
  const { onPressClose, onPressExchange, sum } = props;
  const [quantityGift, setQuantityGift] = React.useState([0]);
  const [displayNotification, setDisplayNotification] = React.useState<
    "flex" | "none" | undefined
  >("flex");
  const [displayGift, setDisplayGift] = React.useState<
    "flex" | "none" | undefined
  >("none");
  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );
  const textNotification = `Bạn có chắc chắn muốn đổi \n ${sum} combo hay không?`;
  useEffect(() => {
    setQuantityGift(randomNumbers(sum));
  }, []);

  const [datagift, setDatagift] = React.useState<Gift[]>(DATAGIFT);

  const textBoldOne = `Bạn nhận được \n ${DATAGIFT[quantityGift[0]].name}`;

  const elements = getElements(datagift, quantityGift, sum);

  return (
    <View style={_styles.centeredView}>
      <BackgroundModal />
      <View style={_styles.viewPopup}>
        <View style={{ display: displayNotification }}>
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
            onPress={() => {
              setDisplayNotification("none");
              setDisplayGift("flex");
              onPressExchange();
            }}
          />
        </View>

        <View
          style={{
            display: displayGift,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {sum == 1 ? (
            <View>
              <Image
                source={{ uri: listAllImages[BOX_GIFT_ONE] }}
                style={_styles.boxGift}
              />
              <TextViewBold
                text={textBoldOne}
                boldTexts={[`${DATAGIFT[quantityGift[0]].name}`]}
                textStyle={{ fontSize: 18, textAlign: "center" }}
                boldStyle={{ fontSize: 18 }}
                viewStyle={{
                  marginTop: DimensionsStyle.width * 0.05,
                  marginBottom: DimensionsStyle.width * 0.108,
                }}
              />
              <Image
                source={{ uri: listAllImages[DATAGIFT[quantityGift[0]].image] }}
                style={_styles.imageBoxGift}
              />
            </View>
          ) : (
            <View>
              <Image
                source={{ uri: listAllImages[BOX_GIFT_ONE] }}
                style={[
                  _styles.boxGift,
                  {
                    marginBottom: DimensionsStyle.width * 0.27,
                    marginStart: -DimensionsStyle.width * 0.02,
                  },
                ]}
              />
              <View
                style={{
                  width: "100%",
                  height: DimensionsStyle.width * 0.8,
                  position: "absolute",
                  backgroundColor: "transparent",
                  alignSelf: "center",
                  marginTop: DimensionsStyle.width * 0.2,
                }}
              >
                <Swiper
                  showsPagination={false}
                  showsButtons={true}
                  loop={false}
                  nextButton={
                    <Text
                      style={{
                        marginTop: -DimensionsStyle.width * 0.25,
                        color: "white",
                        fontSize: 15,
                        fontFamily: fontFamily.Black721,
                        backgroundColor: Colors.RED,
                        borderRadius: 14,
                        borderWidth: 1,
                        width: 28,
                        height: 28,
                        textAlign: "center",
                        overflow: "hidden",
                        borderColor: Colors.YELLOW,
                      }}
                    >
                      {">"}
                    </Text>
                  }
                  prevButton={
                    <Text
                      style={{
                        marginTop: -DimensionsStyle.width * 0.25,
                        color: "white",
                        fontSize: 15,
                        fontFamily: fontFamily.Black721,
                        backgroundColor: Colors.RED,
                        borderRadius: 14,
                        borderWidth: 1,
                        width: 28,
                        height: 28,
                        textAlign: "center",
                        overflow: "hidden",
                        borderColor: Colors.YELLOW,
                      }}
                    >
                      {"<"}
                    </Text>
                  }
                >
                  {elements.map((item) => (
                    <View key={item.key} style={{}}>
                      <Image
                        source={{ uri: listAllImages[item.image] }}
                        style={{
                          width: DimensionsStyle.width * 0.4,
                          height: DimensionsStyle.width * 0.35,
                          resizeMode: "stretch",
                          alignSelf: "center",
                        }}
                      />
                      <TextViewBold
                        text={`Bạn nhận được \n ${item.name}`}
                        boldTexts={[item.name]}
                        textStyle={{ fontSize: 18, textAlign: "center" }}
                        boldStyle={{ fontSize: 18 }}
                        viewStyle={{
                          marginTop: DimensionsStyle.width * 0.3,
                          marginBottom: DimensionsStyle.width * 0.108,
                        }}
                      />
                    </View>
                  ))}
                </Swiper>
              </View>
            </View>
          )}
        </View>

        <Pressable onPress={onPressClose}>
          <Image
            source={{ uri: listAllImages[BUTTON_CLOSE_WHITE] }}
            style={{
              width: 24,
              height: 24,
            }}
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

  buttonExchange: {
    width: DimensionsStyle.width * 0.28,
    height: 36,
    marginTop: DimensionsStyle.width * 0.08,
    marginBottom: DimensionsStyle.width * 0.12,
    borderRadius: 10,
    alignSelf: "center",
  },

  boxGift: {
    width: DimensionsStyle.width * 0.8,
    height: DimensionsStyle.width * 0.8,
    resizeMode: "stretch",
    alignSelf: "center",
    marginStart: -DimensionsStyle.width * 0.02,
  },

  imageBoxGift: {
    width: DimensionsStyle.width * 0.4,
    height: DimensionsStyle.width * 0.35,
    resizeMode: "stretch",
    alignSelf: "center",
    position: "absolute",
    top: DimensionsStyle.width * 0.22,
    alignItems: "center",
  },
});

export const PopupExchangeGift = React.memo(_PopupExchangeGift);
