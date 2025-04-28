import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Canvas from '../components/Canvas'

const Home = () => {
    return (
        <View style={styles.container1}>
            <Canvas />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({

    container1: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    }
})