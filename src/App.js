import React, {useState} from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown'

const items = [
    {
        title: 'What is React?',
        content: 'React is a front end javascript framework.'
    },
    {
        title: 'What use React?',
        content: 'React is a favorite JS library among engineers.'
    },
    {
        title: 'How do you use React?',
        content: 'You use React by creating components.'
    }
];

const options = [
    {
        label: 'The Color Red', 
        value: 'red'
    },
    {
        label: 'The Color Green',
        value: 'green'
    },
    {
        label: 'A Shade of Blue',
        value: 'blue'
    }
];

export default () => {
const [selected, setSelected] = useState(options[0])
const [showDropdown, setShowDropdown] = useState(true);

    return (
        
        <div>
            {/* <Accordion  items={items}/>
             */}
             {/* Here we are toggling the existance of the dropdown menu */}
            <button onClick={() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button>
            { showDropdown ? <Dropdown 
                selected={selected} 
                onSelectedChange={setSelected}
                options={options}

                /> : null
            }
           
        </div>
        )
};