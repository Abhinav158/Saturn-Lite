import React, { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

// useEffect accepts a callback function and an empty dependency array when we want to call it at the start

const API_URL = 'http://www.omdbapi.com?apikey=c68218a8';

// Implement a function to search for movies - make it Async since we need to wait for the program to retrieve the data
// This function accepts a title and then performs the search based on it

const App = () => {

    // useState to get al the movies, default being an empty array
    const [movies, setMovies] = useState([]);

    //State to implement the Search functionality 
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        // console.log(data.Search)
        setMovies(data.Search); 
    }

    useEffect(()=>{
        searchMovies('Mission Impossible');
    }, []);
    return(
        <div className='app'>
            <h1> Saturn Lite </h1>
            
            <div className='search'>
                <input value={searchTerm} placeholder='Search for your favourite series...' 
                onChange={(e)=> setSearchTerm(e.target.value)}/>
                <img src={SearchIcon} alt='search-icon' onClick={()=> searchMovies(searchTerm)}/>
            </div>

            {
                movies?.length > 0 ?

                (
                    <div className='container'>
                        {
                            movies.map((movie)=> <MovieCard movie={movie}/>)
                        }
                    </div>
                ):(
                    <div className='empty'>
                        <h2> No Movies Found </h2>
                    </div>
                )
            }

            

        </div>
    )
}

export default App;