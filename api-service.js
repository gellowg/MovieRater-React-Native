import { AsyncStorage, Alert } from 'react-native';
import React, { useEffect } from 'react';



export class API {

    static getMovies(token) {
        return fetch('http://movie-rater-geonitic.herokuapp.com/api/movies/',{
            method: 'GET',
            headers: {
                'Authorization': `Token a73bba60eb802d7ea2bc4009296ac9752aac72ce`
            }
        })
            // Dont add this .then(resp => resp.json()) here, add it after the API request.
            .then(console.log('This is the token at api ', token))
            .catch(error => console.log(error))
    }

    static saveMovie(movie_id, title, description, token) {
        return fetch(`http://movie-rater-geonitic.herokuapp.com/api/movies/${movie_id}/`,{
            method: 'PUT',
            headers: {
                'Authorization': `Token a73bba60eb802d7ea2bc4009296ac9752aac72ce`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: title, description: description})
        })
            .catch(error => console.log(error))
    }

    static rateMovie(movie_id, rate, token) {
        return fetch(`https://movie-rater-geonitic.herokuapp.com/api/movies/${movie_id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token a73bba60eb802d7ea2bc4009296ac9752aac72ce`
            },
            body: JSON.stringify( {stars: rate} )
        })
            .then(resp => resp.json())
            .catch( error => console.log(error))
    }

    static getSpecificMovie(movie_id, token) {
        return fetch(`http://movie-rater-geonitic.herokuapp.com/api/movies/${movie_id}/`,{
            method: 'GET',
            headers: {
                'Authorization': `Token a73bba60eb802d7ea2bc4009296ac9752aac72ce`
            }
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static deleteMovie(movie_id, token) {
        return fetch(`http://movie-rater-geonitic.herokuapp.com/api/movies/${movie_id}/`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Token a73bba60eb802d7ea2bc4009296ac9752aac72ce`
            }
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static addMovie(title, description, token) {
        return fetch(`http://movie-rater-geonitic.herokuapp.com/api/movies/`,{
            method: 'POST',
            headers: {
                'Authorization': `Token a73bba60eb802d7ea2bc4009296ac9752aac72ce`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: title, description: description})
        })
            .then( resp => resp.json())
            .catch(error => console.log(error))
    }

    static authLogin(username, password) {
        return fetch(`http://movie-rater-geonitic.herokuapp.com/auth/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password})

        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

}