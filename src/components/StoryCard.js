import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, radii, shadows, rarity as rarityMap } from '../theme';

function Chevron({ open }) {
  const rot = useRef(new Animated.Value(open ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(rot, { toValue: open ? 1 : 0, duration: 240, useNativeDriver: true }).start();
  }, [open]);
  const r = rot.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  return (
    <Animated.Text style={[styles.chev, { transform: [{ rotate: r }] }]}>⌄</Animated.Text>
  );
}

function Accordion({ title, content, accent }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={[styles.accordion, { borderColor: accent || colors.hairline }]}>
      <Pressable onPress={() => setOpen(o => !o)} style={styles.accordionHead}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <Chevron open={open} />
      </Pressable>
      {open && (
        <View style={styles.accordionBody}>
          <Text style={styles.accordionText}>{content}</Text>
        </View>
      )}
    </View>
  );
}

export default function StoryCard({ visible, result, onAdd, onRetry }) {
  const translate = useRef(new Animated.Value(800)).current;
  const backdrop  = useRef(new Animated.Value(0)).current;
  const emojiFloat = useRef(new Animated.Value(0)).current;
  const rarityPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(backdrop, { toValue: 1, duration: 320, useNativeDriver: true }),
        Animated.spring(translate, { toValue: 0, useNativeDriver: true, damping: 18, mass: 1.1, stiffness: 140 })
      ]).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(emojiFloat, { toValue: -6, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(emojiFloat, { toValue:  0, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
        ])
      ).start();

      if (result?.rarity === 'legendary') {
        Animated.loop(
          Animated.sequence([
            Animated.timing(rarityPulse, { toValue: 1, duration: 900, useNativeDriver: true }),
            Animated.timing(rarityPulse, { toValue: 0, duration: 900, useNativeDriver: true })
          ])
        ).start();
      }
    } else {
      Animated.parallel([
        Animated.timing(backdrop,  { toValue: 0, duration: 220, useNativeDriver: true }),
        Animated.timing(translate, { toValue: 800, duration: 260, easing: Easing.in(Easing.cubic), useNativeDriver: true })
      ]).start();
    }
  }, [visible]);

  if (!result) return null;

  const r = rarityMap[result.rarity];
  const pulseScale = rarityPulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });

  return (
    <Animated.View pointerEvents={visible ? 'auto' : 'none'} style={[StyleSheet.absoluteFill, styles.backdrop, { opacity: backdrop }]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onRetry} />

      <Animated.View style={[styles.card, { transform: [{ translateY: translate }] }]}>
        {/* Grab handle */}
        <View style={styles.handle} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cardInner}
          bounces
        >
          {/* Emoji in dashed ring */}
          <View style={styles.emojiBlock}>
            <View style={styles.dashedRing}>
              <LinearGradient
                colors={[`${colors.accent}38`, `${colors.accent}00`]}
                style={styles.emojiHalo}
              />
              <Animated.Text style={[styles.emoji, { transform: [{ translateY: emojiFloat }] }]}>
                {result.emoji}
              </Animated.Text>
            </View>

            <Animated.View style={[styles.rarityPill, { backgroundColor: r.color + '22', borderColor: r.color, transform: [{ scale: pulseScale }] }]}>
              <View style={[styles.rarityDot, { backgroundColor: r.color }]} />
              <Text style={[styles.rarityText, { color: r.color }]}>{r.label}</Text>
              <Text style={styles.rarityEmoji}>{r.emoji}</Text>
            </Animated.View>
          </View>

          <Text style={styles.name}>{result.nameAr}</Text>
          <Text style={styles.latin}>{result.nameLatin}</Text>

          <LinearGradient
            colors={['transparent', colors.accent, 'transparent']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.divider}
          />

          {/* Baba Tarek intro */}
          <View style={styles.babaWrap}>
            <View style={styles.babaAvatar}>
              <Text style={{ fontSize: 20 }}>🧙</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.babaLabel}>بابا طارق يقول</Text>
              <Text style={styles.babaLine}>———</Text>
            </View>
          </View>

          <Text style={styles.story}>{result.story}</Text>

          <Accordion title="🛡️  نصيحة البقاء" content={result.survival} accent={colors.sage} />
          <Accordion title="🏛️  من تراثنا"    content={result.heritage} accent={colors.accent} />

          {/* XP reward */}
          <View style={styles.xpWrap}>
            <LinearGradient
              colors={[colors.accentDark, colors.accent, colors.accentLight]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={styles.xpPill}
            >
              <Text style={styles.xpCoin}>✦</Text>
              <Text style={styles.xpText}>+{result.xp} نقطة خبرة</Text>
            </LinearGradient>
          </View>

          {/* Buttons */}
          <Pressable onPress={onAdd} style={({ pressed }) => [styles.btnPrimary, pressed && styles.pressed]}>
            <LinearGradient
              colors={[colors.sageBright, colors.sage, colors.sage + 'cc']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={styles.btnPrimaryInner}
            >
              <Text style={styles.btnPrimaryText}>أضف للمدونة  ✓</Text>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={onRetry} style={styles.btnGhost}>
            <Text style={styles.btnGhostText}>↻  امسح مرة أخرى</Text>
          </Pressable>

          <View style={{ height: 24 }} />
        </ScrollView>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: { backgroundColor: 'rgba(10, 26, 18, 0.72)', justifyContent: 'flex-end', zIndex: 50 },
  card: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: '90%',
    minHeight: '72%',
    borderTopWidth: 8,
    borderColor: colors.surfaceContainerHighest,
    ...shadows.bubbly
  },
  handle: {
    alignSelf: 'center',
    width: 48, height: 5,
    borderRadius: 3,
    backgroundColor: colors.accentDeep,
    marginTop: 10, marginBottom: 4,
    opacity: 0.55
  },
  cardInner: { paddingHorizontal: 22, paddingTop: 10, paddingBottom: 20 },

  emojiBlock: { alignItems: 'center', marginTop: 6, gap: 12 },
  dashedRing: {
    width: 120, height: 120, borderRadius: 60,
    borderWidth: 2, borderStyle: 'dashed', borderColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.bgDeep
  },
  emojiHalo: { ...StyleSheet.absoluteFillObject, borderRadius: 60 },
  emoji: { fontSize: 70, includeFontPadding: false },

  rarityPill: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: radii.pill,
    borderWidth: 1.5
  },
  rarityDot: { width: 8, height: 8, borderRadius: 4 },
  rarityText: { fontFamily: fonts.bodyArBold, fontSize: 13, writingDirection: 'rtl' },
  rarityEmoji: { fontSize: 12 },

  name: {
    fontFamily: fonts.display,
    fontSize: 34,
    color: colors.onSurface,
    textAlign: 'center',
    fontWeight: '900',
    marginTop: 14,
    writingDirection: 'rtl',
    letterSpacing: -1
  },
  latin: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 2
  },
  divider: { height: 1.5, marginVertical: 18, width: '60%', alignSelf: 'center', opacity: 0.6 },

  babaWrap: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8
  },
  babaAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.bgRaised,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.accent
  },
  babaLabel: {
    fontFamily: fonts.bodyArBold,
    fontSize: 11,
    color: colors.accent,
    letterSpacing: 2,
    writingDirection: 'rtl',
    textAlign: 'right',
    textTransform: 'uppercase'
  },
  babaLine: { color: colors.accentDeep, fontSize: 10, marginTop: -2 },

  story: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 28,
    color: colors.onSurface,
    writingDirection: 'rtl',
    textAlign: 'right',
    marginBottom: 20
  },

  accordion: {
    borderWidth: 1,
    borderRadius: radii.md,
    backgroundColor: colors.bgRaised,
    marginBottom: 10,
    overflow: 'hidden'
  },
  accordionHead: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  accordionTitle: {
    fontFamily: fonts.bodyArBold,
    fontSize: 14,
    color: colors.cream,
    writingDirection: 'rtl'
  },
  chev: { color: colors.accent, fontSize: 18, fontWeight: '900' },
  accordionBody: {
    paddingHorizontal: 14, paddingBottom: 14, paddingTop: 2,
    borderTopWidth: 1, borderTopColor: colors.hairline
  },
  accordionText: {
    fontFamily: fonts.bodyAr, fontSize: 13, lineHeight: 22,
    color: colors.creamSoft, writingDirection: 'rtl', textAlign: 'right'
  },

  xpWrap: { alignItems: 'center', marginTop: 18, marginBottom: 14 },
  xpPill: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18, paddingVertical: 9,
    borderRadius: radii.pill,
    borderWidth: 2, borderColor: colors.accentGlow,
    ...shadows.gold
  },
  xpCoin: { fontSize: 18, color: colors.bgDeep, fontWeight: '900' },
  xpText: {
    fontFamily: fonts.bodyArBold,
    fontSize: 15,
    color: colors.bgDeep,
    writingDirection: 'rtl'
  },

  btnPrimary: { 
    borderRadius: radii.lg, 
    overflow: 'hidden', 
    ...shadows.bubblyButton, 
    marginBottom: 16 
  },
  btnPrimaryInner: {
    paddingVertical: 18,
    alignItems: 'center', justifyContent: 'center',
    borderRadius: radii.lg,
    backgroundColor: colors.primary,
  },
  btnPrimaryText: {
    fontFamily: fonts.display,
    fontSize: 18,
    fontWeight: '900',
    color: colors.onPrimary,
    writingDirection: 'rtl'
  },
  pressed: { transform: [{ translateY: 2 }], opacity: 0.9 },

  btnGhost: {
    paddingVertical: 13,
    alignItems: 'center',
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: 'transparent'
  },
  btnGhostText: {
    fontFamily: fonts.bodyAr,
    fontSize: 14,
    color: colors.muted,
    writingDirection: 'rtl'
  }
});
