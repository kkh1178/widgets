import React from 'react';


const Link = ({className, href, children}) => {
    
    const onClick = (event) => {
        // boolean properties to determine if a specific key is held down on mac or windows;
        // If either of those cases are true, return early
        if (event.metaKey || event.ctrlKey) {
            return;
        }   
        event.preventDefault();
        window.history.pushState({}, '', href);
        // Communicates to the route componenets that the url just changed
        const navEvent = new PopStateEvent ('popstate');
        window.dispatchEvent(navEvent);
    }

    return (
        <a onClick={onClick} className={className} href={href}>{children}</a>
        );
}

export default Link;
