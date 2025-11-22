import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { colors } from "../../constants";

type CustomInputProps = {
  value: string;
  setValue: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  placeholderTextColor: string;
  onFocus?: () => void;
  radius: number;
  width?: string;
  keyboardType?: TextInputProps["keyboardType"];
  maxLength?: number;
};

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  setValue,
  placeholder,
  secureTextEntry = false,
  placeholderTextColor,
  onFocus,
  radius,
  width = "100%",
  keyboardType = "default",
  maxLength,
}) => {
  return (
    <View style={{ width: width as any }}>
      <TextInput
        placeholder={placeholder}
        onChangeText={setValue}
        value={value}
        secureTextEntry={secureTextEntry}
        style={[styles.CustomInput, { borderRadius: radius }]}
        placeholderTextColor={placeholderTextColor}
        onFocus={onFocus}
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  CustomInput: {
    height: 40,
    marginBottom: 10,
    marginTop: 10,
    width: "100%",
    padding: 5,
    backgroundColor: colors.white,
    elevation: 5,
    paddingHorizontal: 20,
  },
});
