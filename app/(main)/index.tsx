import ParallaxScrollView from "@/components/ParallaxScrollView";

import { Button, StyleSheet } from "react-native";
import { S3Client } from "@aws-sdk/client-s3";

import { ThemedView } from "@/components/ThemedView";
import { ImageUploadForm } from "@/components/organisms/ImageUploadForm";

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

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}>
      <ThemedView style={styles.buttonContainer}>
        <ImageUploadForm s3Client={s3Client} bucketName={BUCKET_NAME} onUploadSuccess={() => {}} />
        <Button title="새로고침" onPress={() => {}} disabled={false} />
      </ThemedView>
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
