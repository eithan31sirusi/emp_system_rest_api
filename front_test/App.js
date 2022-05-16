import { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Platform,
  TextInput,
} from "react-native";

import Constants from "expo-constants";

import axios from "axios";

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setLoading] = useState(true);

  const baseURL = "http://localhost:5000/";

  const firstNameHandler = (firstName) => {
    setFullName(firstName);
  };
  const lastNameHandler = (lastName) => {
    setFullName(lastName);
  };
  const emailHandler = (email) => {
    setFullName(email);
  };

  const passwordHandler = (password) => {
    setEmail(password);
  };

  const onSubmitHandler = async (event) => {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${baseURL}/api/users/register`, {
        firstName,
        lastName,
        email,
        password,
      });

      if (res.status === 201) {
        alert("User created successfully");
        setLoading(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      alert(error.message, "Something went wrong");
      setLoading(false);
    }
  };

  /* 
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []); */

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.wrapper}>
          {isLoading ? (
            <Text style={styles.formHeading}> Creating resource </Text>
          ) : (
            <Text style={styles.formHeading}>Create new user</Text>
          )}
        </View>
        <View style={styles.wrapper}>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={firstName}
            editable={!isLoading}
            onChangeText={firstNameHandler}
          />
        </View>
        <View style={styles.wrapper}>
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={email}
            editable={!isLoading}
            onChangeText={lastNameHandler}
          />
        </View>
        <View style={styles.wrapper}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={email}
            editable={!isLoading}
            onChangeText={emailHandler}
          />
        </View>
        <View style={styles.wrapper}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ffffff"
            style={styles.input}
            value={email}
            editable={!isLoading}
            onChangeText={passwordHandler}
          />
        </View>
        <View>
          <Button
            title="Submit"
            onPress={onSubmitHandler}
            style={styles.submitButton}
            disabled={isLoading}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252526",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
  },
  formHeading: {
    color: "#ffffff",
  },
  wrapper: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: "grey",
    minWidth: 200,
    textAlignVertical: "center",
    paddingLeft: 10,
    borderRadius: 20,
    color: "#ffffff",
  },
  submitButton: {
    backgroundColor: "gray",
    padding: 100,
  },
});
