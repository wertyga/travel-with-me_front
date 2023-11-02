import { View, Text, Button } from 'react-native'
import React from 'react'

const CustomButton = ({children}) => {
  return (
      <Button title={children} className="bg-red text-white" />
  )
}

export default CustomButton
