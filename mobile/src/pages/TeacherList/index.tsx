import React, { useState, createContext, useContext } from 'react'
import { View, ScrollView, Text, TextInput } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import TeacherItem, { Teacher } from '../../components/TeacherItem'
import PageHeader from '../../components/PageHeader'

import styles from './styles'
import api from '../../services/api'

// Modal >> picker

function TeacherList(){
    const [isFiltersVisible, setIsFiltersVisible] = useState(false)

    const [teachers, setTeachers] = useState([])
    const [favorites, setFavorites] = useState<number[]>([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeek_day] = useState('')
    const [time, setTime] = useState('')

    // const Context = createContext([])
    
    // useEffect(() => {
    //     AsyncStorage.getItem('favorites')
    //     .then(response => {
    //         if (response) {
    //             const favoritedTeachers = JSON.parse(response)
    //             const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id)

    //             setFavorites(favoritedTeachersIds)
    //         }
    //     })
    // }, [favorites])

    useFocusEffect(() => {
        loadFavorites()
    })

    function handleToggleFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisible)
    }

    async function handleFiltersSubmit() {
        loadFavorites()

        const data = {
            subject,
            week_day,
            time
        }

        const response = await api.get('classes', {
            params: data
        })


        setIsFiltersVisible(false)
        setTeachers(response.data)
    }

    function loadFavorites(){
        AsyncStorage.getItem('favorites')
        .then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response)
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id)

                setFavorites(favoritedTeachersIds)
            }
        })
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}            
            >
                { isFiltersVisible && (<View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                        style={styles.input}
                        placeholder="Qual a matéria?"
                        placeholderTextColor="#c1bccc"
                        value={subject}
                        onChangeText={e => setSubject(e)}
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput 
                                style={styles.input}
                                placeholder="Qual o dia?"
                                placeholderTextColor="#c1bccc"
                                value={week_day}
                                onChangeText={e => setWeek_day(e)}
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                style={styles.input}
                                placeholder="Qual o horário?"
                                placeholderTextColor="#c1bccc"
                                value={time}
                                onChangeText={e => setTime(e)}
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>

                    </View>
                )}

{/* {(
    isFiltersVisible && <Context.Provider value={teachers}>
                             (<View style={styles.searchForm}>
                            <Text style={styles.label}>Matéria</Text>
                            <TextInput 
                            style={styles.input}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1bccc"
                            value={subject}
                            onChangeText={e => setSubject(e)}
                            />

                            <View style={styles.inputGroup}>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Dia da semana</Text>
                                    <TextInput 
                                    style={styles.input}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                    value={week_day}
                                    onChangeText={e => setWeek_day(e)}
                                    />
                                </View>

                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Horário</Text>
                                    <TextInput 
                                    style={styles.input}
                                    placeholder="Qual o horário?"
                                    placeholderTextColor="#c1bccc"
                                    value={time}
                                    onChangeText={e => setTime(e)}
                                    />
                                </View>
                            </View>

                            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                                <Text style={styles.submitButtonText}>Filtrar</Text>
                            </RectButton>

                        </View>
                </Context.Provider>
                )} */}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: Teacher) => (
                    <TeacherItem 
                    key={teacher.id} 
                    teacher={teacher}
                    favorited={favorites.includes(teacher.id)}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default TeacherList