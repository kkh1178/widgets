import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Convert = ({language, text}) => {
    const [translated, setTranslated] = useState('');
    const [debouncedText, setDebounceText] = useState(text);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceText(text);
        }, 750);
        return () => {
            clearTimeout(timerId);
        }
    }, [text])

    useEffect(() => {
        const doTranslation = async () => {
            const {data} = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                params: {
                    q: debouncedText,
                    target: language.value,
                    key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                }
            });
            // google has two datas
            setTranslated(data.data.translations[0].translatedText)
        };
        // console.log("new lang or text");
        doTranslation();
    }, [language, debouncedText]); 

    return (
        <div>
            <h1 className="ui header">{translated}</h1>
        </div>
    )
};

export default Convert;