import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';


const MAP_ALERT = require('../../../../assets/images/map-alert.png');

export default function BaoDongScreen() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= 10) return 0; // reset về 00
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const format = (num) => {
    return num < 10 ? `0${num}` : num;
  };

useEffect(() => {
  const interval = setInterval(() => {
    setSeconds((prev) => {
      if (prev >= 10) return 0; // reset
      return prev + 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);
  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
  <Ionicons name="warning-outline" size={26} color="#FF3B30" />
  
  <Text style={styles.headerText}>
    CẢNH BÁO TAI NẠN KHẨN CẤP
  </Text>
</View>

      {/* IMAGE */}
      <Image source={MAP_ALERT} style={styles.mapImage} />

      {/* INFO */}
      <View style={styles.infoBlock}>

        <View style={styles.rowCenter}>
          <Text style={styles.planeIcon}>✈️</Text>
          <Text style={styles.title}>Tai nạn máy bay</Text>
        </View>

        <Text style={styles.desc}>
          Cách 2.5 km - 5 phút di chuyển
        </Text>
        <Text style={styles.desc}>
          Ước tính 300 nạn nhân
        </Text>
        <Text style={styles.desc}>
          Địa chỉ: 470 Trần Đại Nghĩa, Q. Ngũ Hành Sơn, Đà Nẵng
        </Text>
      </View>

      {/* TIMER TITLE */}
      <Text style={styles.timerTitle}>Thời gian phản hồi</Text>

      {/* TIMER */}
      <View style={styles.timerContainer}>
  <View style={styles.timerBox}>
    <Text style={styles.timerText}>00</Text>
  </View>

  <View style={styles.timerBox}>
    <Text style={styles.timerText}>00</Text>
  </View>

  <View style={styles.timerBox}>
    <Text style={styles.timerText}>{format(seconds)}</Text>
  </View>
</View>

      {/* LABEL */}
      <View style={styles.labelRow}>
  <View style={styles.labelItem}>
    <Text>Giờ</Text>
  </View>

  <View style={styles.labelItem}>
    <Text>Phút</Text>
  </View>

  <View style={styles.labelItem}>
    <Text>Giây</Text>
  </View>
</View>

     <View style={styles.actionRow}>

  {/* CHỈ ĐƯỜNG */}
  <View style={styles.btnRoute}>
    <Ionicons name="checkmark-circle" size={20} color="#fff" />
    <Text style={styles.btnText}>Chỉ đường</Text>
  </View>

  {/* CALL */}
  <View style={styles.btnCall}>
    <Ionicons name="call" size={20} color="#fff" />
  </View>

</View>

      {/* BUTTON HỦY */}
     <View style={styles.buttonCancel}>
  <View style={styles.buttonContent}>
    
    <View style={styles.iconCircle}>
      <Text style={styles.iconText}>✕</Text>
    </View>

    <Text style={styles.buttonText}>Huỷ</Text>

  </View>
</View>
    </SafeAreaView>
  );

}const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  header: {
    position: 'absolute',
    top: 72,
    left: 66,
    width: 260,
    flexDirection: 'row',
    alignItems: 'center',
  },

  warningIcon: {
    fontSize: 22,
    color: '#E04140', // 🔴 đỏ chuẩn
  },

  headerText: {
    marginLeft: 5,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },buttonContent: {
  flexDirection: 'row',
  alignItems: 'center',
},

iconCircle: {
  width: 26,
  height: 26,
  borderRadius: 13,
  borderWidth: 2,
  borderColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 10,
},
actionRow: {
  position: 'absolute',
  top: 710,
  left: 40,
  right: 40, // 👈 QUAN TRỌNG (full width)
  flexDirection: 'row',
  alignItems: 'center',
},
btnRoute: {
  flex: 1, // 👈 tự co theo layout
  height: 55,
  backgroundColor: '#16A34A',
  borderRadius: 12,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 10,
},

btnCall: {
  width: 55,
  height: 55,
  backgroundColor: '#F97316',
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
},

btnText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '700',
  marginLeft: 8,
},
iconText: {
  color: '#fff',
  fontSize: 14,
  fontWeight: 'bold',
},

  mapImage: {
    position: 'absolute',
    top: 164,
    left: 26,
    width: 340,
    height: 161,
    borderRadius: 10,
  },

  infoBlock: {
    position: 'absolute',
    top: 357,
    left: 25,
    width: 367,
  },

  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  planeIcon: {
    fontSize: 20,
    marginRight: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
  },

  desc: {
    fontSize: 15,
    marginTop: 6,
    textAlign: 'center',
  },

  timerTitle: {
    position: 'absolute',
    top: 512,
    left: 104,
    fontSize: 18,
    fontWeight: 'bold',
  },

  timerContainer: {
    position: 'absolute',
    top: 576,
    left: 47,
    flexDirection: 'row',
  },

  timerBox: {
    width: 86,
    height: 51,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    elevation: 4,
  },

  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E04140',
  },

  labelRow: {
  position: 'absolute',
  top: 640,
  left: 47,
  flexDirection: 'row',
},labelItem: {
  width: 86,
  alignItems: 'center',
  marginRight: 20,
},

  buttonPrimary: {
    position: 'absolute',
    top: 709,
    left: 54,
    width: 287,
    height: 60,
    backgroundColor: '#16A34A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

 buttonCancel: {
  position: 'absolute',
  top: 780,
  left: 40,
  right: 40, // 👈 QUAN TRỌNG
  height: 55,
  backgroundColor: '#374151',
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
},

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});