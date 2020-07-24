import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {

    const [term, setTerm] = useState('');
    const [results, setResults] =useState([]);

    console.log(results)

    // First argument is always a function in useEffect. We have to tell useEffect 
    // when we want it to execute: an empty array, an array with elements, or nothing.
    // Those are the only three options. 
    
    // Empty array [] = run at initial render, nothing = run at initial render and every rerender
    // [term, etc] = run at initial rerender and run after every rerender if data has changed 
    // since last rerender

    // async and await will not work in useEffect. you can set async to a variable or 
    // (async () => {(await axios.get("someurl")})(); OR you can make use of promise

    useEffect(()=> {
        
        const searchWiki = async() => {
            const {data}= await axios.get("https://en.wikipedia.org/w/api.php", {
                params: {
                    action: "query",
                    list: 'search',
                    origin: "*",
                    format: 'json',
                    srsearch: term,
                }
            });
            // We don't need the entire query, just the results
            setResults(data.query.search);
        };
        // If term has some characters inside of it, we will search.
        if (term) {
            searchWiki();
        }
        
    }, [term])

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter search term: </label>
                    <input 
                        className="input"
                        value={term}
                        onChange={event => setTerm(event.target.value)}
                        />

                </div>
            </div>
        </div>
    )
}

export default Search;