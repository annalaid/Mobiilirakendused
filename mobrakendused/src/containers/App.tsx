import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';
import UserSettings from '../components/UserSettings';

function App() {
  return (
    <SafeAreaView>
      <UserSettings />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#adecf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;
