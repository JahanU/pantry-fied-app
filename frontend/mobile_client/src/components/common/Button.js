import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


const Button = ({ children, onPress, inheritStyle, inheritTextStyle, definedFlex }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[inheritStyle, { flex: definedFlex }]}>
      <Text style={inheritTextStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};


export { Button };
