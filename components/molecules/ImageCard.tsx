import { Image, StyleSheet } from "react-native";

import { ImageType } from "@/type/image";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { fileSize } from "@/util/fileSize";
import { dateFormat } from "@/util/dateFormat";

interface Props {
  item: ImageType;
}

export function ImageCard({ item }: Props) {
  return (
    <ThemedView style={styles.imageContainer}>
      <Image source={{ uri: item.url }} style={styles.image} />
      <ThemedText>{`name: ${item.key}`}</ThemedText>
      {item?.size && <ThemedText>{`size: ${fileSize(item.size)}`}</ThemedText>}
      {item?.lastModified && <ThemedText>{`updated: ${dateFormat(item.lastModified)}`}</ThemedText>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    margin: 5,
    position: "relative",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1,
  },
});
