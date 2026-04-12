import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import SlideToRespond from '../../../components/SlideToRespond';

const { width } = Dimensions.get('window');

const GO_PINK = require('../../../../assets/icons/go-pink.png');
const GO_YELLOW = require('../../../../assets/icons/go-yellow.png');
const GO_BLUE = require('../../../../assets/icons/go-blue.png');
const GO_GREEN = require('../../../../assets/icons/go-green.png');


export default function BaoDongNhiemVuScreen() {
  const router = useRouter();
  const radarSize = Math.min(width * 0.54, 220);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#FFF5CE', '#FFD66A', '#FFAF41']}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={styles.background}
      >
        <View style={styles.glowLarge} />
        <View style={styles.glowSmall} />

    

        <View style={styles.content}>
          <Text style={styles.alertTitle}>BAO DONG KHAN CAP!</Text>
          <Text style={styles.alertDescription}>
            Tat ca linh cuu ho lap tuc tap hop tai diem chi dinh, kiem tra day du
            trang thiet bi va san sang nhan lenh trien khai ngay lap tuc.
          </Text>

          <View style={styles.radarWrap}>
            <View style={[styles.ring, styles.ringOuter]} />
            <View style={[styles.ring, styles.ringMid]} />
            <View style={[styles.ring, styles.ringInner]} />
            <View style={[styles.ring, styles.ringCore]} />

            {TEAMS.map((team) => (
              <View key={team.name} style={[styles.teamBadge, team.style]}>
                <Image source={team.icon} style={styles.teamAvatar} />
                <Text style={styles.teamName}>{team.name}</Text>
              </View>
            ))}

            <View
  style={[
    styles.heroCard,
    { width: radarSize, height: radarSize, borderRadius: radarSize / 2 },
  ]}
>
  <LinearGradient
    colors={['#FF8A65', '#FF5252']}
    start={{ x: 0.2, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.heroGradient}
  >
    <View style={styles.innerCircle}>
      <Text style={styles.heroText}>Nhiệm vụ mới</Text>
    </View>
  </LinearGradient>
</View>
          </View>
        </View>

        <View style={styles.bottomArea}>
        <SlideToRespond onSlideComplete={() => router.push('/ThongBaoAlert')} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFD66A',
  },
  background: {
    flex: 1,
    position: 'relative',
  },
  glowLarge: {
    position: 'absolute',
    top: 100,
    right: -90,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255, 243, 197, 0.45)',
  },
  glowSmall: {
    position: 'absolute',
    top: 170,
    left: -100,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
  innerCircle: {
  width: '75%',
  height: '75%',
  borderRadius: 999,
  backgroundColor: 'rgba(255,255,255,0.2)',
  alignItems: 'center',
  justifyContent: 'center',
},
ring: {
  position: 'absolute',
  borderRadius: 999,
  borderStyle: 'dashed',
  borderColor: 'rgba(255,255,255,0.6)',
},

heroText: {
  fontSize: 20,
  fontWeight: '800',
  color: '#fff',
},alertTitle: {
  fontSize: 26,
  fontWeight: '900',
  color: '#2F3A4A',
  textAlign: 'center',
  letterSpacing: 1,
},alertDescription: {
  marginTop: 16,
  maxWidth: 320,
  fontSize: 15,
  lineHeight: 24,
  textAlign: 'center',
  color: '#2F3A4A',
  opacity: 0.85,
},headerTitle: {
  fontSize: 20,
  fontWeight: '700',
  color: '#2F3A4A',
},
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerButtonPlaceholder: {
    width: 36,
  },
  headerButtonIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#313A51',
    marginTop: -1,
  },
  content: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-between', // 👈 quan trọng
  paddingHorizontal: 24,
  paddingTop: 40,
  paddingBottom: 20,
},

  radarWrap: {
    flex: 1,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    borderStyle: 'dashed',
  },
  ringOuter: {
    width: 330,
    height: 330,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.42)',
  },
  ringMid: {
    width: 286,
    height: 286,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.56)',
  },
  ringInner: {
    width: 242,
    height: 242,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.74)',
  },
  ringCore: {
    width: 200,
    height: 200,
    borderWidth: 1.2,
    borderColor: '#FFFFFF',
  },
  heroCard: {
    overflow: 'hidden',
    shadowColor: '#A17713',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.22,
    shadowRadius: 22,
    elevation: 12,
  },
  heroGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  heroImageShell: {
    width: '78%',
    aspectRatio: 1,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  heroImage: {
    width: '78%',
    height: '78%',
  },
  heroText: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  teamBadge: {
    position: 'absolute',
    alignItems: 'center',
  },
  teamAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  teamName: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '700',
    color: '#313A51',
  },
  goBlue: {
    left: 8,
    top: 110,
  },
  goYellow: {
    right: 6,
    top: 108,
  },
  goPink: {
    right: 28,
    bottom: 88,
  },
  goGreen: {
    left: 22,
    bottom: 70,
  },
  bottomArea: {
    paddingHorizontal: 24,
    paddingBottom: 18,
  },
  swipeTrack: {
    height: 74,
    borderRadius: 37,
    borderWidth: 1,
    borderColor: 'rgba(49,58,81,0.4)',
    backgroundColor: 'rgba(255,255,255,0.28)',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  swipeThumb: {
    position: 'absolute',
    left: 7,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#7A5B15',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  swipeArrow: {
    fontSize: 20,
    fontWeight: '900',
    color: '#313A51',
    letterSpacing: 1,
  },
  swipeText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.7)',
  },
})
const TEAMS = [
  { name: 'GoBlue', icon: GO_BLUE, style: styles.goBlue },
  { name: 'GoYellow', icon: GO_YELLOW, style: styles.goYellow },
  { name: 'GoPink', icon: GO_PINK, style: styles.goPink },
  { name: 'GoGreen', icon: GO_GREEN, style: styles.goGreen },
];
;
