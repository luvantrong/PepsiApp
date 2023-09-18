import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  ScrollView,
  Modal,
  ImageBackground,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, storage } from "@shared-state";
import {
  BG_COIN_WARNING,
  BG_EXCHANGE_WARNING,
  BG_GETCODE,
  BUTTON_CLOSE,
  BUTTON_EXCHANGE,
  COINT,
  IMAGE_COIN_EXCHANGE,
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
  BACKGROUND_OF_ME,
} from "@assets";
import { Colors, DimensionsStyle } from "@resources";
import { PopupEnterInfo } from "../popup";
import { Gift, User, GiftOfMe } from "@domain";
import { Button } from "../button";
import LinearGradient from "react-native-linear-gradient";

const DATAGIFTOFME: GiftOfMe[] = [
  {
    key: "0",
    image: GIFT_COIN,
    name: "300 coins",
    quantity: 0,
    status: false,
  },
  {
    key: "1",
    image: GIFT_ELECTRONIC,
    name: "Electronic lunch bo",
    quantity: 0,
    status: true,
  },
  {
    key: "2",
    image: GIFT_AIRPORT,
    name: "Airpod case",
    quantity: 2,
    status: false,
  },
  {
    key: "3",
    image: GIFT_BAG,
    name: "Pepsi Tote Bag",
    quantity: 0,
    status: false,
  },
  {
    key: "4",
    image: GIFT_SONY,
    name: "Portable speaker",
    quantity: 0,
    status: false,
  },
  {
    key: "5",
    image: GIFT_TUMBLER,
    name: "Pepsi Tumbler",
    quantity: 1,
    status: false,
  },
  {
    key: "6",
    image: GIFT_JACKET,
    name: "Pepsi Jacket",
    quantity: 0,
    status: false,
  },
  {
    key: "7",
    image: GIFT_HAT,
    name: "Pepsi Bucket Hat",
    quantity: 1,
    status: false,
  },
];

type Props = {};

type ItemProps = {
  item: GiftOfMe;
  listImages: Record<string, string>;
  listGiftOfMe: GiftOfMe[];
};

const Item = ({ item, listImages, listGiftOfMe }: ItemProps) => {
  const [status, setStatus] = useState("Đã nhận");
  const [color, setColor] = useState(Colors.GREEN);
  useEffect(() => {
    if (item.status == false) {
      setStatus("Chưa nhận");
      setColor(Colors.RED);
    } else {
      setStatus("Đã nhận");
      setColor(Colors.GREEN);
    }
  }, [listGiftOfMe, item.status, item.quantity]);

  return (
    <View style={[_styles.containerItem]}>
      <ImageBackground
        source={{ uri: listImages[BACKGROUND_OF_ME] }}
        style={[_styles.containerItem, { overflow: "hidden" }]}
      >
        <View
          style={{
            width: "100%",
            height: "70%",
            position: "absolute",
            backgroundColor: Colors.WHITE,
            top: 0,
          }}
        ></View>
        <Image
          source={{ uri: listImages[item.image] }}
          style={_styles.imageItem}
        />

        <View
          style={[
            _styles.containerViewContent,
            { backgroundColor: "transparent" },
          ]}
        >
          <Text
            style={{
              color: Colors.BLUE_3,
              fontFamily: fontFamily.Black721,
              fontSize: 16,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              color: Colors.BLUE_3,
              fontFamily: fontFamily.medium,
              fontSize: 12,
              marginTop: 2,
            }}
          >
            Trạng thái:{" "}
            <Text
              style={{
                color: color,
                fontFamily: fontFamily.Black721,
                fontSize: 12,
              }}
            >
              {status}
            </Text>
          </Text>
        </View>
      </ImageBackground>
      <Image
        source={{
          uri: listImages[IMAGE_COIN_EXCHANGE],
        }}
        style={_styles.imageCoinExchange}
      />
      <Text style={_styles.textCoinExchange}>{item.quantity}</Text>
    </View>
  );
};

const _FlatlistGiftOfMe: React.FC<Props> = (props) => {
  const userData = useSelector<RootState, User>(
    (state) => state.user.dataUsers
  );

  const [newArray, setNewArray] = useState<GiftOfMe[]>([]);

  useEffect(() => {
    const listGiftOfMe: GiftOfMe[] = userData.giftOfMe;

    setNewArray(
      listGiftOfMe.filter((item) => {
        return item.name !== "300 coins" && item.quantity !== 0;
      })
    );
  }, [userData]);

  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );

  const halfwayIndex = Math.ceil(newArray.length / 2);
  const column1Data = newArray.slice(0, halfwayIndex);
  const column2Data = newArray.slice(halfwayIndex);

  const renderItem = useMemo(
    () =>
      ({ item }: { item: GiftOfMe }) => {
        return (
          <Item
            item={item}
            listImages={listAllImages}
            key={item.key}
            listGiftOfMe={userData.giftOfMe}
          />
        );
      },
    []
  );

  return (
    <View style={_styles.container}>
      {newArray.length == 0 ? (
        <View>
          <Text>bạn chưa có qùa tặng</Text>
        </View>
      ) : (
        <ScrollView>
          <View>
            {
              <View style={_styles.containerFlatlist}>
                <View>
                  {column1Data.map((item, index) => renderItem({ item: item }))}
                </View>
                <View>
                  {column2Data.map((item, index) => renderItem({ item: item }))}
                </View>
              </View>
            }
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const _styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },

  viewCoin: {
    alignItems: "center",
    marginBottom: 10,
  },

  imageCoin: {
    width: DimensionsStyle.width * 0.3,
    height: DimensionsStyle.width * 0.3,
    resizeMode: "stretch",
  },

  textCoinNow: {
    fontSize: 18,
    fontFamily: fontFamily.Black721,
    color: Colors.WHITE,
    marginTop: 5,
  },

  textCoin: {
    fontSize: 42,
    fontFamily: fontFamily.Black721,
    color: Colors.WHITE,
    textShadowColor: Colors.YELLOW,
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 2,
    position: "absolute",
    top: DimensionsStyle.height * 0.03,
  },

  containerFlatlist: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 20,
  },

  containerItem: {
    width: DimensionsStyle.width * 0.43,
    height: DimensionsStyle.height * 0.28,
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    justifyContent: "center",
  },

  imageItem: {
    width: "90%",
    height: "55%",
    marginBottom: 20,
    borderRadius: 20,
    resizeMode: "stretch",
    marginTop: "-30%",
  },

  imageCoinExchange: {
    width: "35%",
    height: "15%",
    resizeMode: "stretch",
    position: "absolute",
    right: -4,
    top: 10,
  },

  textCoinExchange: {
    position: "absolute",
    right: 9,
    top: 17.5,
    fontFamily: fontFamily.Black721,
    fontSize: 18,
    color: Colors.WHITE,
  },

  containerViewContent: {
    position: "absolute",
    bottom: 0,
    height: "30%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
export const FlatlistGiftOfMe = React.memo(_FlatlistGiftOfMe);
