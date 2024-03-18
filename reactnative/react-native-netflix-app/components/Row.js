import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { BASE_URL } from './Banner'
import axiosInstance from '../api/axios'

const Row = ({ title, fetchUrl, isLargeRow, onOpenModal }) => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axiosInstance.get(fetchUrl);
      setMovies(response.data.results);
    }
    fetchData();
  })

  return (
    <View style={{ marginTop: 20, marginBottom: 20 }}>
      <Text style={styles.row_title}>{title}</Text>
      <ScrollView horizontal contentContainerStyle={styles.row_posters}>
        {movies && movies.map((movie) => (
          <Pressable key={movie.id} onPress={() => onOpenModal(movie)}>
            <Image
              source={{ uri: `${BASE_URL}${movie.poster_path}` }}
              style={{
                width: isLargeRow ? 150 : 100,
                height: isLargeRow ? 22 : 150,
                marginRight: 10,
                borderRadius: 5
              }}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  row_title: {
    paddingLeft: 10,
    color: '#F2F2F2',
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 6
  },
  row_posters: {
    paddingLeft: 10
  }
})

export default Row