import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Genre from './Genre'


const DetailsText = ({ title, description, genres }) => {
  return (

    <View style={styles.detailsContainer}>
      <Text style={styles.details_title}>{title}</Text>
      <Genre />
      <Text style={styles.details_description}>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  detailsContainer: {
    position: 'absolute',
    paddingHorizontal: 25,
    marginTop: 100
  },
  details_title: {
    color: '#F2F2F2',
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 16
  },
  details_description: {
    color: '#F2F2F2',
    fontSize: 16
  }
})

export default DetailsText