import React from 'react'
import { Image, View } from 'react-native'

export const WhiteLogo = () => {
    const urlImage="https://icons-for-free.com/iconfiles/png/512/design+development+facebook+framework+mobile+react+icon-1320165723839064798.png";
    return (
        <View
            style={{
                alignItems:'center'
            }}
        >
            <Image
                source={{
                    uri:urlImage
                }}
                style={{
                    width:100,
                    height:100,
                }}
            />
            
        </View>
    )
}
