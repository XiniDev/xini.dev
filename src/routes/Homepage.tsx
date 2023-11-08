import React, { useEffect, useState } from 'react';
import Header from './Header';

import Xini_Icon_White from '../images/xini-icon-white.png';

const Homepage = () => {
    const [fadeDivs, setFadeDivs] = useState([false, false, false]);

    const [hideDivs, setHideDivs] = useState([false, true, true]);

    useEffect(() => {
        const timeout1 = setTimeout(() => {
            setFadeDivs((prev) => [true, prev[1], prev[2]]);
        }, 300);
        const timeout2 = setTimeout(() => {
            setFadeDivs((prev) => [prev[0], true, prev[2]]);
        }, 1200);
        const timeout3 = setTimeout(() => {
            setFadeDivs((prev) => [prev[0], prev[1], true]);
        }, 2000);
      
        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const thresholds = [400, 800, 1200];

            if (window.scrollY < thresholds[0]) {
                // intro
                setHideDivs([false, true, true]);
            } else if (window.scrollY < thresholds[1]) {
                // about me
                setHideDivs([true, false, true]);
            } else if (window.scrollY < thresholds[2]) {
                // my projects
                setHideDivs([true, true, false]);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="page">
            <Header/>
            <div className="homepage-container">
                <div className="homepage-blackbkg"></div>
                <div className={`homepage-background ${fadeDivs[2] ? 'homepage-fade-bkg visible' : 'homepage-fade-bkg'}`}></div>
                <div className="homepage-intro-container">
                    <div className="homepage-titlediv">
                        <div className={`homepage-title ${fadeDivs[0] ? (hideDivs[0] ? 'homepage-fade' : 'homepage-fade visible') : 'homepage-fade'}`}>
                            XINI
                        </div>
                        <div className={`homepage-subtitle ${fadeDivs[1] ? (hideDivs[0] ? 'homepage-fade' : 'homepage-fade visible') : 'homepage-fade'}`}>
                            <hr/>
                            Designer • Developer • Creator
                            <hr/>
                        </div>
                    </div>
                </div>
                <div className={`panel-title ${hideDivs[1] ? '' : 'visible'}`}>
                    ABOUT ME
                </div>
                <div className={`panel-container ${hideDivs[1] ? '' : 'visible'}`}>
                    <div className="about-img">
                        <img src={Xini_Icon_White} alt="About Img"/>
                    </div>
                    <div className="about-intro">
                        Welcome to xini.dev! This is Anthony :&#41;
                    </div>
                    <div className="about-description">
                        I am a software developer, and a computer scientist graduate from the University of Warwick.
                        I have a deep passion for coding, especially for game development.
                    </div>
                    <div className="about-remarks">
                        Join me and step towards the future with creativity and innovation.
                    </div>
                </div>
                <div className={`panel-title ${hideDivs[2] ? '' : 'visible'}`}>
                    MY PROJECTS
                </div>
                <div className={`panel-container ${hideDivs[2] ? '' : 'visible'}`}>
                </div>
            </div>
        </div>
    );
}

export default Homepage;