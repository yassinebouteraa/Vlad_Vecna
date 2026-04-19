import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { colors, fonts } from '../theme';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.root}
    >
      <View style={styles.container}>
        {/* Logo/Icon */}
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>🎒</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>مرحباً بك أيها الكشاف!</Text>
          <Text style={styles.subtitle}>سجل دخولك لتبدأ مغامرتك في طبيعة تونس</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>البريد الإلكتروني</Text>
            <TextInput 
              style={styles.input}
              placeholder="name@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>كلمة السر</Text>
            <TextInput 
              style={styles.input}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Pressable 
            style={({ pressed }) => [
              styles.loginBtn,
              pressed && { transform: [{ scale: 0.98 }] }
            ]}
            onPress={() => onLogin(email)}
          >
            <Text style={styles.loginBtnText}>بدء المغامرة 🚀</Text>
          </Pressable>

          <Pressable style={styles.forgotBtn}>
            <Text style={styles.forgotText}>نسيت كلمة السر؟</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>ليس لديك حساب؟</Text>
          <Pressable>
            <Text style={styles.signupText}>انضم إلينا الآن</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F9F5' },
  container: { flex: 1, padding: 30, justifyContent: 'center' },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    borderBottomWidth: 6,
    borderBottomColor: colors.primary,
  },
  logoEmoji: { fontSize: 50 },
  header: { alignItems: 'center', marginBottom: 40 },
  title: {
    fontFamily: fonts.display,
    fontSize: 26,
    fontWeight: '900',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 10
  },
  subtitle: {
    fontFamily: fonts.display,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22
  },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: {
    fontFamily: fonts.display,
    fontSize: 14,
    fontWeight: '800',
    color: colors.onSurface,
    textAlign: 'right',
    marginRight: 4
  },
  input: {
    backgroundColor: '#fff',
    height: 60,
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 16,
    borderBottomWidth: 4,
    borderBottomColor: colors.surfaceContainerHighest,
    textAlign: 'right'
  },
  loginBtn: {
    backgroundColor: colors.primary,
    height: 64,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderBottomWidth: 6,
    borderBottomColor: colors.primaryDim,
  },
  loginBtnText: {
    color: '#fff',
    fontFamily: fonts.display,
    fontSize: 18,
    fontWeight: '900'
  },
  forgotBtn: { alignSelf: 'center', marginTop: 10 },
  forgotText: {
    fontFamily: fonts.display,
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700'
  },
  footer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    gap: 8
  },
  footerText: {
    fontFamily: fonts.display,
    fontSize: 14,
    color: colors.onSurfaceVariant
  },
  signupText: {
    fontFamily: fonts.display,
    fontSize: 14,
    color: colors.primary,
    fontWeight: '900'
  }
});
