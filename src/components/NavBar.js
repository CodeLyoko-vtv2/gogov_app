import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: 'home', route: '/home', icon: 'home' },
    { name: 'chart', route: '/analytics', icon: 'pie-chart' },
    { name: 'notify', route: '/notifications', icon: 'notifications' },
    { name: 'profile', route: '/profile', icon: 'person' },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {tabs.map((tab, index) => {
          const active = pathname === tab.route;

          return (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => router.push(tab.route)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={tab.icon}
                size={24}
                color={active ? '#FFFFFF' : '#929292'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },

  container: {
    width: '90%',
    height: 70,
    backgroundColor: '#121212',
    borderRadius: 12,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    // shadow giống figma
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});