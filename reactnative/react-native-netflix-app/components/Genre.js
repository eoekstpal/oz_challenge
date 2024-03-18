import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Genre = ({ genres }) => {
  return (
    <View style={styles.genres}>
      {genres?.map((genre, index) => (
        <View key={index} style={styles.genre}>
          <Text style={styles.genre_text}>{genre.name}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  genres: {
    flexDirection: 'row',
    gap: 7
  },
  genre: {
    paddingHorizontal: 3,
    paddingVertical: 5,
    borderRadius: 25,
    borderColor: '#F2F2F2',
    borderWidth: 1,
    marginBottom: 16
  },
  genre_text: {
    color: '#F2F2F2'
  }
})

export default Genre