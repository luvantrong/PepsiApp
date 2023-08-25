import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../stacks/StackHome";
import { Test } from "@components";

type PropsType = NativeStackScreenProps<StackParamList, "Home">;
const Home: React.FC<PropsType> = (props) => {
  const { navigation } = props;
  return (
    <SafeAreaView>
      <Text>Welcome to App!</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          padding: 10,
          width: 150,
          borderRadius: 10,
          alignSelf: "center",
        }}
        onPress={() => {
          navigation.navigate("About");
        }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Go to About</Text>
      </TouchableOpacity>
      <Test />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
