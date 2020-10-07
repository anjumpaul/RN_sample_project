import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/components/Login';
import HomePage from './src/components/HomePage';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const [isloggedIn, setLoggedIn] = React.useState(false);

  const signIn = ({username, password}) => {
    fetch('http://www.mocky.io/v2/5ec297212f000065cac35450', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((r) => r.json())
      .then(
        (user) => {
          setLoggedIn(true);
        },
        (error) => {
          setLoggedIn(false);
        },
      );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: isloggedIn ? true : false,
        }}>
        {isloggedIn ? (
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{title: 'Users'}}
          />
        ) : (
          <Stack.Screen name="Login">
            {() => <Login signIn={signIn} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
