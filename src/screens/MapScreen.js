import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform, Animated, Image } from 'react-native';
import { colors, fonts } from '../theme';

let MapView, Marker, PROVIDER_GOOGLE;
try {
  const RNMaps = require('react-native-maps');
  MapView = RNMaps.default;
  Marker = RNMaps.Marker;
  PROVIDER_GOOGLE = RNMaps.PROVIDER_GOOGLE;
} catch (e) {
  MapView = null;
}

const TUNIS = { latitude: 36.8065, longitude: 10.1815, latitudeDelta: 0.05, longitudeDelta: 0.05 };

function FakeMap({ discoveries }) {
  return (
    <View style={styles.fakeMapRoot}>
      <Image 
        source={require('../../assets/map.png')} 
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      
      {/* Subtle Vignette for depth */}
      <View style={styles.vignette} />
      
      <View style={StyleSheet.absoluteFill}>
        {discoveries.map((d, i) => (
          <AnimatedMarker key={d.id} item={d} index={i} />
        ))}
      </View>
    </View>
  );
}

function AnimatedMarker({ item, index }) {
  const scale = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      tension: 40,
      friction: 7,
      delay: index * 200,
      useNativeDriver: true
    }).start();
  }, []);

  const top = 100 + (index * 60) % 300;
  const left = 50 + (index * 80) % 250;

  return (
    <Animated.View style={[styles.markerContainer, { top, left, transform: [{ scale }] }]}>
      <View style={styles.markerCircle}>
        <Text style={styles.markerEmoji}>{item.emoji}</Text>
      </View>
      <View style={styles.markerTip} />
    </Animated.View>
  );
}

function PinCard({ item }) {
  return (
    <View style={styles.pinCard}>
      <Text style={styles.pinEmoji}>{item.emoji}</Text>
      <View style={styles.pinText}>
        <Text style={styles.pinName}>{item.nameAr}</Text>
        <Text style={styles.pinDate}>{item.date}</Text>
      </View>
    </View>
  );
}

function CustomMarker({ item }) {
  return (
    <View style={styles.marker}>
      <View style={styles.markerCircle}>
        <Text style={styles.markerEmoji}>{item.emoji}</Text>
      </View>
      <View style={styles.markerTip} />
    </View>
  );
}

export default function MapScreen({ discoveries }) {
  const showRealMap = false; // Forced false to use the custom map image

  return (
    <View style={styles.root}>
      {showRealMap ? (
        <MapView
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          initialRegion={TUNIS}
        >
          {discoveries.map(d => (
            <Marker key={d.id} coordinate={d.coords} anchor={{ x: 0.5, y: 1 }}>
              <CustomMarker item={d} />
            </Marker>
          ))}
        </MapView>
      ) : (
        <FakeMap discoveries={discoveries} />
      )}

      <View style={styles.bottomSheet}>
        <View style={styles.handle} />
        <Text style={styles.sheetTitle}>آخر اكتشافاتي</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          flexDirection="row-reverse"
        >
          {discoveries.map(d => (
            <PinCard key={d.id} item={d} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F9F5' },
  fakeMapRoot: { flex: 1, backgroundColor: '#EDEEE8', overflow: 'hidden' },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderWidth: 60,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  markerContainer: { position: 'absolute', alignItems: 'center' },
  markerCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.primary,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  markerEmoji: { fontSize: 26 },
  markerTip: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.primary,
    marginTop: -2
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 90,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 20,
    borderBottomWidth: 6,
    borderBottomColor: colors.surfaceContainerHighest,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 15
  },
  handle: {
    width: 40,
    height: 6,
    backgroundColor: '#E0E4DC',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 16
  },
  sheetTitle: {
    fontFamily: fonts.display,
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
    textAlign: 'right',
    marginBottom: 16
  },
  scroll: { gap: 12 },
  pinCard: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    padding: 12,
    borderRadius: 20,
    gap: 12,
    minWidth: 180
  },
  pinEmoji: { fontSize: 32 },
  pinText: { alignItems: 'flex-end' },
  pinName: {
    fontFamily: fonts.display,
    fontSize: 14,
    fontWeight: '800',
    color: colors.onSurface
  },
  pinDate: {
    fontFamily: fonts.display,
    fontSize: 10,
    color: colors.onSurfaceVariant
  }
});
