import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar, ScrollView, AsyncStorage, Alert} from 'react-native';
import Detail from "./detail";
import { API } from '../api-service'

export default function MovieList(props) {
    const movies = props.navigation.getParam('movie', null)



    useEffect(() => {
        API.getMovies()
            .then(resp => resp.json())
            .then(jsonResp => props.navigation.navigate('MovieList', {movie: jsonResp}))
    }, []);


    const movieClicked = (movie) => {
        props.navigation.navigate('Detail', {movie: movie})
    }

    return (
        <View style={styles.back}>
            <StatusBar barStyle={'light-content'}/>
            <ScrollView>
                <Text style={styles.Heading}>Movies</Text>
                <FlatList data={movies} renderItem={({item}) => (
                    <TouchableOpacity onPress={() => movieClicked(item)}>
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )} keyExtractor={(item, index) => index.toString()}/>
            </ScrollView>
        </View>
    );
}

MovieList.navigationOptions = screenProps => ({
    title: '',
    headerStyle: {
        backgroundColor: '#282C35',
        shadowOpacity: 0,
    },
    headerTintColor: 'white',
    shadowColor: 'transparent',
    headerRight: (
        <TouchableOpacity onPress={() => screenProps.navigation.navigate('Edit', {movie: screenProps.navigation.navigate("Edit", {movie: {title: '', description: ''}})}) } >
            <Image source={require('../assets/plusWhite.png')} style={{width: 25, height: 25, right: 20 }} />
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#282C35',
    },
    item: {
        flex: 1,
        padding: 10,
        height: 50,
        backgroundColor: '#282C35',
        borderWidth: 0.5,
        borderColor: 'white',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        marginLeft: 30,
    },
    itemText: {
        color: 'white',
        fontSize: 24
    },
    back: {
        flex: 1,
        backgroundColor: '#282C35',
    },
    Heading: {
        color: 'white',
        fontWeight: '800',
        fontSize: 38,
        marginTop: 10,
        borderColor: 'white',
        left: 30
    }
})