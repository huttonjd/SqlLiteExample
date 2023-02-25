import { StatusBar } from 'expo-status-bar';
import { Image, Platform, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import AboutInfo from '../components/AboutInfo';
import { author } from '../constants/contact-info';
import { colors } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
const authorPortrait = '../../assets/images/author_portrait.jpeg'

export default function AboutMeScreen() {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <Image source={require(authorPortrait)} style={{
        height: '25%',
        width: '25%',
        borderRadius: 2,
        borderWidth: 2,
        borderColor: colors[colorScheme].tint
      }} />
      <Text style={styles.title}>{author.name}</Text>
      <Text style={styles.description}>Automation & Control Engineering Student</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <AboutInfo />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: "2%",
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    marginTop: "2%",
    fontSize: 16,
    fontWeight: 'normal',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
