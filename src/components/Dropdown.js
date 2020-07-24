import React, {useState, useEffect} from 'react';



const Dropdown = ({options, selected, onSelectedChange}) => {
    // To toggle the menu as open or closed
    const [open, setOpen] = useState(false);

    // Event handler to listen for a click anywhere on the body of the webpage.
    useEffect(() => {
        document.body.addEventListener('click', () => {
            setOpen(false);
        })
        // only run ONCE when we first render our component to the screen
    }, []);

    // iterate through the options passed down from app
    const renderedOptions = options.map((option) => {
        // We dont need to see the option we selected in the menu twice. This will remove the
        // redundancy.
        if (option.value === selected.value) {
            return null;
        }

        return (
            <div 
                key={option.value} 
                className="item"
                onClick={() => onSelectedChange(option)}
                >
                {option.label}
            </div>
        );
    });
    return (
        <div className="ui form">
            <div className="field">
                <label className="label">Select a Color</label>
            </div>
            <div 
                onClick={()=>setOpen(!open)} 
                // if open is true then ad visible actice to the string, otherwise, 
                // add an empty string
                className={`ui selection dropdown ${open ? 'visible active': ''}`}
                >
                <i className="dropdown icon"></i>
                <div className="text">{selected.label}</div>
                <div 
                    className={`menu ${open ? 'visible transition': ''}`}
                    >
                    {renderedOptions}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;