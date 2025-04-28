import { StyleSheet, Platform, StatusBar, View } from 'react-native'
import React from 'react'
import { getStatusBarHeight } from 'react-native-safearea-height';
import { colors } from '../utils/colors';

export const statusBarHeight = getStatusBarHeight();

const CommonStatusBar = () => {
    return (
        <>
            <View style={styles.statusBar} />
            <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        </>
    )
}

export default CommonStatusBar

const styles = StyleSheet.create({
    statusBar: {
        display: 'flex',
        flexDirection: 'column',
        height: Platform.OS === 'ios' ? statusBarHeight : 0,
        backgroundColor: colors.primary,
    },
});
