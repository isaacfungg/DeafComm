import { useState, useCallback } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, Image, StatusBar } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
const twilioClient = new Twilio('', '');

import images from '../assets/images';

export default function PhoneScreen() {
    const [inputValue, setInputValue] = useState('');
    const navigation = useNavigation(); 

    const buttons = [
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9',
        '*', '0', '#',
    ];

    const onButtonPress = (value) => {
        setInputValue(prevValue => prevValue + value);
    };

    const handleCallPress = () => {
        navigation.navigate('Screen Stack', { screen: 'Call Screen' });
        setInputValue("");
    };

    const handleDeletePress = () => {
        setInputValue(prevValue => prevValue.slice(0, -1));
    };

    const route = useRoute();

    useFocusEffect(
        useCallback(() => {
            if (route.params?.call) {
                handleCallPress();
            }
        }, [route.params?.call])
      );

      const makeCall = () => {
        twilioClient.calls.create({
            twiml: '<Response><Say>Hello, this is a test call.</Say></Response>',
            to: inputValue,
            from: 'YOUR_TWILIO_PHONE_NUMBER'
        }).then(handleCallPress);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#23395d" />
            <View style={styles.container}>
                <Text style={styles.title}>Dial Pad</Text>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Enter number" 
                        value={inputValue} 
                        editable={false}
                        placeholderTextColor="white"
                    />
                    <TouchableOpacity onPress={handleDeletePress} style={styles.deleteButton}>
                        <Image source={images.delete} style={styles.deleteIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.dialPad}>
                    {buttons.map(button => (
                        <TouchableOpacity 
                            key={button} 
                            style={styles.dialButton} 
                            onPress={() => onButtonPress(button)}
                        >
                            <Text style={styles.buttonText}>{button}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1, 
        width: '100%', 
        backgroundColor: '#23395d', 
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#23395d',
    },
    title: {
        fontSize: 28,
        color: 'white',
        marginBottom: 20,
        fontWeight: '700'
    },
    inputContainer: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 20,
        color: 'white',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: 'white',
        padding: 15,
        borderRadius: 25,
        paddingLeft: 30,
        paddingRight: 40,
        fontWeight: '600',
    },
    dialPad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '80%',
    },
    dialButton: {
        width: 80,
        height: 80, 
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12, 
        marginHorizontal: 14,
        borderRadius: 35, 
        borderWidth: 3, 
        borderColor: 'white', 
        backgroundColor: 'transparent', 
    },
    buttonText: {
        fontSize: 22,
        fontWeight: '700',
        color: 'white',
    },
    deleteButton: {
        position: 'absolute',
        right: 10, 
        top: 8,
        padding: 10,
    },
    deleteIcon: {
        width: 25,
        height: 25,
        tintColor: 'white',
    },
});
