import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import InputForm from '../components/InputForm'

const MainScreen = () => {
  return (
    // 상태바 아래 부터 시작하도록함 
    <SafeAreaView style={styles.container}>
        {/* 상태바 */}
        <StatusBar barStyle={'default'} />
        <Text style={styles.pageTitle}>ToDo App</Text>
        <View style={styles.listView}>
            <Text style={styles.listTitle}>할 일</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.listView} >
            <Text style={styles.listTitle}>완료된 일</Text>
        </View>
        <InputForm />
    </SafeAreaView>
  )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 20: 0,
        backgroundColor: '#f7f8fa'
    },
    pageTitle: {
        marginBottom: 35,
        paddingHorizontal: 15,
        fontSize: 54,
        fontWeight: '600'
    },
    separator: {
        marginHorizontal: 10,
        marginTop: 25,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)'
    },
    listView: {
        flex: 1
    },
    listTitle: {
        marginBottom: 25,
        paddingHorizontal: 15,
        fontSize: 41,
        fontWeight: '500'
    },
    emptyListText: {
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 15,
        fontSize: 15,
        lineHeight: 20,
        color: '#737373'
    }
})