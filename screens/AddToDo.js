import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const AddToDo = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [todo, setTodo] = useState();
  const [status, setStatus] = useState("ToDo");
  const [date, setDate] = useState();

  const data = {
    todo,
    status,
    date,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(data);

  const saveToDo = () => {
    setIsLoading(true);
    axios
      .post("https://61b93cdf38f69a0017ce5f6a.mockapi.io/api/v1/todos", body, config)
      .then((response) => {
        setIsLoading(false);
        alert("Add todo successfuly");
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.bgHead}>
        <Text style={styles.titleHead}>Add ToDo</Text>
      </View>
      <ScrollView>
        <View style={styles.mrTop}>
          <Text style={styles.nameTodo}>ToDo</Text>
          <TextInput style={styles.bgTodo} onChangeText={(value) => setTodo(value)} />
        </View>
        <View style={styles.mrTop}>
          <Text style={styles.nameTodo}>Date (DD MM YYYY)</Text>
          <TextInputMask
            style={styles.bgTodo}
            type={"datetime"}
            value={date}
            onChangeText={(value) => setDate(value)}
            options={{
              format: "DD-MM-YYYY",
            }}
          />
        </View>
        <View style={styles.mrTop}>
          <Text style={styles.nameTodo}>Status</Text>
          <Picker style={styles.bgTodo} selectedValue={status} onValueChange={(value) => setStatus(value)}>
            <Picker.Item label="ToDo" value="ToDo" />
            <Picker.Item label="Doing" value="Doing" />
            <Picker.Item label="Done" value="Done" />
            <Picker.Item label="Canceled" value="Canceled" />
          </Picker>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={saveToDo} style={styles.btnAdd}>
        <Text style={styles.add}>{isLoading ? "Saving..." : "Save ToDo"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddToDo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C0C9CC",
  },
  bgHead: {
    backgroundColor: "#636059",
    height: 110,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 20,
  },
  titleHead: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "600",
    paddingHorizontal: 15,
    marginTop: 60,
    textAlign: "center",
  },
  mrTop: {
    marginTop: 20,
  },
  bgTodo: {
    flex: 1,
    fontSize: 18,
    backgroundColor: "#F2F1F0",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  nameTodo: {
    color: "#787878",
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 15,
  },
  status: {
    color: "#0575F3",
    fontSize: 15,
    fontWeight: "600",
  },
  btnAdd: {
    color: "#fff",
    backgroundColor: "#636059",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 15,
    marginBottom: 30,
  },
  add: {
    fontWeight: "500",
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
});
