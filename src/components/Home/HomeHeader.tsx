import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { statusBarHeight } from '../CommonStatusBar'
import { GestureMode } from '../../screens/Home';

type Props = {
    changeGestureMode: (mode: GestureMode) => void;
}

const HomeHeader = ({ changeGestureMode }: Props) => {
    return (
        <View style={styles.container1}>
            <TouchableOpacity onPress={() => changeGestureMode('add')} style={styles.buttonWrap}>
                <Text>추가</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeGestureMode('delete')} style={styles.buttonWrap}>
                <Text>삭제</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeGestureMode('edit')} style={styles.buttonWrap}>
                <Text>편집</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeGestureMode('saving')} style={styles.buttonWrap}>
                <Text>저장</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        backgroundColor: 'green',
        flexDirection: 'row',
        height: '10%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'absolute',
        zIndex: 99999,
        top: 0,
    },
    buttonWrap: {
        padding: 10,
        backgroundColor: 'red',

    }
})