import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TodoInterface from '../interfaces/Todo'
import { MaterialIcons } from '@expo/vector-icons'



const Todo: React.FC<{
  item: TodoInterface,
  removeTodo: (id: number[] | string) => void,
  checkTodo: (id: number[] | string) => void,
  editTodo: (todo: TodoInterface) => void,
  stopEditing: () => void,
  editingTodo: TodoInterface | null
}> = ({ item, removeTodo, checkTodo, editTodo, stopEditing, editingTodo }) => {



  let textDecorationLine: "line-through" | "none" = item.done ? "line-through" : "none"

  return (
    <View style={styles.todoContainer}>
      <Text onPress={() => checkTodo(item.id)} style={[styles.todoTxt, { textDecorationLine }]}>{item.title}</Text>
      <View style={styles.icons}>

        {editingTodo?.id !== item.id ?
          (<MaterialIcons
            name="edit"
            size={20}
            color="black"
            onPress={() => editTodo(item)}
          />) : (
            <MaterialIcons name="cancel" size={20} color="black" onPress={() => stopEditing()} />
          )
        }
        <MaterialIcons
          name="delete"
          size={20}
          style={styles.deleteIcon}
          onPress={() => removeTodo(item.id)} />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  todoContainer: {
    padding: 10,
    backgroundColor: "lightblue",
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todoTxt: {
    color: "black",
  },
  deleteIcon: {
    color: "red",
    marginLeft: 5
  },
  icons: {
    flexDirection: "row",
  }
})
export default Todo
