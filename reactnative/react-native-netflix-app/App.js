import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import Banner from './components/Banner';
import requests from './api/requests'
import Row from './components/Row';
import { useState } from 'react';
import MovieDetails from './components/MovieDetails';

export default function App() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMovie, setSelectecMovie] = useState(null);

  function openModal(movie) {
    setIsModalVisible(true);
    setSelectecMovie(movie);
  }

  function closeModal() {
    setIsModalVisible(false);
    setSelectecMovie(null);
  }

  return (
    <View style={styles.container}>
      <MovieDetails
        isModalVisible={isModalVisible}
        movie={selectedMovie}
        closeModal={closeModal}
      />
      <ScrollView style={styles.scrollView}>
        <Banner fetchUrl={requests.fetchNowPlaying} />
        <Row onOpenModal={openModal} title='Trending' fetchUrl={requests.fetchTrending}  />
        <Row onOpenModal={openModal} title='Top Rated' fetchUrl={requests.fetchTopRated} />
        <Row onOpenModal={openModal} title='Action Movies' fetchUrl={requests.fetchActionMovies} />
        <Row onOpenModal={openModal} title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
      </ScrollView>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  scrollView: {
    width: '100%'
  }
});
