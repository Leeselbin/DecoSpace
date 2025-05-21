import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Canvas from '../components/Home/Canvas'
import HomeHeader from '../components/Home/HomeHeader'

export type GestureMode = 'idle' | 'add' | 'edit' | 'delete' | 'saving';

const Home = () => {
    const [gestureMode, setGestureMode] = useState<GestureMode>('idle');

    const changeGestureMode = (mode: GestureMode) => {
        setGestureMode(mode);
    }

    return (
        <View style={styles.container1}>
            <HomeHeader changeGestureMode={changeGestureMode} />
            <Canvas gestureMode={gestureMode} />
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