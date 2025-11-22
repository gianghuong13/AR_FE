import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants";

type Props = {
  steps: string[];
  currentStep: number; // 1-based index
};

const CustomStepIndicator: React.FC<Props> = ({ steps, currentStep }) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isActive = index + 1 <= currentStep;
        const isCurrent = index + 1 === currentStep;

        return (
          <View key={index} style={styles.stepWrapper}>
            {/* Circle */}
            <View
              style={[
                styles.circle,
                {
                  backgroundColor: isActive ? colors.primary : "#ccc",
                  borderWidth: isCurrent ? 2 : 0,
                  borderColor: isCurrent ? colors.primary : "transparent",
                },
              ]}
            >
              <Text style={styles.circleText}>{index + 1}</Text>
            </View>

            {/* Label */}
            <Text style={[styles.label, { color: isActive ? colors.primary : "#aaa" }]}>
              {step}
            </Text>

            {/* Line */}
            {index !== steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  { backgroundColor: index + 1 < currentStep ? colors.primary : "#ccc" },
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default CustomStepIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  stepWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  label: {
    marginLeft: 5,
    fontSize: 12,
    width: 70,
  },
  line: {
    flex: 1,
    height: 2,
    marginLeft: 5,
    marginRight: 5,
  },
});
