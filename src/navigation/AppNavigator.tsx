import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {IS_IOS} from '../constants/AppConstant';
import UserList from '../screens/UserList';
import {COLORS} from '../theme/colors';
import {RootStackParamList} from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle={IS_IOS ? 'dark-content' : 'light-content'}
      />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTitleAlign: 'center',
          contentStyle: {
            backgroundColor: COLORS.background,
          },
        }}
        >
        <Stack.Screen
          name="UserList"
          component={UserList}
          options={{
            title: 'Users',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
