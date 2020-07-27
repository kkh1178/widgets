import React, {userState, useState} from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';

const options = [
    {
        label: 'Afrikaans',
        value: 'af'
    },
    {
        label: 'Arabic',
        value: 'ar'
    },
    {
        label: 'Urdu',
        value: 'ur'
    },
    {
        label: 'Scots Gaelic',
        value: 'gd'
    },
    {
        label: 'Dutch',
        value: 'n1'
    }, 
    {
        label: 'Swahili',
        value: 'sw'
    }
];

const Translate = () => {
    const [language, setLanguage] = useState(options[0]);
    const [text, setText] = useState('');

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Text</label>
                    <input value={text} onChange={(event) => setText(event.target.value)}></input>
                </div>
            </div>
            <Dropdown 
            selected={language} 
            onSelectedChange={setLanguage}
            options={options}
            label="Select a Language"
            />
            <hr />
            <h3 className="ui header">Output</h3>
            <Convert text={text} language={language}/>
        </div>
    );
};
export default Translate;
