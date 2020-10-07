import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch('https://api.github.com/users', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then((r) => r.json())
      .then(
        (users) => {
          setLoading(false);
          setUsers(users.slice(0, 10).map((user) => user));
        },
        (error) => {
          setLoading(false);
        },
      );
  };

  const onSearch = (value) => {
    setSearchValue(value);
    let results = [];
    users.map((user) => {
      if (user.login.includes(value.toLocaleLowerCase())) {
        results.push(user);
      }
    });
    setSearchResults(results);
  };

  const renderItem = ({item}) => <Item title={item.login} />;

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search a user"
        value={searchValue}
        onChangeText={(value) => {
          onSearch(value);
        }}
        style={styles.input}
      />
      {loading ? (
        <Text style={styles.empty}>Loading...</Text>
      ) : (
        <FlatList
          data={searchValue ? searchResults : users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>User not found!</Text>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'gray',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    color: 'white',
  },
  empty: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    margin: 5,
    padding: 10,
  },
});

export default HomePage;
