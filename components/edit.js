import React, { useState, useEffect } from 'react';
import {Text, View, Image, StyleSheet, StatusBar, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { API } from '../api-service'

export default function Edit(props) {


    const movie = props.navigation.getParam('movie', null)
    const [ title, setTitle] = useState(movie.title)
    const [ description, setDescription] = useState(movie.description)

    const saveMovie = () => {
        API.saveMovie(movie.id, title, description)
            .then( resp => resp.json())
            .then( movie =>
                props.navigation.navigate('Detail', {movie: movie})
            )
    }


    return (
        <ScrollView style={styles.page} >
            <StatusBar barStyle={'light-content'} />
            <Text style={styles.Heading} >Edit {movie.title} </Text>
            <TextInput style={styles.input} placeholder={'Title'} onChangeText={text => setTitle(text)} value={title} />
            <TextInput multiline={true} style={styles.input} placeholder={'Description'} onChangeText={desc => setDescription(desc)} value={description} />
            <TouchableOpacity onPress={() => saveMovie()} ><Text style={styles.button} >Save</Text></TouchableOpacity>
        </ScrollView>
    )
}

Edit.navigationOptions = screenProps => ({
    headerBackTitle: screenProps.navigation.getParam('movie').title,
    title: '',
    headerStyle: {
        backgroundColor: '#282C35',
        shadowOpacity: 0,
    },
    headerTintColor: 'white',
    shadowColor: 'transparent',
    headerRight: (
        <TouchableOpacity onPress={() => screenProps.navigation.navigate('Edit', {movie: screenProps.navigation.getParam("movie")}) } >
            <Image source={require('../assets/trashRed.png')} style={{width: 25, height: 25, right: 20 }} ></Image>
        </TouchableOpacity>
    )
})

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
        marginLeft: 30,
        fontSize: 38,
        marginTop: 35,
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
})