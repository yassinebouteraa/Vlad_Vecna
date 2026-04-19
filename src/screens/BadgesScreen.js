import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Pressable } from 'react-native';
import { colors, fonts } from '../theme';

function BadgeTile({ badge, index }) {
  const pop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(pop, {
      toValue: 1,
      tension: 40,
      friction: 7,
      delay: index * 40,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.tileWrap,
        {
          opacity: pop,
          transform: [{ scale: pop }]
        }
      ]}
    >
      <View style={[
        styles.tile,
        badge.earned ? styles.tileEarned : styles.tileLocked
      ]}>
        <Text style={[styles.emoji, !badge.earned && styles.emojiLocked]}>
          {badge.emoji}
        </Text>
        {!badge.earned && (
          <View style={styles.lockCircle}>
            <Text style={styles.lockIcon}>🔒</Text>
          </View>
        )}
      </View>
      <Text style={styles.badgeName} numberOfLines={1}>{badge.nameAr}</Text>
    </Animated.View>
  );
}

export default function BadgesScreen({ badges }) {
  const earnedCount = badges.filter(b => b.earned).length;

  return (
    <ScrollView 
      style={styles.root} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>أوسمتي الرائعة</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{earnedCount}</Text>
            <Text style={styles.statLabel}>تم الحصول عليها</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{badges.length - earnedCount}</Text>
            <Text style={styles.statLabel}>متبقية</Text>
          </View>
        </View>
      </View>

      <View style={styles.grid}>
        {badges.map((b, i) => (
          <BadgeTile key={b.id} badge={b} index={i} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F9F5' },
  content: { padding: 20, paddingBottom: 120 },
  header: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 32,
    marginBottom: 24,
    borderBottomWidth: 6,
    borderBottomColor: colors.surfaceContainerHighest,
    alignItems: 'center'
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 28,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center'
  },
  statsRow: {
    flexDirection: 'row-reverse',
    gap: 20
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20
  },
  statNum: {
    fontFamily: fonts.display,
    fontSize: 24,
    fontWeight: '900',
    color: colors.onSurface
  },
  statLabel: {
    fontFamily: fonts.display,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: '700'
  },
  grid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  tileWrap: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20
  },
  tile: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 4,
    borderBottomColor: colors.surfaceContainerHighest,
  },
  tileEarned: {
    backgroundColor: colors.primaryContainer,
    borderBottomColor: colors.primary,
  },
  tileLocked: {
    opacity: 0.6
  },
  emoji: {
    fontSize: 32
  },
  emojiLocked: {
    opacity: 0.2
  },
  lockCircle: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.outlineVariant
  },
  lockIcon: {
    fontSize: 12
  },
  badgeName: {
    fontFamily: fonts.display,
    fontSize: 12,
    fontWeight: '800',
    color: colors.onSurface,
    marginTop: 8,
    textAlign: 'center'
  }
});
