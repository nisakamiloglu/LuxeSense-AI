import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

const { width } = Dimensions.get('window');

const LandingScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Brand Section */}
      <Animated.View
        style={[
          styles.brandSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Ionicons name="diamond-outline" size={48} color={COLORS.gold} />
        </View>
        <Text style={styles.brandName}>LUXESENSE</Text>
        <Text style={styles.brandAI}>AI</Text>
        <View style={styles.brandDivider} />
        <Text style={styles.brandTagline}>A New Way of Shopping</Text>
      </Animated.View>

      {/* Buttons Section */}
      <Animated.View
        style={[
          styles.buttonSection,
          {
            opacity: buttonAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
        >
          <Text style={styles.loginBtnText}>Sign In</Text>
          <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupBtn}
          onPress={() => navigation.navigate('Register')}
          activeOpacity={0.8}
        >
          <Text style={styles.signupBtnText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.guestBtn} activeOpacity={0.8}>
          <Ionicons name="eye-outline" size={20} color={COLORS.gray} />
          <Text style={styles.guestBtnText}>Browse as Guest</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Footer */}
      <Text style={styles.footerText}>
        Experience personalized luxury
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  brandSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  brandName: {
    fontSize: 36,
    fontWeight: '300',
    color: COLORS.black,
    letterSpacing: 8,
  },
  brandAI: {
    fontSize: 24,
    fontWeight: '500',
    color: COLORS.gold,
    letterSpacing: 6,
    marginTop: 4,
  },
  brandDivider: {
    width: 40,
    height: 1,
    backgroundColor: COLORS.gold,
    marginVertical: 24,
  },
  brandTagline: {
    fontSize: 14,
    color: COLORS.gray,
    letterSpacing: 2,
  },
  buttonSection: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 100,
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    backgroundColor: COLORS.black,
    borderRadius: SIZES.radius,
    gap: 10,
    marginBottom: 16,
  },
  loginBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    letterSpacing: 1,
  },
  signupBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  signupBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    letterSpacing: 1,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.beigeDark,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 13,
    color: COLORS.gray,
  },
  guestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    gap: 8,
  },
  guestBtnText: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },
  footerText: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    fontSize: 13,
    color: COLORS.gray,
    letterSpacing: 1,
  },
});

export default LandingScreen;
