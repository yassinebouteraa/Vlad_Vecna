import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, shadows, radii } from '../theme';

const TABS = [
  { id: 'scan',    emoji: '🔍', label: 'اكتشف'   },
  { id: 'codex',   emoji: '📖', label: 'مدونتي'  },
  { id: 'map',     emoji: '🗺️', label: 'المسار'  },
  { id: 'badges',  emoji: '🏆', label: 'شاراتي'  }
];

function Tab({ tab, active, onPress }) {
  const scale = useRef(new Animated.Value(active ? 1.05 : 1)).current;

  useEffect(() => {
    Animated.spring(scale, { toValue: active ? 1.05 : 1, useNativeDriver: true, friction: 5 }).start();
  }, [active]);

  return (
    <Pressable onPress={() => onPress(tab.id)} style={styles.tab} hitSlop={6}>
      <Animated.View style={[
        styles.iconWrap, 
        active && styles.iconWrapActive,
        { transform: [{ scale }] }
      ]}>
        <Text style={styles.iconEmoji}>{tab.emoji}</Text>
        <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
      </Animated.View>
    </Pressable>
  );
}

export default function BottomNav({ current, onChange }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.bar}>
        {TABS.map(tab => (
          <Tab key={tab.id} tab={tab} active={current === tab.id} onPress={onChange} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { 
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0, 
    zIndex: 50,
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 10
  },
  bar: {
    height: 80,
    backgroundColor: '#ffffff',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 40,
    borderBottomWidth: 8,
    borderBottomColor: colors.surfaceContainerHighest,
    ...shadows.bubbly
  },
  tab: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1 
  },
  iconWrap: { 
    alignItems: 'center', 
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: 24,
    gap: 2
  },
  iconWrapActive: {
    backgroundColor: colors.primaryContainer,
    borderBottomWidth: 4,
    borderBottomColor: colors.primary,
  },
  iconEmoji: { fontSize: 20 },
  label: {
    fontFamily: fonts.display,
    fontSize: 10,
    fontWeight: '900',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    marginTop: 1,
    writingDirection: 'rtl'
  },
  labelActive: { 
    color: colors.onPrimaryContainer,
  }
});

