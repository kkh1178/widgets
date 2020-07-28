// Adding useState from the react library
import React, {useState} from 'react';

const Accordion = ({items}) => {

    // useState is a function that will allow you to use state in a functional component
    // This is not actually creating an array. We are setting the first element of useState 
    // to activeIndex (useState[0]) and the second to setActiveIndex (useState[1]).
    // This is array destructuring.
    // 
    // useState will return an array of two elements. Active index is assigned to initial state and we 
    // can update activeIndex using setActiveIndex 
    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick =(index) => {
        setActiveIndex(index);
    };

    const renderedItems = items.map((item, index) => {

        // if the index is item we are iterating over is equal to the activeIndex piece of state
        // if it is, assign a value of "active" to it. Otherwise assign an empty string.

        const active = index === activeIndex ? "active": '';

        return (
        <React.Fragment key={item.title}>
            {/* The className will be determined by active function above */}
            <div className={`title ${active}`}
            // Arrow function is added to onClick because if we don't, then onClick will run immediately when
            // the page is rendered which is not what we want. We only want onClick to run when it is clicked.
                onClick={()=>onTitleClick(index)}
            >

                <i className="dropdown icon"></i>
                {item.title}
            </div>
            <div className={`content ${active}`}>
                <p>{item.content}</p>
            </div>
        </React.Fragment>
        
        )
    });

return (
    <div className="ui styled accordion">
        {renderedItems}
    </div>
)
}

export default Accordion;