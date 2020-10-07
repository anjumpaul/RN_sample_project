import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button, Text} from 'react-native';

const Login = ({signIn}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    setLoading(true);
    if (!username) {
      setUsernameError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    setLoading(false);
    if (username && password) {
      signIn({username, password});
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChange={({nativeEvent}) => {
          setUsername(nativeEvent.text);
          setUsernameError(false);
        }}
        style={styles.input}
      />
      {usernameError && (
        <Text style={styles.error}>This field is required*</Text>
      )}
      <TextInput
        placeholder="Password"
        value={password}
        onChange={({nativeEvent}) => {
          setPassword(nativeEvent.text);
          setPasswordError(false);
        }}
        secureTextEntry
        style={styles.input}
      />
      {passwordError && (
        <Text style={styles.error}>This field is required*</Text>
      )}
      <View style={styles.button}>
        <Button
          title={loading ? 'Loading...' : 'Sign in'}
          onPress={validateFields}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    margin: 5,
    padding: 10,
  },
  button: {
    margin: 5,
  },
  error: {
    margin: 5,
    color: 'red',
  },
});

export default Login;
