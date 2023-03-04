import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("screens:Home:useEffect: START");
  
    setIsLoading(false);
    console.log("screens:NoteScreen:useEffect: END");
  }, []);

  if (isLoading) {
    return (
      <View >
        <Text>Loading Home Screen...</Text>
      
      </View>
    );
  } else{
    
  }



  return (
    <View  style={styles.container}>
      <Text>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});