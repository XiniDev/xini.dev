import React from 'react';
import profileImage from '@assets/images/profileImage.png';

const About: React.FC = (): JSX.Element => {
    return (
        <section id="about" className="py-20 bg-white text-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-6 text-center">About Me</h2>
                <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/4 mb-8 md:mb-0">
                    <img src={profileImage} alt="Xini" className="rounded-lg shadow-lg" />
                </div>
                <div className="md:w-3/4 md:pl-12">
                    <p className="text-lg leading-relaxed">
                        Hey there! I'm Xini. I'm deeply passionate about coding, AI, and game development. There's nothing more exciting to me than turning my wildest imaginations into reality with code. I studied BSc Computer Science at the University of Warwick and MSc Artificial Intelligence at the University of St Andrews where I got to work on a variety of projects with some amazing people.
                    </p>
                    <p className="text-lg leading-relaxed mt-4">
                        Beyond coding, I'm really into games, art, and world-building - these interests constantly spark new ideas and keep me inspired. I'm always eager to learn new things and dive into the latest tech and design trends.
                    </p>
                    <p className="text-lg leading-relaxed mt-4">
                        If you're excited about creating something awesome, let's team up and make it happen!
                    </p>
                </div>
                </div>
            </div>
        </section>
    );
};

export default About;