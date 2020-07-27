import React, {useState, useEffect, useRef} from 'react';



const Dropdown = ({options, selected, onSelectedChange}) => {
    // To toggle the menu as open or closed
    const [open, setOpen] = useState(false);
    const ref = useRef();

    // Event handler to listen for a click anywhere on the body of the webpage.
    useEffect(() => {

        const onBodyClick = (event) => {
            // console.log(event.target)

            // ref.current.contains will look and see if the element we clicked on is insed of the component
            // if it is inside, then return early; otherwise do a setOpen with false.

            // If we toggle being able to see or not see the dropdown menu, ref.current will turn to null. Contains can't read
            // ref.current if its null. This is caused because we have removed elements from the DOM. We need to turn off this
            // event listener.
            if(ref.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        }
        // This event listener will get called first!
        document.body.addEventListener('click', onBodyClick)
        
        return () => {
            // If the dropdown is removed from the DOM, react will automaticallly call our cleanup function and it will remove the 
            // eventlistner looking for that click
            document.body.removeEventListener('click', onBodyClick)
        }
        
    }, []); // [] means only run ONCE when we first render our component to the screen

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
                onClick={() => {
                    
                    onSelectedChange(option);
                }}
                >
                {option.label}
            </div>
        );
    });

    // console.log(ref.current)

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">Select a Color</label>
            </div>
            <div 
                onClick={()=> {
                    // if we leave setOpen to the opposite of whatever open is set to and when its initiated, its set to false.
                    // That is why our menu stays open whenever we click on an item.
                    setOpen(!open);
                    
                    } 
                    }
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