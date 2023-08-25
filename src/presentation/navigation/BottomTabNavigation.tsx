import {
  StyleSheet,
  Text,
  View,
  Image,
  PixelRatio,
  Dimensions,
} from "react-native";
import React from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Test } from "../component/test";
import {
  BG_BOTTOM_TAB,
  ICON_BOTTOM_BESTLIST,
  ICON_BOTTOM_BESTLIST_ACTIVE,
  ICON_BOTTOM_MIC,
  ICON_BOTTOM_PROFILE,
  ICON_BOTTOM_PROFILE_ACTIVE,
  ICON_BOTTOM_RATING,
  ICON_BOTTOM_RATING_ACTIVE,
  ICON_BOTTOM_VIDEOLIST,
  ICON_BOTTOM_VIDEOLIST_ACTIVE,
  fontFamily,
} from "@assets";
import { Colors } from "@resources";
const Tab = createBottomTabNavigator();

type BottomTabNavigationProps = {};

const _BottomTabNavigation: React.FC<BottomTabNavigationProps> = () => {
  const tabBarBackground: BottomTabNavigationOptions["tabBarBackground"] =
    () => (
      <Image
        source={{ uri: BG_BOTTOM_TAB }}
        style={StyleSheet.flatten(_styles.styleImageBackgroundBottomTab)}
      />
    );
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Thu âm"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            ..._styles.styleBottomTab,
          },
          tabBarActiveTintColor: Colors.WHITE,
          tabBarInactiveTintColor: Colors.SHADOW_ICON_MIC,
          tabBarBackground,
        }}
      >
        <Tab.Screen
          name="Video list"
          component={Test}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={StyleSheet.flatten(_styles.styleScreenTabBar)}>
                {focused ? (
                  <Image
                    source={{
                      uri: ICON_BOTTOM_VIDEOLIST_ACTIVE,
                    }}
                    style={StyleSheet.flatten([
                      _styles.styleIconBottomTab,
                      { width: 32, height: 32 },
                    ])}
                  />
                ) : (
                  <Image
                    source={{
                      uri: ICON_BOTTOM_VIDEOLIST,
                    }}
                    style={StyleSheet.flatten(_styles.styleIconBottomTab)}
                  />
                )}

                <Text
                  style={
                    focused
                      ? StyleSheet.flatten(_styles.styleTextBottomActive)
                      : StyleSheet.flatten(_styles.styleTextBottomTab)
                  }
                >
                  Video list
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Best list"
          component={Test}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={StyleSheet.flatten(_styles.styleScreenTabBar)}>
                {focused ? (
                  <Image
                    source={{
                      uri: ICON_BOTTOM_BESTLIST_ACTIVE,
                    }}
                    style={StyleSheet.flatten([
                      _styles.styleIconBottomTab,
                      { width: 32, height: 32 },
                    ])}
                  />
                ) : (
                  <Image
                    source={{
                      uri: ICON_BOTTOM_BESTLIST,
                    }}
                    style={StyleSheet.flatten(_styles.styleIconBottomTab)}
                  />
                )}
                <Text
                  style={
                    focused
                      ? StyleSheet.flatten(_styles.styleTextBottomActive)
                      : StyleSheet.flatten(_styles.styleTextBottomTab)
                  }
                >
                  Best list
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Thu âm"
          component={Test}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={StyleSheet.flatten([_styles.styleScreenTabMic])}>
                <Image
                  source={{
                    uri: ICON_BOTTOM_MIC,
                  }}
                  style={StyleSheet.flatten([
                    _styles.styleIconBottomTab,
                    { width: 77, height: 77 },
                  ])}
                />
                <Text
                  style={
                    focused
                      ? StyleSheet.flatten([
                          _styles.styleTextBottomActive,
                          { top: 46 },
                        ])
                      : StyleSheet.flatten(_styles.styleTextBottomTabMic)
                  }
                >
                  Thu âm
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Xếp hạng"
          component={Test}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={StyleSheet.flatten(_styles.styleScreenTabBar)}>
                {focused ? (
                  <Image
                    source={{
                      uri: ICON_BOTTOM_RATING_ACTIVE,
                    }}
                    style={StyleSheet.flatten([
                      _styles.styleIconBottomTab,
                      { width: 32, height: 32 },
                    ])}
                  />
                ) : (
                  <Image
                    source={{
                      uri: ICON_BOTTOM_RATING,
                    }}
                    style={StyleSheet.flatten(_styles.styleIconBottomTab)}
                  />
                )}
                <Text
                  style={
                    focused
                      ? StyleSheet.flatten(_styles.styleTextBottomActive)
                      : StyleSheet.flatten(_styles.styleTextBottomTab)
                  }
                >
                  Xếp hạng
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Cá nhân"
          component={Test}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={StyleSheet.flatten(_styles.styleScreenTabBar)}>
                <Image
                  source={{
                    uri: focused
                      ? ICON_BOTTOM_PROFILE_ACTIVE
                      : ICON_BOTTOM_PROFILE,
                  }}
                  style={StyleSheet.flatten(_styles.styleIconBottomTab)}
                />
                <Text
                  style={
                    focused
                      ? StyleSheet.flatten(_styles.styleTextBottomActive)
                      : StyleSheet.flatten(_styles.styleTextBottomTab)
                  }
                >
                  Cá nhân
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const _styles = StyleSheet.create({
  styleImageBackgroundBottomTab: {
    width: "100%",
    height: 89,
    flex: 1,
    resizeMode: "cover",
  },

  styleIconBottomTab: {
    width: 24,
    height: 24,
    marginBottom: 4,
    resizeMode: "cover",
    position: "absolute",
  },

  styleScreenTabBar: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: -10,
  },

  styleScreenTabMic: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "absolute",
    top: -12,
  },

  styleTextBottomTab: {
    color: Colors.TEXT_BOTTOM_BAR,
    fontFamily: fontFamily.medium,
    fontSize: 10,
    position: "absolute",
    top: 15,
  },

  styleTextBottomTabMic: {
    color: Colors.TEXT_BOTTOM_BAR,
    fontFamily: fontFamily.bold,
    fontSize: 10,
    position: "absolute",
    top: 46,
  },

  styleBottomTab: {
    height: 89,
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  styleTextBottomActive: {
    color: Colors.WHITE,
    fontFamily: fontFamily.bold,
    fontSize: 10,
    position: "absolute",
    top: 15,
  },
});

export const BottomTabNavigation = React.memo(_BottomTabNavigation);
