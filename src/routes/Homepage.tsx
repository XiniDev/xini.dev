import React from 'react';
import Header from './Header';

const Homepage = () => {
    return (
        <div className="homepage">
            <Header/>
            <div className="homepage__titles">
                <div className="homepage__titles__title">
                    XINI
                </div>
                <div className="homepage__titles__subtitle">
                    <hr className="homepage__titles__subtitle__line"/>
                    Designer • Developer • Creator
                </div>
            </div>
        </div>
    );
}

export default Homepage;