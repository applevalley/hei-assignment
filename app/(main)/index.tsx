import { Button, Alert, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";

import { ImageType } from "@/type/image";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ImageUploadForm } from "@/components/organisms/ImageUploadForm";
import { ImageCardList } from "@/components/organisms/ImageCardList";

const BUCKET_NAME = process.env.EXPO_PUBLIC_BUCKET_NAME || "test-storage";
const ACCESS_KEY = process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID;
const SECRET_KEY = process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY;
const REGION = process.env.EXPO_PUBLIC_AWS_REGION || "ap-northeast-2";

export default function HomeScreen() {
  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY || "",
      secretAccessKey: SECRET_KEY || "",
    },
  });

  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const command = new ListObjectsCommand({
        Bucket: BUCKET_NAME,
      });

      const response = await s3Client.send(command);
      const imageList =
        response.Contents?.filter((item) => item.Key && item.Key.match(/\.(jpg|jpeg|png|gif)$/i)) ||
        [];

      const processedImages: ImageType[] = [];

      for (const item of imageList) {
        if (item.Key) {
          const url = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${item.Key}`;
          processedImages.push({
            key: item.Key,
            url: url,
            size: item.Size,
            lastModified: item.LastModified,
          });
        }
      }

      setImages(processedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
      Alert.alert("에러", "이미지 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}>
      <ThemedView style={styles.buttonContainer}>
        <ImageUploadForm
          s3Client={s3Client}
          bucketName={BUCKET_NAME}
          onUploadSuccess={fetchImages}
        />
        <Button title="새로고침" onPress={fetchImages} disabled={loading} />
      </ThemedView>
      <ImageCardList images={images} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 1,
  },
});
