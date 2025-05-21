import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { runOnJS } from 'react-native-reanimated';

import Svg, { Polygon } from 'react-native-svg';
import FurnitureOptions from './FurnitureOptions';

type FurnitureProps = {
    initialX: number;
    initialY: number;
}

const Furniture: React.FC<FurnitureProps> = ({ initialX, initialY }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [color, setColor] = useState('lightblue');
    const [shape, setShape] = useState<'square' | 'circle' | 'triangle' | 'star'>('square');

    const translateX = useSharedValue(initialX);
    const translateY = useSharedValue(initialY);
    const rotation = useSharedValue(0);

    const startX = useSharedValue(0);
    const startY = useSharedValue(0);

    // Pan 제스처 (드래그)
    const panGesture = Gesture.Pan()
        .onStart(() => {
            startX.value = translateX.value;
            startY.value = translateY.value;
        })
        .onUpdate((e) => {
            translateX.value = startX.value + e.translationX;
            translateY.value = startY.value + e.translationY;
        });

    const toggleOptions = () => {
        setShowOptions(prev => !prev);
    };

    // Tap 제스처 (클릭해서 옵션 보이기)
    const tapGesture = Gesture.Tap()
        .onEnd(() => {
            runOnJS(toggleOptions)();
        });

    // 둘 다 동시에 사용
    const composedGesture = Gesture.Simultaneous(panGesture, tapGesture);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: withSpring(translateX.value, { damping: 40, stiffness: 1000 }) },
            { translateY: withSpring(translateY.value, { damping: 40, stiffness: 1000 }) },
            { rotateZ: `${rotation.value}rad` },
        ],
    }));

    const rotate90 = () => {
        rotation.value += Math.PI / 2; // 90도
        toggleOptions();
    };

    const rotate180 = () => {
        rotation.value += Math.PI; // 180도
        toggleOptions();
    };

    const changeColor = () => {
        setColor(prev => (prev === 'lightblue' ? 'lightgreen' : 'lightblue'));
        toggleOptions();
    };

    const toggleShape = () => {
        switch (shape) {
            case 'square':
                setShape('circle');
                break;
            case 'circle':
                setShape('triangle');
                break;
            case 'triangle':
                setShape('star');
                break;
            default:
                setShape('square');
        }
        toggleOptions();
    };

    // 도형 스타일 반환
    const getShapeComponent = () => {
        switch (shape) {
            case 'circle':
                return (
                    <Animated.View
                        style={[styles.furniture, animatedStyle, { backgroundColor: color, borderRadius: 50 }]}
                    />
                );
            case 'triangle':
                return (
                    <Animated.View style={[styles.furnitureSvg, animatedStyle]}>
                        <Svg width="100" height="100">
                            <Polygon
                                points="50,0 100,100 0,100"
                                fill={color}
                                stroke="black" // 검은색 외곽선
                                strokeWidth={2} // 외곽선 두께
                            />
                        </Svg>
                    </Animated.View>
                );
            case 'star':
                return (
                    <Animated.View style={[styles.furnitureSvg, animatedStyle]}>
                        <Svg width="100" height="100">
                            <Polygon
                                points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
                                fill={color}
                                stroke="black" // 검은색 외곽선
                                strokeWidth={2} // 외곽선 두께
                            />
                        </Svg>
                    </Animated.View>
                );
            case 'square':
            default:
                return (
                    <Animated.View
                        style={[styles.furniture, animatedStyle, { backgroundColor: color, borderRadius: 10 }]}
                    />
                );
        }
    };

    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={composedGesture}>
                {getShapeComponent()}
            </GestureDetector>

            <FurnitureOptions
                onChangeColor={changeColor}
                onChangeShape={toggleShape}
                onRotate180={rotate180}
                onRotate90={rotate90}
                isVisible={showOptions}
                onClose={() => setShowOptions(false)}
            />

        </GestureHandlerRootView>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    furnitureSvg: {
        width: 100,
        height: 100,
        // backgroundColor: 'lightblue',
        // borderWidth: 2,
        // borderColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    options: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 5,
        borderRadius: 10,
    },
});
