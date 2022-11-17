import {View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Ingredients(){
    return (
        <View>
            <View>
                <ScrollView>
                    <Text>Ingredients</Text>
                    <Text>Ingredients</Text>
                    <Text>Ingredients</Text>
                    <Text>Ingredients</Text>
                    <Text>Ingredients</Text>
                
                </ScrollView>
            </View>
            <View>
                <TouchableOpacity style={styles.addButton}><Ionicons name='add'></Ionicons></TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    addButton : {
        backgroundColor: 'tomato',
        width: 66,
        height: 66,
        borderRadius: 33,
        justifyContent: 'center',
        alignItems:'center',
        position: 'absolute',
        bottom: 20,
        right: 20
    }
})