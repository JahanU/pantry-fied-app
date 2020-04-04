import React from 'react';
import { TouchableOpacity, Image } from 'react-native';


const FavButtonFill = ({ onPress, definedFlex }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ flex: definedFlex }}>
      <Image source={require('../../assets/filledStar.png')} style={{ flex: 1 }} />
    </TouchableOpacity>
  );
};


export { FavButtonFill };
