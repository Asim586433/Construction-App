import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from './src/theme';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import ToolsScreen from './src/screens/ToolsScreen';
import KBScreen from './src/screens/KBScreen';
import AdminScreen from './src/screens/AdminScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.background,
          headerTitleStyle: { fontWeight: 'bold', fontSize: theme.fontSize.large },
          tabBarStyle: { backgroundColor: theme.colors.background, borderTopWidth: 0, paddingBottom: 5, paddingTop: 5, height: 60 },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textMuted,
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' }
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Job Site' }} />
        <Tab.Screen name="Chat" component={ChatScreen} options={{ title: 'Ask AI' }} />
        <Tab.Screen name="Tools" component={ToolsScreen} options={{ title: 'Calculators' }} />
        <Tab.Screen name="KB" component={KBScreen} options={{ title: 'Tips' }} />
        <Tab.Screen name="Admin" component={AdminScreen} options={{ title: 'Admin' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
