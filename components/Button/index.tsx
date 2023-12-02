import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import classnames from 'classnames';

type CustomButtonProps = {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
  textClassName?: string;
};

const CustomButton = ({
  children,
  className,
  onPress,
  textClassName,
  ...rest
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={classnames(
        'py-2 px-4 min-w-full bg-gray-300 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75',
        className
      )}
      {...{ onPress }}
      {...rest}
    >
      <Text className={`text-lg text-center font-semibold ${textClassName}`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
