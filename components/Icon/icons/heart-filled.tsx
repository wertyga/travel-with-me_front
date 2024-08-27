import * as React from 'react';

import Svg, { Path } from 'react-native-svg';

const SvgComponent = props => {
  const size = props.size || 25;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      {...props}
    >
      <Path
        fill="#F6F5F2"
        stroke="#F6F5F2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.3}
        d="m21.762 17.37 2.88-2.88.453-.452a7.519 7.519 0 0 0 0-10.634c-2.936-2.936-7.697-2.003-10.633.934l-.452.452-.453-.452C10.621 1.4 5.86.468 2.924 3.404a7.519 7.519 0 0 0 0 10.634l.452.452L14.01 25.123l7.752-7.753Z"
      />
    </Svg>
  );
};
export default SvgComponent;
