import React from "react"
import { Image, Text, TouchableOpacity } from "react-native"

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image source={{ uri: imgUrl }} className="w-24 h-24 rounded-lg" />
      <Text className="absolute top-0 w-full h-full pl-1 overflow-hidden font-bold text-white rounded-lg bg-gray-900/50">
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CategoryCard