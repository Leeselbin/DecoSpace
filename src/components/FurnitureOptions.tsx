import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FurnitureOptionsProps {
    isVisible: boolean;
    onClose: () => void;
    onRotate90: () => void;
    onRotate180: () => void;
    onChangeColor: () => void;
    onChangeShape: () => void;
}

const FurnitureOptions: React.FC<FurnitureOptionsProps> = ({
    isVisible,
    onClose,
    onRotate90,
    onRotate180,
    onChangeColor,
    onChangeShape,
}) => {
    return (
        <Modal
            transparent
            visible={isVisible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
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
                    <TouchableOpacity style={[styles.optionButton, styles.closeButton]} onPress={onClose}>
                        <Text style={styles.optionText}>닫기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default FurnitureOptions;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    optionButton: {
        backgroundColor: '#4F46E5',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginVertical: 6,
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: '#A1A1AA', // 회색 톤
    },
    optionText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
