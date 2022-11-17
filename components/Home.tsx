import { View, Text, StyleSheet, StatusBar } from 'react-native'

export default function Home(){
  return(
    <View style={styles.view}>
      <Text>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    paddingTop: StatusBar.currentHeight,
  }
})