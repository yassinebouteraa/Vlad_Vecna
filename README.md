# Kashef (كاشف)

Arabic nature-explorer app for kids, built with React Native and Expo for the VECNA Algorithm 2.0 competition. Children photograph a plant, insect or animal, and Google Gemini identifies it and returns a short, kid-friendly description in Arabic, with XP and a rarity level to turn exploring Tunisian nature into a game.

## Features

**Scan:** camera capture sent to the Gemini API, which returns the name, emoji, rarity, XP and a description as JSON (`src/services/aiService.js`).

**Map:** every discovery is placed on a map with `react-native-maps`.

**Codex and badges:** a collection of everything found, with badges to unlock.

**Voice:** an Arabic welcome message read aloud with `expo-speech`.

## Tech stack

React Native 0.74, Expo 51, Google Generative AI SDK (Gemini), expo-camera, expo-speech, react-native-maps.

## Run it

Set `EXPO_PUBLIC_GEMINI_KEY` in a `.env` file, then:

```bash
npm install
npx expo start
```
