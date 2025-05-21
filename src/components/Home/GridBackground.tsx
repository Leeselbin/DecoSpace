import React, {useState} from 'react';
import {View, StyleSheet, LayoutChangeEvent} from 'react-native';

const GridBackground: React.FC = () => {
  const [size, setSize] = useState({width: 0, height: 0});

  const onLayout = (event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;

    console.log('width :', width);
    console.log('width :', height);
    setSize({width, height});
  };

  const gridSize = 20;
  const {width, height} = size;

  const verticalLines = [];
  const horizontalLines = [];

  for (let x = 0; x < width; x += gridSize) {
    verticalLines.push(
      <View key={`v-${x}`} style={[styles.line, {left: x, height}]} />,
    );
  }
  for (let y = 0; y < height; y += gridSize) {
    horizontalLines.push(
      <View key={`h-${y}`} style={[styles.line, {top: y, width}]} />,
    );
  }

  return (
    <View style={styles.container} onLayout={onLayout} pointerEvents="none">
      {verticalLines}
      {horizontalLines}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // top:0,left:0,right:0,bottom:0
    zIndex: 5000,
  },
  line: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.1)', // 연한 검정색 (투명도 10%)
    width: 0.5,
    height: 0.5,
  },
});

export default GridBackground;
