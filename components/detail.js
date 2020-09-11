import React, { useState, useEffect } from 'react';
import { Image, StatusBar, TouchableOpacity, Alert, Modal, StyleSheet, Text, TouchableHighlight, View, TouchableWithoutFeedback } from 'react-native';
import {API} from "../api-service";


export default function Detail(props) {

    const movie = props.navigation.getParam('movie', null)

    const [updateStars, setUpdateStars] = useState(movie.avg_rating)

    const [modalVisible, setModalVisible] = useState(false);


    const [starSelection, setStarSelection] = useState(0)
    const [sing, setSing] = useState('stars')

    const rateClicked = (id, rate) => evt => {
        API.rateMovie(id, rate)
            .then(Alert.alert(`Rating Updated to ${starSelection} ${sing}.`))
            .then(() => getDetails())
            .then(setModalVisible(false))
    }

    const getDetails = () => {
        API.getSpecificMovie(movie.id)
            .then(resp => props.navigation.navigate('Detail', {movie: resp}))
    }


    useEffect(() => {

    }, [])



    return (
<View style={styles.page}>

    <View style={styles.page} >
        <StatusBar barStyle={'light-content'} />
        <Text style={styles.Heading} >{movie.title}</Text>
        <Text>{movie.json}</Text>
        <View style={styles.starContainer} >
            { movie.avg_rating > 0 ? <Image source={require('../assets/yellowFillStar.png')} style={{height: 30, width: 30}}/> : <Image source={require('../assets/whiteOutlineStar.png')} style={{height: 30, width: 30}}/> }
            { movie.avg_rating > 1 ? <Image source={require('../assets/yellowFillStar.png')} style={{height: 30, width: 30}}/> : <Image source={require('../assets/whiteOutlineStar.png')} style={{height: 30, width: 30}}/> }
            { movie.avg_rating > 2 ? <Image source={require('../assets/yellowFillStar.png')} style={{height: 30, width: 30}}/> : <Image source={require('../assets/whiteOutlineStar.png')} style={{height: 30, width: 30}}/> }
            { movie.avg_rating > 3 ? <Image source={require('../assets/yellowFillStar.png')} style={{height: 30, width: 30}}/> : <Image source={require('../assets/whiteOutlineStar.png')} style={{height: 30, width: 30}}/> }
            { movie.avg_rating > 4 ? <Image source={require('../assets/yellowFillStar.png')} style={{height: 30, width: 30}}/> : <Image source={require('../assets/whiteOutlineStar.png')} style={{height: 30, width: 30}}/> }
            <Text style={styles.ratingNumber}>({movie.no_of_ratings})</Text>
        </View>
        <Text style={styles.description}>{movie.description}</Text>
        <TouchableOpacity >
            <Text style={styles.button} onPress={() => {
                setModalVisible(true);
            }} >Rate This</Text></TouchableOpacity>

    </View>

        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Rate {movie.title}</Text>
                        <View style={styles.starContainerModal} >
                            <TouchableWithoutFeedback onPress={() => setStarSelection(1)} >{ starSelection > 0 ? <Image source={require('../assets/yellowFillStar.png')} style={{height: 40, width: 40}}/> : <Image source={require('../assets/whiteOutlineStar.png')} style={{height: 40, width: 40}}/> }</TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => setStarSelection(2)} >{ starSelection > 1 ? <Image source={require('../assets/yellowFillStar.png')} style={{height: 40, width: 40}}/> : <Image source={require('../assets/whiteOutlineStar.png')} style={{height: 40, width: 40}}/> }</TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => setStarSelection(3)} >{ starSelection > 2 ? <Image source={require('../assets/yellowFillStar.png')} style={{height: 40, width: 40}}/> : <Image source={require('../assets/whiteOutlineStar.png')} style={{height: 40, width: 40}}/> }</TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => setStarSelection(4)} >{ starSelection > 3 ? <Image source={require('../assets/yellowFillStar.png')} style={{height: 40, width: 40}}/> : <Image source={require('../assets/whiteOutlineStar.png')} style={{height: 40, width: 40}}/> }</TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => setStarSelection(5)} >{ starSelection > 4 ? <Image source={require('../assets/yellowFillStar.png')} style={{height: 40, width: 40}}/> : <Image source={require('../assets/whiteOutlineStar.png')} style={{height: 40, width: 40}}/> }</TouchableWithoutFeedback>
                        </View>
                        <Text>
                        <TouchableOpacity onPress={rateClicked(movie.id, starSelection)}>
                            <Text style={styles.modalButton}>Save</Text>
                        </TouchableOpacity>
                            <Text>    </Text>
                        <TouchableOpacity onPress={() => {setModalVisible(!modalVisible);}}>
                            <Text style={styles.modalButton}>Cancel</Text>
                        </TouchableOpacity>
                        </Text>
                    </View>
                </View>
            </Modal>


        </View>


    </View>

    )
}

Detail.navigationOptions = screenProps => ({
    title: '',
    headerStyle: {
        backgroundColor: '#282C35',
        shadowOpacity: 0,
    },
    headerTintColor: 'white',
    shadowColor: 'transparent',
    headerRight: (
        <TouchableOpacity onPress={() => screenProps.navigation.navigate('Edit', {movie: screenProps.navigation.getParam("movie")}) } >
            <Image source={require('../assets/editWhite.png')} style={{width: 25, height: 25, right: 20 }} />
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row',
        marginLeft: 30,
        marginTop: 5
    },
    starContainerModal: {
        flexDirection: 'row',
        marginBottom: 20.
    },
    page: {
        flex: 1,
        backgroundColor: '#282C35'
    },
    Heading: {
        color: 'white',
        fontWeight: '800',
        marginLeft: 30,
        fontSize: 38,
        marginTop: 35,
    },
    description: {
        color: 'white',
        fontSize: 15,
        marginLeft: 30,
        marginTop: 10
    },
    subHeading: {
        color: 'white',
        fontWeight: '800',
        marginLeft: 30,
        fontSize: 15,
        marginTop: 20
    },
    ratingNumber: {
        color: 'white',
        fontWeight: '800',
        fontSize: 15,
        marginLeft: 5,
        marginTop: 12.5
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
    modalButton: {
        padding: 20,
        backgroundColor: '#007aff',
        color: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        width: 120,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'grey',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: '800',
        color: 'white',
        fontSize: 20
    }

})