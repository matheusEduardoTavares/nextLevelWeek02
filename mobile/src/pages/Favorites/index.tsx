import React, { useState, useContext } from 'react'
import { View, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import TeacherItem, { Teacher } from '../../components/TeacherItem'
import PageHeader from '../../components/PageHeader'

import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage'

function Favorites(){
    const [favorites, setFavorites] = useState([])

    function loadFavorites(){
        AsyncStorage.getItem('favorites')
        .then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response)

                setFavorites(favoritedTeachers)
            }
        })
    }

    useFocusEffect(() => {
        loadFavorites()
        // É executado sempre que a tela entrar em foco
    })

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos"/>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favorites.map((teacher: Teacher) => (
                    // <TeacherItem key={teacher.id} teacher={teacher} favorited={true}/>
                    <TeacherItem key={teacher.id} teacher={teacher} favorited/>
                ))}
            </ScrollView>
        </View>
    )
}

export default Favorites