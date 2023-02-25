import { Linking, Text, View } from 'react-native';
import styles from './styles';
import { author } from '../../constants/contact-info';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import useColorScheme from '../../../src/hooks/useColorScheme';
import { colors } from '../../../src/constants/Colors';


export default function AboutInfo() {
  const colorScheme = useColorScheme();
  return (
    <View>
      <View style={styles.container}>
        <Text
          style={{color: colors[colorScheme].text,fontSize: 24}}
          onPress={() => {
            Linking.openURL(
              'https://api.whatsapp.com/send?phone=' + author.phoneNumber
            );
          }}>
          Talk to me on WhatsApp  
        </Text>
        <FontAwesome5 name="whatsapp-square" size={24} color={colors[colorScheme].tint} style={styles.icon}/>
      </View>
      <View style={styles.container}>
      <Text
        style={{color: colors[colorScheme].text,fontSize: 24}}
        onPress={() => {
          Linking.openURL(
            'mailto:' + author.email + '?subject=Hello Minjae'
          );
        }}>
        Send me an e-mail 
      </Text>
      <MaterialCommunityIcons name="email-plus" size={24} color={colors[colorScheme].tint} style={styles.icon}/>
      </View>
      <View style={styles.container}>
      <Text
        style={{color: colors[colorScheme].text,fontSize: 24}}
        onPress={() => {
          Linking.openURL(
            author.github
          );
        }}>
        Github page 
      </Text>
      <AntDesign name="github" size={24} color={colors[colorScheme].tint} style={styles.icon} />
      </View>
    </View>
  );
}

