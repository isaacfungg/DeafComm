import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function CreateAccountScreen() {
    const navigation = useNavigation();
    const { setLogIn } = useContext(GlobalContext);

    const [info, setInfo] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    });

    const [validation, setValidation] = useState({
        isEmailValid: true,
        isPasswordValid: true,
        isPasswordMatch: true,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isFormValid = validation.isEmailValid && validation.isPasswordValid && validation.isPasswordMatch && info.firstName && info.lastName;

    const handleInputChange = (name, value) => {
        setInfo(prev => ({ ...prev, [name]: value }));

        if (name === 'email') {
            validateEmail(value);
        }

        if (name === 'password' || name === 'confirmPassword') {
            validatePassword(value, name);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        setValidation(prev => ({ ...prev, isEmailValid: emailRegex.test(email) }));
    };

    const validatePassword = (value, name) => {
        setValidation(prev => ({
            ...prev,
            isPasswordValid: info.password.length >= 4,
            isPasswordMatch: name === 'password' ? value === info.confirmPassword : info.password === value,
        }));
    };

    const handleRegister = () => {
        setInfo({
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
        });

        const valid = true;
        if (valid) {
            navigation.navigate('Account');
            //Not sure if we auto log in or we bring them to the log in page
            setLogIn(true);
        }
    };

    const getInputStyle = (fieldName) => {
        if (fieldName === 'email') {
            return [styles.input, !validation.isEmailValid ? styles.errorBorder : null];
        }
        if (fieldName === 'password' || fieldName === 'confirmPassword') {
            return [styles.input, (!validation.isPasswordValid || !validation.isPasswordMatch) ? styles.errorBorder : null];
        }
        return styles.input;
    };

    return (
        <View style={styles.fullScreen}>
            <View style={styles.container}>
                {/*----------First Name Input----------*/}
                <TextInput
                    style={getInputStyle('firstName')}
                    placeholder="First Name*"
                    value={info.firstName}
                    onChangeText={(value) => handleInputChange('firstName', value)}
                />

                {/*----------Last Name Input----------*/}
                <TextInput
                    style={getInputStyle('lastName')}
                    placeholder="Last Name*"
                    value={info.lastName}
                    onChangeText={(value) => handleInputChange('lastName', value)}
                />

                {/*----------Email Input----------*/}
                <TextInput
                    style={getInputStyle('email')}
                    placeholder="Email*"
                    value={info.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {/*----------Password Input----------*/}
                <View style={[
                    styles.passwordContainer,
                    (!validation.isPasswordValid || !validation.isPasswordMatch) && styles.errorBorder
                ]}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password*"
                        value={info.password}
                        onChangeText={(value) => handleInputChange('password', value)}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity 
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.toggleButton}
                    >
                        <Text style={styles.passwordText}>{showPassword ? 'Hide' : 'Show'}</Text>
                    </TouchableOpacity>
                </View>

                {/*----------Confirm Password Input----------*/}
                <View style={[
                    styles.passwordContainer,
                    (!validation.isPasswordValid || !validation.isPasswordMatch) && styles.errorBorder
                ]}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Confirm Password*"
                        value={info.confirmPassword}
                        onChangeText={(value) => handleInputChange('confirmPassword', value)}
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity 
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={styles.toggleButton}
                    >
                        <Text style={styles.passwordText}>{showConfirmPassword ? 'Hide' : 'Show'}</Text>
                    </TouchableOpacity>
                </View>

                {/*----------Error Messages----------*/}
                {!validation.isPasswordValid && <Text style={styles.errorMessage}>Password must be at least 5 characters long.</Text>}
                {!validation.isPasswordMatch && <Text style={styles.errorMessage}>Passwords do not match.</Text>}
            </View>

            {/*----------Register Button----------*/}
            <TouchableOpacity 
                style={[styles.button, !isFormValid && styles.disabledButton]} 
                onPress={handleRegister}
                disabled={!isFormValid}    
            >
                <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 35,
        padding: 22,
        backgroundColor: '#23395d',
    },
    input: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 12,
        padding: 17,
        marginBottom: 10,
        color: 'white', 
        backgroundColor: 'white', 
    },
    button: {
        position: 'absolute', 
        bottom: 0,        
        left: 0,            
        right: 0,            
        padding: 30,
        alignItems: 'center',
        backgroundColor: 'black',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        paddingBottom: 10,
    },
    errorBorder: {
        borderColor: '#8B0000',
    },
    toggleButton: {
        padding: 10,
        position: 'absolute',
        right: 0,
        height: '100%',
        justifyContent: 'center',
    },
    passwordContainer: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'transparent',
        borderWidth: 1,
        marginBottom: 10,
        width: '100%',
    },
    passwordInput: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 12,
        padding: 17,
        backgroundColor: 'white', 
    },
    disabledButton: {
        backgroundColor: '#a9a9a9',
    },
    errorMessage: {
        color: '#8B0000',
        fontSize: 12,
        marginTop: 5,
    },
    passwordText: {
        fontSize: 12,
        color: 'black', 
    },
});


