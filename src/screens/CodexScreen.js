import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { colors, fonts } from '../theme';

function DiscoveryCard({ item, index }) {
  const pop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(pop, {
      toValue: 1,
      tension: 50,
      friction: 8,
      delay: index * 50,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: pop,
          transform: [{ scale: pop }]
        }
      ]}
    >
      <Text style={styles.cardEmoji}>{item.emoji}</Text>
      <Text style={styles.cardName}>{item.nameAr}</Text>
      <View style={styles.cardXP}>
        <Text style={styles.xpText}>+{item.xp} XP</Text>
      </View>
    </Animated.View>
  );
}

export default function CodexScreen({ discoveries }) {
  if (!discoveries || discoveries.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>🧭</Text>
        <Text style={styles.emptyTitle}>مدونتك فارغة</Text>
        <Text style={styles.emptySub}>اخرج واكتشف الطبيعة!</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.root} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>مجموعتي الخاصة</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeNum}>{discoveries.length}</Text>
          <Text style={styles.badgeLabel}>اكتشاف</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {discoveries.map((d, i) => (
          <DiscoveryCard key={d.id} item={d} index={i} />
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
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 6,
    borderBottomColor: colors.surfaceContainerHighest
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 24,
    fontWeight: '900',
    color: colors.primary,
    textAlign: 'right'
  },
  badge: {
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center'
  },
  badgeNum: {
    fontFamily: fonts.display,
    fontSize: 20,
    fontWeight: '900',
    color: colors.onPrimaryContainer
  },
  badgeLabel: {
    fontFamily: fonts.display,
    fontSize: 10,
    color: colors.onPrimaryContainer,
    fontWeight: '700'
  },
  grid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 6,
    borderBottomColor: colors.surfaceContainerHighest
  },
  cardEmoji: { fontSize: 48, marginBottom: 8 },
  cardName: {
    fontFamily: fonts.display,
    fontSize: 16,
    fontWeight: '900',
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: 8
  },
  cardXP: {
    backgroundColor: colors.tertiaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  xpText: {
    fontFamily: fonts.display,
    fontSize: 10,
    fontWeight: '900',
    color: colors.onTertiaryContainer
  },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyEmoji: { fontSize: 80, marginBottom: 20 },
  emptyTitle: { fontFamily: fonts.display, fontSize: 24, fontWeight: '900', color: colors.onSurface, marginBottom: 10 },
  emptySub: { fontFamily: fonts.display, fontSize: 16, color: colors.onSurfaceVariant }
});
