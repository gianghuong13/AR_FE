import React from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants";

type Props = {
  visible: boolean;
  label?: string;
};

const CustomLoader: React.FC<Props> = ({ visible, label }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.primary} />
          {label && <Text style={{ marginTop: 10 }}>{label}</Text>}
        </View>
      </View>
    </Modal>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  loader: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
