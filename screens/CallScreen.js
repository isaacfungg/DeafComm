import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, KeyboardAvoidingView, ScrollView, Keyboard, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Tts from 'react-native-tts';
import axios from 'axios';

const CallScreen = () => {
    const [textInput, setTextInput] = useState('');
    const [audioToText, setAudioToText] = useState('');
    const [textToAudio, setTextToAudio] = useState('');
    const [callDuration, setCallDuration] = useState(0);
    const navigation = useNavigation();
  
    const sendMessage = async () => {
      console.log("Sending message:", textInput);
      setTextToAudio(textInput);
      Tts.getInitStatus().then(() => {
          Tts.speak(textInput);
      });
      setTextInput('');

      try {
          const response = await axios.post('', {
              message: textInput
          });
          console.log('Twilio Response:', response.data);
      } catch (error) {
          console.error('Error sending message to Twilio:', error);
      }
  };

    const startListening = async () => {
        try {
            await Voice.start('en-US');
            console.log('Listening...');
        } catch (error) {
            console.error('Error starting voice recognition:', error);
        }
      };

    const stopListening = async () => {
        try {
            await Voice.stop();
            console.log('Stopped listening.');
            console.log('Recognized text:', audioToText);
            setTextInput(audioToText);
        } catch (error) {
            console.error('Error stopping voice recognition:', error);
        }
    };
  
    const endCall = () => {
        navigation.navigate('Phone', { call: false });
    };
  
    const formatCallDuration = (duration) => {
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = duration % 60;
      return `${hours}:${minutes}:${seconds}`;
    };
  
    const dismissKeyboard = () => {
      Keyboard.dismiss();
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView style={{ flex: 1, paddingHorizontal: 20 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={dismissKeyboard} activeOpacity={1} >
              {/* Area for displaying call duration */}
              <View style={styles.callDurationContainer}>
                <Text style={styles.callDurationText}>{formatCallDuration(callDuration)}</Text>
              </View>
              {/* Area for displaying converted audio to text */}
              <View style={styles.audioToTextContainer}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  <TextInput
                    style={styles.audioToText}
                    value={audioToText}
                    editable={false}
                    placeholder="Other user's voice converted to text"
                    multiline={true}
                  />
                </ScrollView>
              </View>
              {/* Area for displaying text converted to audio */}
              <View style={styles.textToAudioContainer}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  <TextInput
                    style={styles.textToAudio}
                    value={textToAudio}
                    editable={false}
                    placeholder="Your text converted to audio"
                    multiline={true}
                  />
                </ScrollView>
              </View>
              {/* Text input for sending messages */}
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={textInput}
                  onChangeText={setTextInput}
                  placeholder="Type your message..."
                  multiline={true}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
              {/* End call button */}
              <TouchableOpacity style={styles.endCallButton} onPress={endCall}>
                <Text style={styles.endCallButtonText}>End</Text>
              </TouchableOpacity>
              {/* Additional padding to the bottom */}
              <View style={{ height: 100 }} />
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#23395d',
  },
  callDurationContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  callDurationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff', 
  },
  audioToTextContainer: {
    width: '100%',
    height: '35%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 20,
    borderRadius: 15,
  },
  audioToText: {
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  textToAudioContainer: {
    width: '100%',
    height: '35%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 20,
    borderRadius: 15,
  },
  textToAudio: {
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  textInputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 3,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 150,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  sendButton: {
    backgroundColor: '#009900',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700'
  },
  endCallButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignSelf: 'center',
    marginBottom: 20,
  },
  endCallButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CallScreen;
