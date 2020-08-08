import React, { useEffect, useState } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

import api from '../../services/api'

import styles from './styles'

import landingImg from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'

import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

function Landing(){
    const [totalConnections, setTotalConnections] = useState(0)

    // const navigation = useNavigation()
    const {navigate} = useNavigation()

    function handleNavigateToGiveClassesPage(){
        // navigation.navigate()
        navigate('GiveClasses')
    }

    function handleNavigateToStudyPages(){
        navigate('Study')
    }

    useEffect(() => {
        api.get('connections')
        .then(response => {
            setTotalConnections(response.data.total)
        })
    }, [totalConnections])

    return (
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner} />

            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer? </Text>
            </Text>

            <View style={styles.buttonsContainer}>
                {/* <TouchableOpacity style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon}/>
                    <Text style={styles.buttonText}>Estudar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNavigateToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon}/>
                    <Text style={styles.buttonText}>Dar aulas</Text>
                </TouchableOpacity> */}
                <RectButton onPress={handleNavigateToStudyPages} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon}/>
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton onPress={handleNavigateToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon}/>
                    <Text style={styles.buttonText}>Dar aulas</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                {`Total de ${totalConnections} conexões já realizadas   `}
                {/* Total de {totalConnections} conexões já realizadas {'   '}*/}
                <Image source={heartIcon} /> 
            </Text>
        </View>
    )
}

export default Landing