import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Canvas from '../components/Home/Canvas';
import HomeHeader from '../components/Home/HomeHeader';
import FurniturePanel from '../components/Home/FurniturePanel';

export type GestureMode = 'idle' | 'add' | 'edit' | 'reset' | 'saving';

const Home = () => {
  const [gestureMode, setGestureMode] = useState<GestureMode>('idle');

  const onSaveData = () => {
    // TODO : 저장로직 추가
    setGestureMode('idle');
  };

  const changeGestureMode = (mode: GestureMode) => {
    console.log('input Mode :', mode);
    if (mode === 'saving') {
      setGestureMode(mode);
    } else {
      setGestureMode(mode);
    }
  };

  return (
    <View style={styles.container1}>
      <HomeHeader changeGestureMode={changeGestureMode} />
      <Canvas gestureMode={gestureMode} />

      <FurniturePanel
        visible={gestureMode === 'add'}
        onClose={() => setGestureMode('idle')}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
});
