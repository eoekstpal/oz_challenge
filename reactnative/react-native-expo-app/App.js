import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import MainScreen from './screens/MainScreen';
import { store } from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <MainScreen/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});  