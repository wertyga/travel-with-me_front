import * as React from 'react';
import Svg, { Path, Mask, G } from 'react-native-svg';

const SvgComponent = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      fill="none"
      {...props}
    >
      <Mask
        id="a"
        width={25}
        height={25}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}
      >
        <Path fill={props.color} d="M25 0H0v25h25V0Z" />
      </Mask>
      <G mask="url(#a)">
        <Mask
          id="b"
          width={25}
          height={25}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: 'luminance',
          }}
        >
          <Path fill={props.color} d="M0 0h25v25H0V0Z" />
        </Mask>
        <G mask="url(#b)">
          <Path
            stroke={props.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.3}
            d="m19.43 16.402 2.573-2.572.404-.404a6.713 6.713 0 0 0 0-9.494c-2.622-2.621-6.873-1.788-9.494.834l-.404.403-.404-.403C9.483 2.144 5.233 1.31 2.61 3.932a6.713 6.713 0 0 0 0 9.494l.404.404 9.494 9.494 4.074-4.074"
          />
        </G>
      </G>
    </Svg>
  );
};
export default SvgComponent;
