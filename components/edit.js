import React, { useState } from 'react';
import {
    Text,
    Image,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
    AsyncStorage
} from 'react-native';
import { API } from '../api-service'
import possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";


export default function Edit(props) {
    const token = AsyncStorage.getItem('user-token');

    const movie = props.navigation.getParam('movie', null)
    const [ title, setTitle] = useState(movie.title)
    const [ description, setDescription] = useState(movie.description)


    if (movie.id) {

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
                <TouchableOpacity
                    onPress={deleteMovie(screenProps.navigation.getParam('movie').title, screenProps.navigation.getParam('movie').id)}>
                    <Image source={require('../assets/trashRed.png')} style={{width: 25, height: 25, right: 20}}/>
                </TouchableOpacity>
            )
        })
    }else{
        Edit.navigationOptions = screenProps => ({
            headerBackTitle: screenProps.navigation.getParam('movie').title,
            title: '',
            headerStyle: {
                backgroundColor: '#282C35',
                shadowOpacity: 0,
            },
            headerTintColor: 'white',
            shadowColor: 'transparent',
        })
    }




    const saveMovie = () => {
        if(movie.id){
            API.saveMovie(movie.id, title, description)
                .then( resp => resp.json())
                .then( refreshMovies )
        }else{
            API.addMovie(title, description)
                .then(refreshMovies())

        }

    }

    const refreshMovies = () => {
        API.getMovies()
            .then(resp => resp.json())
            .then(resp => props.navigation.navigate('MovieList', {movie: resp}))
    }

    const deleteMovie = (title, id) => evt => {
        Alert.alert(
            `Do you want to delete ${title}?`,
            ``,
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        API.deleteMovie(id)
                        refreshMovies()
                    }
                },
                {
                    text: 'Cancel',
                    //onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
            ],
            { cancelable: false }
        );
    }




    return (
        <ScrollView style={styles.page} >
            <StatusBar barStyle={'light-content'} />
            <Text style={styles.Heading}>{movie.id ? 'Edit' : 'Add'} {movie.title} </Text>
            <TextInput style={styles.input} placeholder={'Title'} onChangeText={text => setTitle(text)} value={title} />
            <TextInput multiline={true} style={styles.input} placeholder={'Description'} onChangeText={desc => setDescription(desc)} value={description} />
            <TouchableOpacity onPress={() => saveMovie()} ><Text style={styles.button} >{movie.id ? 'Save' : 'Add'}</Text></TouchableOpacity>
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