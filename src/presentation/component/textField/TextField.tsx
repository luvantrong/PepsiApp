import {
  StyleSheet,
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import React from "react";
import { fontFamily } from "@assets";
import { Colors } from "@resources";

export type TextFieldProps = {
  placeholder: string;
  viewStyle?: StyleProp<ViewStyle>;
  onChange?: (text: string) => void;
  textStyle?: StyleProp<TextStyle>;
  value: string;
  type?: boolean;
};

const _TextField: React.FC<TextFieldProps> = (props) => {
  const { placeholder, onChange, value, type } = props;
  return (
    <View style={[{ marginHorizontal: 20 }, props.viewStyle]}>
      <TextInput
        style={StyleSheet.flatten([_styles.textInputStyle, props.textStyle])}
        placeholder={placeholder}
        placeholderTextColor={Colors.BLACK_PLA}
        onChangeText={onChange}
        value={value}
        multiline={type == true ? true : false}
      />
    </View>
  );
};

const _styles = StyleSheet.create({
  textInputStyle: {
    borderWidth: 1,
    borderColor: Colors.WHITE,
    height: 44,
    borderRadius: 8,
    paddingStart: 16,
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: Colors.BLACK,
    backgroundColor: Colors.WHITE,
    marginTop: 25,
  },
});

export const TextField = React.memo(_TextField);
