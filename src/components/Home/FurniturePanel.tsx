import React, {useEffect} from 'react';
import {Text, Dimensions, TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');
const PANEL_WIDTH = width / 3;

type Props = {
  visible: boolean;
  onClose: () => void;
};

const FurniturePanel = ({visible, onClose}: Props) => {
  const translateX = useSharedValue(width);

  useEffect(() => {
    translateX.value = withTiming(visible ? width - PANEL_WIDTH : width, {
      duration: 300,
    });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: '10%',
    bottom: 0,
    right: 0,
    width: PANEL_WIDTH,
    height: '90%',
    backgroundColor: 'blue',
    transform: [{translateX: translateX.value - (width - PANEL_WIDTH)}],
    zIndex: 6000,
    elevation: 10,
    padding: 10,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity onPress={onClose}>
        <Text style={{color: 'red'}}>닫기</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FurniturePanel;
