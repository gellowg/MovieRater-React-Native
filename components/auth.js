import React, { useState, useEffect } from 'react';
import {Text, Image, StyleSheet, StatusBar, TouchableOpacity, TextInput, ScrollView, AsyncStorage} from 'react-native';
import { API } from '../api-service'
import possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";

Auth.navigationOptions = screenProps => ({
    title: '',
    headerStyle: {
        backgroundColor: '#282C35',
        shadowOpacity: 0,
    },
    headerTintColor: 'white',
    shadowColor: 'transparent',
})

export default function Auth(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginTrue, setLoginTrue] = useState(true)

    useEffect(() => {
    }, [])

    const authLogin = () => {
        API.authLogin(username, password)
            .then( resp => saveToken(resp.token))
    }

    const saveToken = async (token) => {
        await AsyncStorage.setItem('user-token', token)
        expressCheck()
    }

    const expressCheck = async () => {
        const resp = await AsyncStorage.getItem('user-token')
        if (resp) {
            props.navigation.navigate('MovieList')
        }else {

        }
    }



    return (
        <ScrollView style={styles.page} >
            <StatusBar barStyle={'light-content'} />

            <Text style={styles.Heading}>{ loginTrue ? 'Login' : 'Sign Up'}</Text>


            <TextInput style={styles.input} placeholder={'Username'} onChangeText={text => setUsername(text)} value={username} autoCapitalize={'none'} />
            <TextInput style={styles.input} placeholder={'Password'} onChangeText={text => setPassword(text)} value={password} autoCapitalize={'none'} secureTextEntry={true}/>


            <TouchableOpacity onPress={() => authLogin()} ><Text style={styles.button} >{loginTrue ? 'Login' : 'Sign Up'}</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => saveMovie()} style={styles.appleButton} >
                        <Text style={styles.appleText}>
                            <Image style={styles.appleLogo} source={require('../assets/appleLogo.png')} /><Text>Continue with Apple</Text>
                        </Text>
                </TouchableOpacity>


            </ScrollView>
    )

}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#282C35',
        color: 'white',
    },
    input: {
        color: 'white',
        marginLeft: 30,
        marginRight: 20,
        marginTop: 20,
        fontSize: 20,
        backgroundColor: '#8e8e93',
        padding: 10,
        borderRadius: 10,
    },
    Heading: {
        color: 'white',
        fontWeight: '800',
        fontSize: 38,
        marginTop: 35,
        textAlign: 'center'
    },
    button: {
        padding: 20,
        backgroundColor: '#0a84ff',
        color: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        textAlign: 'center',
        margin: 30,
        marginRight: 20,
        fontWeight: 'bold',
        fontSize: 15,
    },
    appleButton: {
        padding: 20,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 10,
        overflow: 'hidden',
        margin: 30,
        marginRight: 20,
        fontSize: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    appleLogo: {
        height: 25,
        width: 25,

    },
    appleText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})