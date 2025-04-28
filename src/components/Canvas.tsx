import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Furniture from './\bFurniture';

const Canvas: React.FC = () => {
    const scale = useSharedValue(1);
    const rotation = useSharedValue(0);


    // Pinch, rotation 제스처
    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = e.scale;
        });

    const rotationGesture = Gesture.Rotation()
        .onUpdate((e) => {
            rotation.value = e.rotation;
        });

    // 캔버스는 확대/축소/회전만 처리
    const composedGesture = Gesture.Simultaneous(pinchGesture, rotationGesture);

    // 캔버스 스타일 애니메이션 적용
    const animatedCanvasStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { rotateZ: `${rotation.value}rad` },
        ],
    }));

    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={composedGesture}>
                <Animated.View style={[styles.canvas, animatedCanvasStyle]}>
                    <Furniture initialX={0} initialY={0} />
                    <Furniture initialX={100} initialY={100} />
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
};

export default Canvas;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        flex: 1,
        borderWidth: 0,
    },
    canvas: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#999',
        overflow: 'hidden',
    },
});
