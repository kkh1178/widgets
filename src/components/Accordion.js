import React from 'react';

const Accordion = ({items}) => {

    const onTitleClick =(index) => {
        console.log("Title clicked", index);
    }

    const renderedItems = items.map((items, index) => {
        return (
        <React.Fragment key={items.title}>
            <div className="title active"
            // Arrow function is added to onClick because if we don't, then onClick will run immediately when
            // the page is rendered which is not what we want. We only want onClick to run when it is clicked.
                onClick={()=>onTitleClick(index)}
            >

                <i className="dropdown icon"></i>
                {items.title}
            </div>
            <div className="content active">
                <p>{items.content}</p>
            </div>
        </React.Fragment>
        
        )
    });

return <div className="ui styled accordion">{renderedItems}</div>
}

export default Accordion;