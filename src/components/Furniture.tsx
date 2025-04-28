import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface FurnitureProps {
    initialX: number;
    initialY: number;
}

const Furniture: React.FC<FurnitureProps> = ({ initialX, initialY }) => {
    const offsetX = useSharedValue(initialX);
    const offsetY = useSharedValue(initialY);

    // 각 가구에 대해 드래그 가능하게 설정
    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            offsetX.value = e.translationX + initialX;
            offsetY.value = e.translationY + initialY;
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: withSpring(offsetX.value) },
            { translateY: withSpring(offsetY.value) },
        ],
    }));

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.furniture, animatedStyle]} />
        </GestureDetector>
    );
};

export default Furniture;

const styles = StyleSheet.create({
    furniture: {
        width: 100,
        height: 100,
        backgroundColor: 'lightblue',
        borderWidth: 2,
        borderColor: '#333',
        borderRadius: 10,
    },
});
