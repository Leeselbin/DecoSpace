import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FurnitureOptionsProps {
    onRotate90: () => void;
    onRotate180: () => void;
    onChangeColor: () => void;
    onChangeShape: () => void;
}

const FurnitureOptions: React.FC<FurnitureOptionsProps> = ({ onRotate90, onRotate180, onChangeColor, onChangeShape }) => {
    return (
        <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={onRotate90}>
                <Text style={styles.optionText}>90° 회전</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={onRotate180}>
                <Text style={styles.optionText}>180° 회전</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={onChangeColor}>
                <Text style={styles.optionText}>색상 변경</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={onChangeShape}>
                <Text style={styles.optionText}>모양 변경</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FurnitureOptions;

const styles = StyleSheet.create({
    optionsContainer: {

        position: 'absolute',
        top: -120,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    optionButton: {
        backgroundColor: '#4F46E5', // 예쁜 퍼플톤
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginVertical: 5,
        alignItems: 'center',
    },
    optionText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
