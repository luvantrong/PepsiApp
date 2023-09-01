import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { fontFamily } from "@assets";
import { Colors } from "@resources";
// import firebase from "firebase/compat/app";
// import "firebase/compat/firestore";
// import { firebaseConfig } from "@core";

// export let firestore: firebase.firestore.Firestore;

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
//   firestore = firebase.firestore();
// }

type Banner = {
  key: string;
  name: string;
  age: number;
};

const _Test = () => {
  return (
    <SafeAreaView>
      <Text
        style={{ fontFamily: fontFamily.italic, marginStart: 10, fontSize: 30 }}
      >
        Ri thèm nước ngọt, Ri có tiền tự mua đi, Ri không có tiền thì nhịn,chú
        trom
      </Text>
    </SafeAreaView>
  );
};

const _styles = StyleSheet.create({});

export const Test = React.memo(_Test);
