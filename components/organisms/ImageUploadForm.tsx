import { useState } from "react";
import { Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { useForm } from "react-hook-form";

interface ImageUploadFormProps {
  s3Client: S3Client;
  bucketName: string;
  onUploadSuccess: () => void;
}

interface FormInputs {
  imageUri: string;
}

export function ImageUploadForm({ s3Client, bucketName, onUploadSuccess }: ImageUploadFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { handleSubmit, setValue, reset } = useForm<FormInputs>({
    defaultValues: {
      imageUri: "",
    },
  });

  const requestPermissions = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("권한 필요", "이미지를 업로드하기 위해 갤러리 접근 권한이 필요합니다.");
      return false;
    }
    return true;
  };

  const uploadImage = async () => {
    if (!(await requestPermissions())) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        setValue("imageUri", result.assets[0].uri);
        handleSubmit(onSubmit)();
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("에러", "이미지 선택 중 오류가 발생했습니다.");
    }
  };

  const onSubmit = async (data: FormInputs) => {
    try {
      setIsUploading(true);
      const fileName = `image-${Date.now()}.jpg`;

      const { url, fields } = await createPresignedPost(s3Client, {
        Bucket: bucketName,
        Key: fileName,
        Conditions: [
          ["content-length-range", 0, 10485760],
          ["starts-with", "$Content-Type", "image/"],
        ],
        Fields: {
          "Content-Type": "image/jpeg",
        },
        Expires: 600,
      });

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(data.imageUri);
      const blob = await response.blob();
      formData.append("file", blob);

      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }

      reset();
      onUploadSuccess();
      Alert.alert("성공", "이미지가 성공적으로 업로드되었습니다.");
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("에러", "업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return <Button title="이미지 업로드" onPress={uploadImage} disabled={isUploading} />;
}
