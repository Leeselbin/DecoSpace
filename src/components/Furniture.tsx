import React from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface FurnitureProps {
    initialX: number;
    initialY: number;
}

const Furniture: React.FC<FurnitureProps> = ({ initialX, initialY }) => {
    const translateX = useSharedValue(initialX);
    const translateY = useSharedValue(initialY);

    const startX = useSharedValue(0);
    const startY = useSharedValue(0);

    const panGesture = Gesture.Pan()
        .onStart(() => {
            startX.value = translateX.value;
            startY.value = translateY.value;
        })
        .onUpdate((e) => {
            translateX.value = startX.value + e.translationX;
            translateY.value = startY.value + e.translationY;
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            // damping: 숫자가 클수록 통통 튀는 거 줄어듦 (감쇠, 마찰 같은 느낌)
            // stiffness: 숫자가 클수록 빨리 수렴함 (느릿한 움직임 or 빠른 움직임 조정)
            // 100 ~ 300 : 자연스러운 느낌
            // 400 ~ 700 : 빠른 반응 
            // 1000이상 : 너무 빠름
            { translateX: withSpring(translateX.value, { damping: 40, stiffness: 1000 }) },
            { translateY: withSpring(translateY.value, { damping: 40, stiffness: 1000 }) },
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
