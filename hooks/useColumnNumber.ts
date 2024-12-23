import { useWindowDimensions, Platform } from "react-native";

export function useColumnNumber() {
  const { width } = useWindowDimensions();

  const getNumColumns = () => {
    if (Platform.OS === "web") {
      if (width >= 1440) return 5;
      if (width >= 1024) return 4;
      if (width >= 768) return 3;
      if (width >= 480) return 2;
      return 1;
    } else {
      if (width >= 768) return 3;
      if (width >= 480) return 2;
      return 1;
    }
  };

  return getNumColumns();
}
