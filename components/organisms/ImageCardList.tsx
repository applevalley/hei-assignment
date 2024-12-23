import { FlatList, StyleSheet } from "react-native";

import { useColumnNumber } from "@/hooks/useColumnNumber";
import { ImageType } from "@/type/image";

import { ImageCard } from "@/components/molecules/ImageCard";

interface Props {
  images: ImageType[];
}

export function ImageCardList({ images }: Props) {
  const columnNumber = useColumnNumber();
  return (
    <FlatList
      data={images}
      key={columnNumber}
      numColumns={columnNumber}
      renderItem={({ item }) => <ImageCard item={item} />}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.container}
      columnWrapperStyle={columnNumber > 1 ? styles.columnWrapper : undefined}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  columnWrapper: {
    gap: 10,
  },
});
