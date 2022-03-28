import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Calender from './components/Calender';
import Today from './components/Today';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Calender" component={Calender} />
        <Tab.Screen name="Today" component={Today} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

