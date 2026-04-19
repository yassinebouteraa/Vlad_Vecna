import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, radii, shadows } from '../theme';

export default function TopBar({ scoutName, totalXP, xpToNextLevel, coinAnim }) {
  const pct = Math.min(1, totalXP / xpToNextLevel);
  const fill = useRef(new Animated.Value(pct)).current;
  const xpScale = useRef(new Animated.Value(1)).current;
  const avatarBob = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fill, {
      toValue: pct,
      duration: 1100,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false
    }).start();
    Animated.sequence([
      Animated.spring(xpScale, { toValue: 1.22, useNativeDriver: true, friction: 4 }),
      Animated.spring(xpScale, { toValue: 1,    useNativeDriver: true, friction: 5 })
    ]).start();
  }, [totalXP]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(avatarBob, { toValue: -2, duration: 1400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(avatarBob, { toValue:  0, duration: 1400, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
      ])
    ).start();
  }, []);

  const widthInterp = fill.interpolate({ inputRange: [0, 1], outputRange: ['2%', '100%'] });

  return (
    <View style={styles.wrap}>
      {/* Scout side */}
      <View style={styles.scout}>
        <Animated.View style={[styles.avatarWrap, { transform: [{ translateY: avatarBob }, { rotate: '-3deg' }] }]}>
          <View style={styles.avatarInner}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>أ</Text>
            </View>
          </View>
        </Animated.View>

        <View style={styles.textWrap}>
          <Text style={styles.greet}>كشاف</Text>
          <Text style={styles.name}>{scoutName}</Text>
        </View>
      </View>

      {/* Level side */}
      <View style={styles.levelBadge}>
        <Text style={styles.levelText}>LVL 12 • {totalXP}</Text>
      </View>

      {/* Animated XP coin (only during earn) */}
      {coinAnim && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.coin,
            {
              transform: [
                { translateY: coinAnim.y },
                { translateX: coinAnim.x },
                { rotate: coinAnim.rotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '720deg'] }) },
                { scale: coinAnim.scale }
              ],
              opacity: coinAnim.opacity
            }
          ]}
        >
          <LinearGradient colors={[colors.primaryFixed, colors.primary]} style={styles.coinInner}>
            <Text style={styles.coinText}>XP</Text>
          </LinearGradient>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 100,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 4,
    borderBottomColor: colors.surfaceContainerHighest,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 50
  },
  scout: { flexDirection: 'row-reverse', alignItems: 'center', gap: 12 },
  avatarWrap: { 
    width: 48, 
    height: 48, 
    borderRadius: 16,
    backgroundColor: colors.primaryContainer,
    borderWidth: 4,
    borderColor: colors.primary,
    ...shadows.bubbly
  },
  avatarInner: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { 
    fontFamily: fonts.displayAr, 
    color: colors.primary, 
    fontSize: 24, 
    writingDirection: 'rtl' 
  },
  textWrap: {
    alignItems: 'flex-end'
  },
  greet: { 
    fontFamily: fonts.display, 
    fontSize: 10, 
    color: colors.primary, 
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    writingDirection: 'rtl', 
    textAlign: 'right' 
  },
  name: { 
    fontFamily: fonts.display, 
    fontSize: 20, 
    color: colors.onSurface, 
    fontWeight: '900',
    letterSpacing: -0.5,
    writingDirection: 'rtl', 
    textAlign: 'right' 
  },

  levelBadge: {
    backgroundColor: colors.tertiaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: radii.pill,
    borderBottomWidth: 4,
    borderBottomColor: colors.tertiaryFixedDim,
    transform: [{ rotate: '2deg' }]
  },
  levelText: {
    fontFamily: fonts.display,
    fontSize: 14,
    fontWeight: '900',
    color: colors.onTertiaryContainer
  },

  coin: {
    position: 'absolute', 
    top: 60, 
    right: 160,
    width: 34, 
    height: 34
  },
  coinInner: {
    width: 34, 
    height: 34, 
    borderRadius: 17,
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 2, 
    borderColor: colors.primaryFixed,
    ...shadows.lift
  },
  coinText: { 
    fontFamily: fonts.display, 
    fontSize: 11, 
    color: colors.onPrimaryContainer, 
    fontWeight: '900' 
  }
});

