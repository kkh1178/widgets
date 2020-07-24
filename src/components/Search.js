import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {


    const [term, setTerm] = useState('programming');
    // setting the useState for debounced to term so we don't have to change it twice later.
    const [debouncedTerm, setDebouncedTerm] = useState(term)
    const [results, setResults] =useState([]);

    // useEffect NOTES: First argument is always a function in useEffect. We have to tell useEffect 
    // when we want it to execute: an empty array, an array with elements, or nothing.
    // Those are the only three options. 
    
    // Empty array [] = run at initial render, nothing = run at initial render and every rerender
    // [term, etc] = run at initial rerender and run after every rerender if data has changed 
    // since last rerender

    // userEffect for debounced
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(term)
        }, 1000);

        return () => {
            clearTimeout(timerId)
        };

    }, [term]);

    console.log(results)

    useEffect(()=> {
        
        const searchWiki = async() => {

            // async and await will not work in useEffect. you can set async to a variable or 
            // (async () => {(await axios.get("someurl")})(); OR you can make use of promise
            const {data}= await axios.get("https://en.wikipedia.org/w/api.php", {
                params: {
                    action: "query",
                    list: 'search',
                    origin: "*",
                    format: 'json',
                    srsearch: debouncedTerm,
                }
            });
            // We don't need the entire query, just the results
            setResults(data.query.search);
        };
        searchWiki();
        
        // SEE BELOW NOTES: We are getting an error: "React Hook useEffect has a missing dependency: 'results.length'. 
        // Either include it or remove the dependency array"
        // The [term] controls when the query argument gets executed. Adding results.length after term 
        // will cause a bug that will query the api 2x. This is because our initial 
        // state has the length of the results as 0. When the api returns results initially, the length changes which
        //  causes the component to rerender a second time. So two api requests are sent. this is not what we want.
        // Fixing this issue by using debouncedTerm.
    }, [debouncedTerm]);



    const renderedResults = results.map((result) => {
        return (
            <div className="item" key={result.pageid}>
                <div className="right floated content">
                    <a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>Go</a>
                </div>
                <div className="content">
                    <div className ="header">
                        {result.title}
                    </div>
                    {/* This could cause an XSS attack where we cross site scripting attack from an unknown source; 
                    Malicious actors could potentially use this to upload some javascript or html
                    that you don't want on your page. You should make sure that you trust data you are getting.
                     */}
                    <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>
                    
                </div>
            </div>
        )
    })

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
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    )
}

export default Search;




// NOTES: This is the code that we had to delete to remove the react hook missing dependency error
// If this is the initial component rendering and we don't have any resuls yet then search the set
        // term immediately.
        // if (term && !results.length) {
        //     searchWiki();
        // } else {
            // ELSE: If term has some characters inside of it, we will search after 1000 ms have passed. 
            // setTimeout actually outputs a unique id number that is assigned to the timer we started. 
            // We can use that id number to cancel the timer if we want to.
            // const timeoutId = setTimeout(() => {
            //     if (term) {
            //         searchWiki();
            //     }
            // }, 1000);
            //  We are going to cancel the time if the user is still typing using the useEffect cleanup function.
        //     return () => {
        //         clearTimeout(timeoutId);
        //     };
        // }