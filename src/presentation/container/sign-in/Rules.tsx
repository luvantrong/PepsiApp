import { SafeAreaView, StyleSheet, Text, ScrollView } from "react-native";
import React from "react";
import { BACKGROUND_RULES, ICON_ARROW, ICON_LOGOUT, fontFamily } from "@assets";
import { BackgroundApp, Header } from "@components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@navigation";
import { Colors } from "@resources";
import { useSelector } from "react-redux";
import { RootState } from "@shared-state";

const contentRules_1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque tortor luctus auctor quam. Aliquam eget augue fermentum eu, at etiam. Id porttitor egestas tortor nisl. Maecenas volutpat sapien neque et sit mauris quis. Neque consectetur egestas nam rutrum nisi, eu lobortis et turpis. Duis id parturient sit et faucibus cursus. A maecenas nec enim consectetur non, donec vitae. Gravida vulputate quam nibh gravida. Quis egestas neque, nibh commodo elit sed odio ac. Purus elementum risus aliquam nunc in. Sapien nunc ornare fermentum non laoreet nec turpis sit turpis. \n";

const contentRules_2 =
  "Tellus ultrices vitae tincidunt eget ut. Et mattis arcu, sit feugiat dui sem in vel. Dictum nulla sagittis nunc mi tortor cursus. Lectus erat commodo dui venenatis habitasse venenatis vivamus sit. Pulvinar sem non sapien eu viverra amet, facilisi. Pellentesque enim id quis porta tortor congue. Nunc, elementum leo maecenas neque ultrices.Pellentesque enim id quis porta tortor congue. Nunc, elementum leo maecenas neque ultrices.Pellentesque enim id quis porta tortor congue. \n";

const contentRules_3 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque tortor luctus auctor quam. Aliquam eget augue fermentum eu, at etiam. Id porttitor egestas tortor nisl. Maecenas volutpat sapien neque et sit mauris quis. Neque consectetur egestas nam rutrum nisi, eu lobortis et turpis. Duis id parturient sit et faucibus cursus. A maecenas nec enim consectetur non, donec vitae. Gravida vulputate quam nibh gravida. Quis egestas neque, nibh commodo elit sed odio ac. Purus elementum risus aliquam nunc in. Sapien nunc ornare fermentum non laoreet nec turpis sit turpis. \n";

const contentRules_4 =
  "Tellus ultrices vitae tincidunt eget ut. Et mattis arcu, sit feugiat dui sem in vel. Dictum nulla sagittis nunc mi tortor cursus. Lectus erat commodo dui venenatis habitasse venenatis vivamus sit. Pulvinar sem non sapien eu viverra amet, facilisi. Pellentesque enim id quis porta tortor congue. Nunc, elementum leo maecenas neque ultrices.Pellentesque enim id quis porta tortor congue. Nunc, elementum leo maecenas neque ultrices. \n";

const contentRules_5 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque tortor luctus auctor quam. Aliquam eget augue fermentum eu, at etiam. Id porttitor egestas tortor nisl. Maecenas volutpat sapien neque et sit mauris quis. Neque consectetur egestas nam rutrum nisi, eu lobortis et turpis. Duis id parturient sit et faucibus cursus. A maecenas nec enim consectetur non, donec vitae. Gravida vulputate quam nibh gravida. Quis egestas neque, nibh commodo elit sed odio ac. Purus elementum risus aliquam nunc in. Sapien nunc ornare fermentum non laoreet nec turpis sit turpis. \n";

const contentRules_6 =
  "Tellus ultrices vitae tincidunt eget ut. Et mattis arcu, sit feugiat dui sem in vel. Dictum nulla sagittis nunc mi tortor cursus. Lectus erat commodo dui venenatis habitasse venenatis vivamus sit. Pulvinar sem non sapien eu viverra amet, facilisi. Pellentesque enim id quis porta tortor congue. Nunc, elementum leo maecenas neque ultrices.Pellentesque enim id quis porta tortor congue. Nunc, elementum leo maecenas neque ultrices.Pellentesque enim id quis porta tortor congue. \n";

const contentRules_7 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque tortor luctus auctor quam. Aliquam eget augue fermentum eu, at etiam. Id porttitor egestas tortor nisl. Maecenas volutpat sapien neque et sit mauris quis. Neque consectetur egestas nam rutrum nisi, eu lobortis et turpis. Duis id parturient sit et faucibus cursus. A maecenas nec enim consectetur non, donec vitae. Gravida vulputate quam nibh gravida. Quis egestas neque, nibh commodo elit sed odio ac. Purus elementum risus aliquam nunc in. Sapien nunc ornare fermentum non laoreet nec turpis sit turpis.";

type PropsType = NativeStackScreenProps<HomeStackParamList, "Rules">;

const _Rules: React.FC<PropsType> = (props) => {
  const { navigation } = props;
  const listAllImages = useSelector<RootState, Record<string, string>>(
    (state) => state.storage.storage
  );

  const handleGoBack = () => {
    navigation.push("SignUp");
  };
  return (
    <BackgroundApp uri={listAllImages[BACKGROUND_RULES]}>
      <SafeAreaView style={{ flex: 1, marginBottom: -40 }}>
        <Header
          iconLeft={listAllImages[ICON_ARROW]}
          titleCenter="Thể lệ chương trình"
          iconRight={listAllImages[ICON_LOGOUT]}
          loginStatus={false}
          onPressLeft={handleGoBack}
        />
        <ScrollView
          style={_styles.scrollViewStyle}
          scrollIndicatorInsets={{ right: 4 }}
          indicatorStyle="black"
        >
          <Text style={_styles.contentRulesStyle}>{contentRules_1}</Text>
          <Text style={_styles.contentRulesStyle}>{contentRules_2}</Text>
          <Text style={_styles.contentRulesStyle}>{contentRules_3}</Text>
          <Text style={_styles.contentRulesStyle}>{contentRules_4}</Text>
          <Text style={_styles.contentRulesStyle}>{contentRules_5}</Text>
          <Text style={_styles.contentRulesStyle}>{contentRules_6}</Text>
          <Text style={[_styles.contentRulesStyle, { marginBottom: 40 }]}>
            {contentRules_7}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </BackgroundApp>
  );
};

const _styles = StyleSheet.create({
  contentRulesStyle: {
    fontFamily: fontFamily.medium,
    color: Colors.WHITE,
    fontSize: 12,
    textAlign: "justify",
  },

  scrollViewStyle: {
    marginTop: 10,
    marginStart: 35,
    paddingEnd: 35,
  },
});

export const Rules = React.memo(_Rules);
