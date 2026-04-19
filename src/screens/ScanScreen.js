import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, ActivityIndicator, Animated } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Speech from 'expo-speech';
import { colors, fonts } from '../theme';
import StoryCard from '../components/StoryCard';
import { identifyNature } from '../services/aiService';

const { width: W, height: H } = Dimensions.get('window');

function ScanLine() {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 2000, useNativeDriver: true })
      ])
    ).start();
  }, []);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, W * 0.7 - 2]
  });

  return (
    <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]} />
  );
}

export default function ScanScreen({ onAddResult, onRetry }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!permission || !permission.granted) {
      requestPermission();
    }
  }, []);

  const handleScan = async () => {
    if (isScanning || !cameraRef.current) return;
    
    setIsScanning(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
        skipProcessing: true
      });

      const aiResult = await identifyNature(photo.uri);
      
      if (aiResult) {
        setResult(aiResult);
        setShowResult(true);
        // Speak the result in Arabic
        if (aiResult.audioTextAr) {
          Speech.speak(aiResult.audioTextAr, { language: 'ar', rate: 0.9 });
        }
      } else {
        alert("عذراً، لم أستطع التعرف على هذا. حاول مرة أخرى!");
      }
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء التصوير.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleRetryLocal = () => {
    setShowResult(false);
    setResult(null);
    onRetry();
  };

  if (!permission) return <View style={styles.root}><ActivityIndicator color={colors.primary} /></View>;
  if (!permission.granted) {
    return (
      <View style={styles.root}>
        <Text style={styles.permText}>أحتاج إذن الكاميرا لأعمل!</Text>
        <Pressable style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>إعطاء الإذن</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {!showResult && (
        <CameraView style={StyleSheet.absoluteFill} facing="back" ref={cameraRef}>
          <View style={styles.overlay}>
            <View style={styles.viewfinder}>
              <View style={styles.cornerTL} />
              <View style={styles.cornerTR} />
              <View style={styles.cornerBL} />
              <View style={styles.cornerBR} />
              {isScanning && <ScanLine />}
            </View>

            <View style={styles.bottomArea}>
              <Text style={styles.hint}>
                {isScanning ? 'أبحث عن الطبيعة...' : 'وجّه الكاميرا نحو نبتة أو حشرة'}
              </Text>
              
              <Pressable 
                onPress={handleScan} 
                disabled={isScanning}
                style={({ pressed }) => [
                  styles.captureBtn,
                  isScanning && styles.captureBtnDisabled,
                  pressed && { transform: [{ scale: 0.95 }] }
                ]}
              >
                <View style={styles.captureInner}>
                  {isScanning ? (
                    <ActivityIndicator color={colors.primary} />
                  ) : (
                    <Text style={styles.captureIcon}>🔍</Text>
                  )}
                </View>
              </Pressable>
            </View>
          </View>
        </CameraView>
      )}

      {showResult && result && (
        <StoryCard
          visible={showResult}
          result={result}
          onAdd={() => {
            onAddResult(result);
            setShowResult(false);
          }}
          onRetry={handleRetryLocal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.15)', justifyContent: 'space-between', padding: 40 },
  viewfinder: {
    width: W * 0.7,
    height: W * 0.7,
    alignSelf: 'center',
    marginTop: H * 0.15,
    position: 'relative',
  },
  cornerTL: { position: 'absolute', top: -10, left: -10, width: 40, height: 40, borderTopWidth: 6, borderLeftWidth: 6, borderColor: 'transparent', borderTopColor: '#fff', borderLeftColor: '#fff', borderTopLeftRadius: 20 },
  cornerTR: { position: 'absolute', top: -10, right: -10, width: 40, height: 40, borderTopWidth: 6, borderRightWidth: 6, borderColor: 'transparent', borderTopColor: '#fff', borderRightColor: '#fff', borderTopRightRadius: 20 },
  cornerBL: { position: 'absolute', bottom: -10, left: -10, width: 40, height: 40, borderBottomWidth: 6, borderLeftWidth: 6, borderColor: 'transparent', borderBottomColor: '#fff', borderLeftColor: '#fff', borderBottomLeftRadius: 20 },
  cornerBR: { position: 'absolute', bottom: -10, right: -10, width: 40, height: 40, borderBottomWidth: 6, borderRightWidth: 6, borderColor: 'transparent', borderBottomColor: '#fff', borderRightColor: '#fff', borderBottomRightRadius: 20 },
  
  scanLine: {
    position: 'absolute',
    left: 10,
    right: 10,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
    opacity: 0.8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5
  },
  bottomArea: { alignItems: 'center', marginBottom: 40 },
  hint: {
    fontFamily: fonts.display,
    fontSize: 18,
    color: '#fff',
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    overflow: 'hidden'
  },
  captureBtn: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#fff',
    padding: 6,
    borderBottomWidth: 6,
    borderBottomColor: '#ddd'
  },
  captureBtnDisabled: {
    opacity: 0.5
  },
  captureInner: {
    flex: 1,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  captureIcon: { fontSize: 32 },
  
  permText: { fontFamily: fonts.display, color: '#fff', fontSize: 20, textAlign: 'center', marginBottom: 20 },
  permBtn: { backgroundColor: colors.primary, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 20 },
  permBtnText: { color: '#fff', fontWeight: '900', fontSize: 18 }
});
