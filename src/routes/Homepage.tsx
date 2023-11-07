import React from 'react';
import Header from './Header';

const Homepage = () => {
    return (
        <div className="page">
            <Header/>
            <div className="homepage-wrapper">
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
        </div>
    );
}

export default Homepage;