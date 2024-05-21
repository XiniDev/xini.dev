import React from 'react'
import Hero from '@components/Hero';
import About from '@components/About';
import Projects from '@components/Projects';
import Contact from '@components/Contact';

const Home: React.FC = (): JSX.Element => {
    return (
        <div>
            <Hero />
            <About />
            <Projects />
            <Contact />
        </div>
    );
};

export default Home
