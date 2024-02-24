import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useContext } from "react";

import { GlobalContext } from "../context/GlobalState";

export default function AccountScreen() {
    const { isLoggedIn } = useContext(GlobalContext);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {!isLoggedIn ? (
                <View style={styles.centeredContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Screen Stack', { screen: 'Login' })}>
                        <Text style={styles.buttonText}>LOG IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Screen Stack', { screen: 'Create Account'})}>
                        <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text>Logged in.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 17,
        paddingVertical: 35,
        width: '100%',
        backgroundColor: '#23395d',
      },
      centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 130,
        width: '100%'
    },
      button: {
        marginTop: 20,
        backgroundColor: 'white',
        paddingVertical: 16,
        borderRadius: 14,
        width: '100%',
        alignItems: 'center', 
      },
      buttonText: {
        color: '#23395d',
        fontWeight: 'bold',
        fontSize: 18,
      },
})