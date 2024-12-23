## Get started

1. Create .env and fill data

```
// concerning security, actual key value are not provided in this readme.
EXPO_PUBLIC_BUCKET_NAME=""
EXPO_PUBLIC_AWS_ACCESS_KEY_ID=""
EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY=""
EXPO_PUBLIC_AWS_REGION=""
```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
    npx expo start
   ```

## Project Structure

```
📦assignment
┣ 📂.expo
┣ 📂.github
┃ ┗ 📂workflows
┃ ┃ ┗ 📜ci-assignment.yaml
┣ 📂app
┃ ┣ 📂(main)
┃ ┃ ┗ 📜index.tsx
┃ ┣ 📜+not-found.tsx
┃ ┗ 📜_layout.tsx
┣ 📂assets
┃ ┣ 📂fonts
┃ ┃ ┗ 📜SpaceMono-Regular.ttf
┃ ┗ 📂images
┃ ┃ ┣ 📜adaptive-icon.png
┃ ┃ ┣ 📜favicon.png
┃ ┃ ┣ 📜icon.png
┃ ┃ ┣ 📜partial-react-logo.png
┃ ┃ ┣ 📜react-logo.png
┃ ┃ ┣ 📜react-logo@2x.png
┃ ┃ ┣ 📜react-logo@3x.png
┃ ┃ ┗ 📜splash-icon.png
┣ 📂components
┃ ┣ 📂atoms
┃ ┣ 📂molecules
┃ ┃ ┗ 📜ImageCard.tsx
┃ ┣ 📂organisms
┃ ┃ ┣ 📜ImageCardList.tsx
┃ ┃ ┗ 📜ImageUploadForm.tsx
┃ ┣ 📂ui
┃ ┃ ┣ 📜IconSymbol.ios.tsx
┃ ┃ ┣ 📜IconSymbol.tsx
┃ ┃ ┣ 📜TabBarBackground.ios.tsx
┃ ┃ ┗ 📜TabBarBackground.tsx
┃ ┣ 📂**tests**
┃ ┃ ┣ 📂**snapshots**
┃ ┃ ┃ ┗ 📜ThemedText-test.tsx.snap
┃ ┃ ┗ 📜ThemedText-test.tsx
┃ ┣ 📜Header.tsx
┃ ┣ 📜ParallaxScrollView.tsx
┃ ┣ 📜ThemedText.tsx
┃ ┗ 📜ThemedView.tsx
┣ 📂constants
┃ ┗ 📜Colors.ts
┣ 📂hooks
┃ ┣ 📜useColorScheme.ts
┃ ┣ 📜useColorScheme.web.ts
┃ ┣ 📜useColumnNumber.ts
┃ ┗ 📜useThemeColor.ts
┣ 📂scripts
┃ ┗ 📜reset-project.js
┣ 📂type
┃ ┗ 📜image.d.ts
┣ 📂util
┃ ┣ 📜dateFormat.ts
┃ ┗ 📜fileSize.ts
┣ 📜.env
┣ 📜.eslintrc.js
┣ 📜.gitignore
┣ 📜.prettierrc.json
┣ 📜app.json
┣ 📜babel.config.js
┣ 📜expo-env.d.ts
┣ 📜package-lock.json
┣ 📜package.json
┣ 📜README.md
┗ 📜tsconfig.json
```

## Features

### Fetch images

i separated feature with three steps, molecules-organisms-page.
when user entered main page, after component((main)/index.tsx) rendered, useEffect hook will run function: fetchImages.
after that, page component send Images state to organisms, ImageCardList.tsx as props.

in ImageCardList.tsx, in FlatList component, it send single Image to its child, ImageCard.tsx.
to implement responsible design, i made some custom hook, useColumnNumber. it returns number for each row, if width value for viewport shrink, it return lower number value.

in ImageCard.tsx component, it describe image, and its detail info - name, size, and updated date.
to format some data like size and date, i made util functions, dateFormat.ts and fileSize.ts.
in fileSize.ts, it takes numeric filesize from image as parameter. and, calculate detail file size with unit, "Bytes", "KB", "MB", "GB", "TB".
in dateFormat.ts, it takes Date data as parameter. and, it returns formatted date, as "YYYY-MM-DD" format.

```
// dateFormat.ts
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const dateFormat = (originalDate: Date) => {
  const date = new Date(originalDate);
  const formattedDate = dayjs(date).tz("Asia/Seoul").format("YYYY-MM-DD");

  return formattedDate;
};

```

```
// fileSize.ts
export const fileSize = (size: number) => {
  if (size === 0) return "0 Byte";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

```

### Upload images

in main page component((main)/index.tsx), it has ImageUploadForm.tsx component as child.
it has button element, and user clicked it, it import image uploader. user can upload multiple image, and it runs fetchImages function as successCallback.
