import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 100 125"
    width={props.size || 24}
    height={props.size || 24}
    {...props}
  >
    <Path d="m33 87 9 5 7-12-8-8z" />
    <Circle cx={52} cy={17} r={7} />
    <Path d="m71 55-9-8v11l7 3zM42 67l13 13v12h11V75L42 51zM38 47l-7.415-7.415L29 41.5V61h9z" />
    <Path d="M58 56V30l-17-3-5.434 6.566L11 9l-3 3 80 80 3-3z" />
  </Svg>
);
export default SvgComponent;
