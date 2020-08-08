import React, { useState } from 'react'
import { View, Image, Text, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'
import api from '../../services/api'

// function handleTest(active: boolean, setActive: React.Dispatch<React.SetStateAction<boolean>>){
//     setActive((cond) => !cond)
//     if (active){
//         return (
//             <View>
//                 <Text style={styles.testeTexto}>Oi</Text>
//             </View>
//         )
//     }
// }

export interface Teacher{
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}

// function TeacherItem(){
const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
    // const [active, setActive] = useState(false)

    const [isFavorited, setIsFavorited] = useState(favorited)

    function handleLinkToWhatsapp() {
        api.post('connections', {
            user_id: teacher.id
        })

        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    

    async function handleToggleFavorite(){
        const favorites = await AsyncStorage.getItem('favorites')
        let favoritesArray = []

        if (favorites){
            favoritesArray = JSON.parse(favorites)
        }

        if (isFavorited) {
            // Remover dos favoritos
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id
            })

            favoritesArray.splice(favoriteIndex, 1)

            setIsFavorited(false)
            
            await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))   
        }
        else {
            // Adicionar aos favoritos

            favoritesArray.push(teacher)

            setIsFavorited(true)

            await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image style={styles.avatar} source={{ uri: teacher.avatar }}/>

                <View style={styles.profileInfo}>
                <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {/* Entusiasta das melhores tecnologias de química avançada.
                {'\n'}{'\n'}
                Apaixonado por explodir coisas em laboratório e por mudar a vida das epssoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões. */}
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>{(teacher.cost) ? `R$ ${teacher.cost.toFixed(2).replace('.', ',')}` : ''}</Text>
                </Text>

                <View style={styles.buttonsContainer}>

                    <RectButton onPress={handleToggleFavorite} style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}>
                        {/* <Image source={heartOutlineIcon}/> */}
                        { 
                            isFavorited ? 
                            <Image source={unfavoriteIcon}/> 
                            : 
                            <Image source={heartOutlineIcon}
                        /> }

                        
                    </RectButton>

                    <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                        <Image source={whatsappIcon}/>
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>

                </View>
            </View>

            {/* <RectButton style={styles.teste} onPress={() => handleTest(active, setActive)}>
            </RectButton> */}
        </View>
    )
}

export default TeacherItem