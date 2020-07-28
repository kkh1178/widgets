import React from 'react';
import Link from './Link';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            {/* We are adding the Link component and not an <a> tag because we are trying to
            prevent excessive network traffic whenever we want to move to a new link. */}
            <Link href ="/" className='item'>
                Accordion
            </Link>
            <Link href ="/list" className='item'>
                Search
            </Link>
            <Link href ="/dropdown" className='item'>
                Dropdown
            </Link>
            <Link href ="/translate" className='item'>
                Translate
            </Link>
        </div>
    )
};

export default Header