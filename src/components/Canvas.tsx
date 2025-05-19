import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import React, { SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, useDerivedValue, runOnJS } from 'react-native-reanimated';
import Furniture from './Furniture';

type Furniture = {
    showOptions: boolean;
    priority: number;
}

const Canvas: React.FC = () => {
    const scale = useSharedValue(1);
    const rotation = useSharedValue(0);
    const furnitureArray = Array(3).fill(false);
    const [currentScale, setCurrentScale] = useState(1);
    const [currentRotation, setCurrentRotation] = useState(0);
    const [showOptions, setShowOptions] = useState<boolean[]>(furnitureArray);



    // SharedValue 변화 → JS로 전달
    // useDerivedValue(() => {
    //     runOnJS(setCurrentScale)(scale.value);
    // }, [scale]);

    // useDerivedValue(() => {
    //     runOnJS(setCurrentRotation)(rotation.value);
    // }, [rotation]);

    // useEffect(() => {
    //     console.log('scale (JS):', currentScale);
    // }, [currentScale]);

    // useEffect(() => {
    //     console.log('rotation (JS):', currentRotation);
    // }, [currentRotation]);




    // 캔버스 스타일 애니메이션 적용
    const animatedCanvasStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { rotateZ: `${rotation.value}rad` },
        ],
    }));

    // 도형을 제외한 바깥부분 클릭시
    const outSideClick = React.useCallback(() => {
        const cloneArr = [...showOptions];
        for (let i = 0; i < cloneArr.length; i++) {
            cloneArr[i] = false;
        }
        setShowOptions(cloneArr);
    }, [showOptions]);

    // Pinch, rotation 제스처
    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = e.scale;
        });

    const rotationGesture = Gesture.Rotation()
        .onUpdate((e) => {
            rotation.value = e.rotation;
        });

    // 빈 공간 탭 제스처
    const tapOutsideGesture = Gesture.Tap()
        .onEnd(() => {
            runOnJS(outSideClick)();
        });

    // 확대/회전 + 탭 동시 제스처
    const composedGesture = Gesture.Simultaneous(pinchGesture, rotationGesture, tapOutsideGesture);



    return (

        <GestureHandlerRootView style={styles.container} >
            <GestureDetector gesture={composedGesture} >
                <Animated.View style={[styles.canvas, animatedCanvasStyle]}>
                    {furnitureArray.map((item, index) => {
                        return (
                            <Furniture key={'fun' + index} initialX={0} initialY={0} itemIndex={index} showOptions={showOptions} setShowOptions={setShowOptions} />
                        )
                    })}
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView >

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
