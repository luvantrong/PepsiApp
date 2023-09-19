import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Colors, DimensionsStyle } from "@resources";
import { BackgroundModal } from "../backgroundModal";
import {
  BUTTON_SIGNOUT,
  fontFamily,
  IMAGE_BOX_1,
  BUTTON_CLOSE_WHITE,
  BOX_GIFT_ONE,
} from "@assets";
import { TextViewBold } from "../textBold";
import { Button } from "../button";
import {
  DataUpdateCansAndCoins,
  DataUpdateGiftOfMe,
  RootState,
  updateCansAndCoins,
  useAppDispatch,
} from "@shared-state";
import { Gift, User } from "@domain";
import Swiper from "react-native-swiper";
import { useSelector } from "react-redux";

type Props = {
  onPressExchange?: () => void;
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

const _PopupExchangeGift: React.FC<Props> = (props) => {
  const { onPressClose, onPressExchange, sum } = props;
  const dispatch = useAppDispatch();
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

  const userData = useSelector<RootState, User>(
    (state) => state.user.dataUsers
  );

  const exchangeGifts = useSelector<RootState, Gift[]>(
    (state) => state.exchangeGift.exchangeGifts
  );

  const textNotification = `Bạn có chắc chắn muốn đổi \n ${sum} combo hay không?`;
  useEffect(() => {
    setQuantityGift(randomNumbers(sum));
  }, []);

  const textBoldOne = `Bạn nhận được \n ${exchangeGifts[quantityGift[0]].name}`;

  const elements = getElements(exchangeGifts, quantityGift, sum);

  const handleExchangeGift = () => {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].name == "300 coins") {
        const dataUpdateCoinAndCans: DataUpdateCansAndCoins = {
          key: userData.key,
          coins: userData.coins + 300,
          cans: {
            blue: userData.cans.blue - sum,
            green: userData.cans.green - sum,
            orange: userData.cans.orange - sum,
          },
        };
        dispatch(updateCansAndCoins(dataUpdateCoinAndCans));
      } else {
        const dataUpdateCoinAndCans = {
          key: userData.key,
          coins: userData.coins,
          cans: {
            blue: userData.cans.blue - sum,
            green: userData.cans.green - sum,
            orange: userData.cans.orange - sum,
          },
        };

        let quantity = 0;
        if (elements[i].name == "Electronic lunch bo") {
          quantity = userData.giftOfMe[1].quantity + 1;
          let dataUserUpdate = userData;
          var updatedGiftOfMe = dataUserUpdate.giftOfMe.map((item, i) => {
            if (item.name == "Electronic lunch bo") {
              return {
                ...item,
                quantity: quantity,
              };
            }
            return item;
          });

          dataUserUpdate = {
            ...dataUserUpdate,
            giftOfMe: updatedGiftOfMe,
          };

          const dataUpdateGiftOfMe: DataUpdateGiftOfMe = {
            key: userData.key,
            data: dataUserUpdate,
          };
          dispatch(DataUpdateGiftOfMe(dataUpdateGiftOfMe));
        } else if (elements[i].name == "Airpod case") {
          quantity = userData.giftOfMe[2].quantity + 1;
          let dataUserUpdate = userData;
          var updatedGiftOfMe = dataUserUpdate.giftOfMe.map((item, i) => {
            if (item.name == "Airpod case") {
              return {
                ...item,
                quantity: quantity,
              };
            }
            return item;
          });

          dataUserUpdate = {
            ...dataUserUpdate,
            giftOfMe: updatedGiftOfMe,
          };

          const dataUpdateGiftOfMe: DataUpdateGiftOfMe = {
            key: userData.key,
            data: dataUserUpdate,
          };
          dispatch(DataUpdateGiftOfMe(dataUpdateGiftOfMe));
        } else if (elements[i].name == "Pepsi Tote Bag") {
          quantity = userData.giftOfMe[3].quantity + 1;
          let dataUserUpdate = userData;
          var updatedGiftOfMe = dataUserUpdate.giftOfMe.map((item, i) => {
            if (item.name == "Pepsi Tote Bag") {
              return {
                ...item,
                quantity: quantity,
              };
            }
            return item;
          });

          dataUserUpdate = {
            ...dataUserUpdate,
            giftOfMe: updatedGiftOfMe,
          };

          const dataUpdateGiftOfMe: DataUpdateGiftOfMe = {
            key: userData.key,
            data: dataUserUpdate,
          };
          dispatch(DataUpdateGiftOfMe(dataUpdateGiftOfMe));
        } else if (elements[i].name == "Portable speaker") {
          quantity = userData.giftOfMe[4].quantity + 1;
          let dataUserUpdate = userData;
          var updatedGiftOfMe = dataUserUpdate.giftOfMe.map((item, i) => {
            if (item.name == "Portable speaker") {
              return {
                ...item,
                quantity: quantity,
              };
            }
            return item;
          });

          dataUserUpdate = {
            ...dataUserUpdate,
            giftOfMe: updatedGiftOfMe,
          };

          const dataUpdateGiftOfMe: DataUpdateGiftOfMe = {
            key: userData.key,
            data: dataUserUpdate,
          };
          dispatch(DataUpdateGiftOfMe(dataUpdateGiftOfMe));
        } else if (elements[i].name == "Pepsi Tumbler") {
          quantity = userData.giftOfMe[5].quantity + 1;
          let dataUserUpdate = userData;
          var updatedGiftOfMe = dataUserUpdate.giftOfMe.map((item, i) => {
            if (item.name == "Pepsi Tumbler") {
              return {
                ...item,
                quantity: quantity,
              };
            }
            return item;
          });

          dataUserUpdate = {
            ...dataUserUpdate,
            giftOfMe: updatedGiftOfMe,
          };

          const dataUpdateGiftOfMe: DataUpdateGiftOfMe = {
            key: userData.key,
            data: dataUserUpdate,
          };
          dispatch(DataUpdateGiftOfMe(dataUpdateGiftOfMe));
        } else if (elements[i].name == "Pepsi Jacket") {
          quantity = userData.giftOfMe[6].quantity + 1;
          let dataUserUpdate = userData;
          var updatedGiftOfMe = dataUserUpdate.giftOfMe.map((item, i) => {
            if (item.name == "Pepsi Jacket") {
              return {
                ...item,
                quantity: quantity,
              };
            }
            return item;
          });

          dataUserUpdate = {
            ...dataUserUpdate,
            giftOfMe: updatedGiftOfMe,
          };

          const dataUpdateGiftOfMe: DataUpdateGiftOfMe = {
            key: userData.key,
            data: dataUserUpdate,
          };
          dispatch(DataUpdateGiftOfMe(dataUpdateGiftOfMe));
        } else if (elements[i].name == "Pepsi Bucket Hat") {
          quantity = userData.giftOfMe[7].quantity + 1;
          let dataUserUpdate = userData;
          var updatedGiftOfMe = dataUserUpdate.giftOfMe.map((item, i) => {
            if (item.name == "Pepsi Bucket Hat") {
              return {
                ...item,
                quantity: quantity,
              };
            }
            return item;
          });

          dataUserUpdate = {
            ...dataUserUpdate,
            giftOfMe: updatedGiftOfMe,
          };

          const dataUpdateGiftOfMe: DataUpdateGiftOfMe = {
            key: userData.key,
            data: dataUserUpdate,
          };
          dispatch(DataUpdateGiftOfMe(dataUpdateGiftOfMe));
        }
        dispatch(updateCansAndCoins(dataUpdateCoinAndCans));
      }
    }
  };

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
              handleExchangeGift();
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
                boldTexts={[`${exchangeGifts[quantityGift[0]].name}`]}
                textStyle={{ fontSize: 18, textAlign: "center" }}
                boldStyle={{ fontSize: 18 }}
                viewStyle={{
                  marginTop: DimensionsStyle.width * 0.05,
                  marginBottom: DimensionsStyle.width * 0.108,
                }}
              />
              <Image
                source={{
                  uri: listAllImages[exchangeGifts[quantityGift[0]].image],
                }}
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
