import React from 'react';
import { TouchableOpacity, Image } from 'react-native';


const FavButton = ({ onPress, definedFlex }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ flex: definedFlex }}>
      <Image source={require('../../assets/transparentStar.png')} style={{ flex: 1 }} />
    </TouchableOpacity>
  );
};


export { FavButton };
