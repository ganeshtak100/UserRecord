import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../hooks/useRedux';
import { normalize, respFontSize } from '../utils/responsive';

const Loader: React.FC = () => {
  const { loading, loadingText } = useAppSelector(state => state.users);

  if (!loading) return null;

  return (
    <View style={styles.container}>
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color="#2196F3" />
        {loadingText && <Text style={styles.text}>{loadingText}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loaderBox: {
    backgroundColor: 'white',
    padding: normalize(20),
    borderRadius: normalize(10),
    alignItems: 'center',
  },
  text: {
    marginTop: normalize(10),
    fontSize: respFontSize(14),
    color: '#333',
  },
});

export default Loader;