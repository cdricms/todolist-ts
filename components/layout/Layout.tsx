import React from 'react'
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'

const Layout: React.FC = ({ children }) => {

  function handleTouch() {
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>

      <View style={styles.layout}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: "#262626",
    flex: 1
  }
})

export default Layout
