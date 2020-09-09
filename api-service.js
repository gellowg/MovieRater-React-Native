export class API {
    static getMovies() {
        return fetch('http://movie-rater-geonitic.herokuapp.com/api/movies/',{
            method: 'GET',
            headers: {
                'Authorization': `Token 46d2c6b4e677b7dcaac438ca14e443f137a5632a`
            }
        })
            .catch(error => console.log(error))
    }

    static saveMovie(movie_id, title, description) {
        return fetch(`http://movie-rater-geonitic.herokuapp.com/api/movies/${movie_id}/`,{
            method: 'PUT',
            headers: {
                'Authorization': `Token 46d2c6b4e677b7dcaac438ca14e443f137a5632a`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: title, description: description})
        })
            .catch(error => console.log(error))
    }

    static rateMovie(movie_id, rate) {
        return fetch(`https://movie-rater-geonitic.herokuapp.com/api/movies/${movie_id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token 46d2c6b4e677b7dcaac438ca14e443f137a5632a`
            },
            body: JSON.stringify( {stars: rate} )
        })
            .then(resp => resp.json())
            .catch( error => console.log(error))
    }

    static getSpecificMovie(movie_id) {
        return fetch(`http://movie-rater-geonitic.herokuapp.com/api/movies/${movie_id}/`,{
            method: 'GET',
            headers: {
                'Authorization': `Token 46d2c6b4e677b7dcaac438ca14e443f137a5632a`
            }
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }
}