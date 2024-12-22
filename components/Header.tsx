import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export function Header() {
  return (
    <ThemedView style={styles.headerContainer}>
      <ThemedText type="subtitle">Hello, user</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 30,
    backgroundColor: "lightgrey",
  },
});
