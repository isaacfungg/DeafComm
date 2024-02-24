import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, StatusBar } from 'react-native';
import RecentList from '../components/RecentList';

export default function RecentsPage() {
  return (
    <SafeAreaView style={styles.safeArea}> 
      <StatusBar barStyle="light-content" backgroundColor="#23395d" /> 
      <View style={styles.container}>
        <Text style={styles.title}>Recents</Text>
        <RecentList />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    width: '100%', 
    backgroundColor: '#23395d',
  },
  container: {
    flex: 1,
    width: '100%', 
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 35,
    backgroundColor: '#23395d',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
  },
});
