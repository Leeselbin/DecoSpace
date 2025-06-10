import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import Furniture from './Furniture';
import {GestureMode} from '../../screens/Home';
import GridBackground from './GridBackground';

type Props = {
  gestureMode: GestureMode;
};

const Canvas: React.FC<Props> = ({gestureMode}) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const [currentScale, setCurrentScale] = useState<number>(1);
  const [currentRotation, setCurrentRotation] = useState<number>(0);

  const [furnitureList, setFurnitureList] = useState([
    {id: '1', x: 0, y: 0, shape: 'square', color: 'lightblue'},
    {id: '2', x: 100, y: 100, shape: 'square', color: 'lightblue'},
  ]);

  // Pinch, rotation 제스처
  const pinchGesture = Gesture.Pinch().onUpdate(e => {
    scale.value = e.scale;
  });

  const rotationGesture = Gesture.Rotation().onUpdate(e => {
    rotation.value = e.rotation;
  });
  // SharedValue 변화 → JS로 전달
  //   useDerivedValue(() => {
  //     runOnJS(setCurrentScale)(scale.value);
  //   }, [scale]);

  //   useDerivedValue(() => {
  //     runOnJS(setCurrentRotation)(rotation.value);
  //   }, [rotation]);

  //   useEffect(() => {
  //     console.log('scale (JS):', currentScale);
  //   }, [currentScale]);

  //   useEffect(() => {
  //     console.log('rotation (JS):', currentRotation);
  //   }, [currentRotation]);

  // 캔버스는 확대/축소/회전만 처리
  const composedGesture = Gesture.Simultaneous(pinchGesture, rotationGesture);

  // 캔버스 스타일 애니메이션 적용
  const animatedCanvasStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}, {rotateZ: `${rotation.value}rad`}],
  }));

  useEffect(() => {
    if (gestureMode && gestureMode === 'reset') {
      console.log('gestureMode :', gestureMode);
      scale.value = 1;
      rotation.value = 0;
    }
    console.log('gestureMode :', gestureMode);
  }, [gestureMode]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={composedGesture}>
        <View style={{width: '100%', height: '100%'}}>
          {gestureMode === 'edit' && <GridBackground />}
          <Animated.View style={[styles.canvas, animatedCanvasStyle]}>
            {furnitureList &&
              furnitureList.map((item, index) => {
                return (
                  <Furniture
                    key={'furniture' + item.id}
                    item={item}
                    itemIndex={index}
                    initialX={item.x}
                    initialY={item.y}
                    gestureMode={gestureMode}
                    furnitureList={furnitureList}
                    setFurnitureList={setFurnitureList}
                  />
                );
              })}
          </Animated.View>
        </View>
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
    top: '10%',
    height: '90%',
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
