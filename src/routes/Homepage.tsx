import React from 'react';
import Header from './Header';

const Homepage = () => {
    return (
        <div className="homepage">
            <Header/>
            <div className="homepage-titlediv">
                <div className="homepage-title">
                    XINI
                </div>
                <div className="homepage-subtitle">
                    <hr className="homepage-titleline"/>
                    Designer • Developer • Creator
                </div>
            </div>
        </div>
    );
}

export default Homepage;