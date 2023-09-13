import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useMemo, useState } from "react";
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
  fontFamily,
} from "@assets";
import { Colors, DimensionsStyle } from "@resources";
import { DATAGIFT } from "../popup";
import { Gift } from "@domain";
import { Button } from "../button";

type Props = {};

type ItemProps = {
  item: Gift;
  onPress: () => void;
  listImages: Record<string, string>;
};

const Item = ({ item, onPress, listImages }: ItemProps) => (
  <View
    style={[
      _styles.containerItem,
      {
        backgroundColor: item.quantity <= 5 ? Colors.WHITE_2 : Colors.WHITE,
        display: item.quantity == 0 ? "none" : "flex",
      },
    ]}
  >
    <Image source={{ uri: listImages[item.image] }} style={_styles.imageItem} />

    <Image
      source={{
        uri:
          item.quantity <= 5
            ? listImages[BG_COIN_WARNING]
            : listImages[IMAGE_COIN_EXCHANGE],
      }}
      style={_styles.imageCoinExchange}
    />

    <Text style={_styles.textCoinExchange}>{item.coinExchange}</Text>

    <View
      style={[
        _styles.containerViewContent,
        { backgroundColor: item.quantity <= 5 ? Colors.GRAY : Colors.RED },
      ]}
    >
      <Text
        style={{
          color: item.quantity <= 5 ? Colors.WHITE : Colors.YELLOW,
          fontFamily: fontFamily.Black721,
          fontSize: 14,
        }}
      >
        {item.name}
      </Text>
      <Text
        style={{
          color: Colors.WHITE,
          fontFamily: fontFamily.medium,
          fontSize: 10,
        }}
      >
        Còn lại: {item.quantity}
      </Text>
      <Button
        sumPlay=""
        title="Đổi quà"
        uriImage={
          item.quantity <= 5
            ? listImages[BG_EXCHANGE_WARNING]
            : listImages[BUTTON_EXCHANGE]
        }
        pressableStyle={{
          marginVertical: 7,
          height: 37,
          width: DimensionsStyle.width * 0.3,
          backgroundColor: "transparent",
          borderColor: "transparent",
        }}
        onPress={onPress}
        textStyle={{
          fontSize: 14,
          color: item.quantity <= 5 ? Colors.WHITE : Colors.BLUE_2,
        }}
      />
    </View>
  </View>
);

const _FlatlistExchangeGift: React.FC<Props> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const newArray = DATAGIFT.filter((item) => item.name !== "300 coins");
  const [gift, setGift] = useState<Gift>(DATAGIFT[0]);
  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );

  const halfwayIndex = Math.ceil(newArray.length / 2);
  const column1Data = newArray.slice(0, halfwayIndex);
  const column2Data = newArray.slice(halfwayIndex);

  console.log(gift.name);

  const renderItem = useMemo(
    () =>
      ({ item }: { item: Gift }) => {
        return (
          <Item
            item={item}
            listImages={listAllImages}
            onPress={() => {
              setGift(item);
            }}
            key={item.key}
          />
        );
      },
    []
  );

  return (
    <View style={_styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
        }}
      >
        <View style={_styles.viewCoin}>
          <Image
            source={{ uri: listAllImages[COINT] }}
            style={_styles.imageCoin}
          />
          <Text style={_styles.textCoinNow}>Số coins hiện tại của bạn</Text>
          <Text style={_styles.textCoin}>700</Text>
        </View>
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
    height: DimensionsStyle.height * 0.32,
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
    marginTop: "-45%",
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
    top: 20.5,
    fontFamily: fontFamily.Black721,
    fontSize: 18,
    color: Colors.WHITE,
  },

  containerViewContent: {
    position: "absolute",
    bottom: 0,
    height: "35%",
    backgroundColor: Colors.RED,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
export const FlatlistExchangeGift = React.memo(_FlatlistExchangeGift);
