import { StatusBar } from 'expo-status-bar';
import React, { createRef, useEffect, useState } from 'react';
import { Button, FlatList, Keyboard, StyleSheet, TextInput, View } from 'react-native';
import uuid from 'react-native-uuid';
import Layout from './components/layout/Layout';
import Todo from './components/Todo';
import TodoInterface from './interfaces/Todo';

export default function App() {

  const [todos, setTodos] = useState<TodoInterface[]>([
    { title: "hello", id: uuid.v4(), done: true },
    { title: "world", id: uuid.v4(), done: false }
  ])


  const [todo, setTodo] = useState('')

  const [editingTodo, setEditingTodo] = useState<TodoInterface | null>(null)

  const ref = createRef<TextInput>()

  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (todo.length >= 3)
      setIsValid(true)
    else
      setIsValid(false)
  }, [todo])

  function addTodo() {
    if (isValid) {
      if (!editingTodo) {
        const newTodo = { title: todo, id: uuid.v4(), done: false }
        setTodos(oldTodos => [newTodo, ...oldTodos])
      } else {
        setTodos(oldTodos => oldTodos.map(item => item.id === editingTodo.id ? { ...item, title: todo } : item))
        setEditingTodo(null)
      }
      setTodo('')
      Keyboard.dismiss()
    }
  }

  function stopEditing() {
    setTodo('')
    setEditingTodo(null)
  }

  function removeTodo(id: number[] | string) {
    if (editingTodo?.id === id)
      stopEditing()
    setTodos(oldTodos => oldTodos.filter(item => item.id !== id))
  }

  function checkTodo(id: number[] | string) {
    setTodos(oldTodos => oldTodos.map(item => item.id === id ? { ...item, done: !item.done } : item))
  }

  function editTodo(todo: TodoInterface) {
    setTodo(todo.title)
    ref.current?.focus()
    setEditingTodo(todo)
  }


  return (
    <Layout>
      <View style={styles.main}>
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <Todo
                item={item}
                removeTodo={removeTodo}
                checkTodo={checkTodo}
                editTodo={editTodo}
                editingTodo={editingTodo}
                stopEditing={stopEditing}
              />
            )}
            keyExtractor={item => item.id.toString()} />
        </View>
        <View style={styles.inputContainer}>
          <View>
            <Button
              title={isValid ? "Add Todo" : "Enter a proper todo"}
              color={isValid ? "blue" : "red"}
              onPress={addTodo}
            />
          </View>
          <TextInput
            ref={ref}
            style={styles.inputTodo}
            value={todo}
            onChangeText={(value) => setTodo(value)}
            onSubmitEditing={addTodo}
          />
        </View>
      </View>
      <StatusBar backgroundColor="red" translucent={true} style="inverted" />
    </Layout>
  );
}


const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 30,
    margin: 10,
  },
  list: {
    flex: 1
  },
  inputContainer: {

  },
  inputTodo: {
    borderColor: "white",
    color: "white",
    borderWidth: 1,
    marginTop: 5,
    height: 40,
    borderRadius: 10,
    padding: 10
  },
});
