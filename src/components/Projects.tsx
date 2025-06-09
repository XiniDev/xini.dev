import React from 'react';
import wsmathLogo from '@assets/images/wsmathLogo.png';
import overthrowSynthetica from '@assets/images/overthrowSynthetica.png';
import goldenGun from '@assets/images/goldenGun.png';

const projects = [
    {
        title: 'WSMath',
        description: 'WS Math is an online portfolio for a professional math tutor specializing in IB, A-levels, and IGCSE curricula. The website showcases the tutor\'s expertise, teaching philosophy, and success stories. It offers detailed information on the subjects covered, tutoring approach, and student testimonials.',
        image: wsmathLogo,
        link: 'https://www.wsmath.com/'
    },
    {
        title: 'Overthrow Synthetica',
        description: 'Overthrow Synthetica is a game jam demo created in collaboration with Codethulu over a span of two weeks for the Warwick Game Dev Society. This project showcases advanced game development techniques using ThreeJS and WebGL, highlighting the team\'s ability to quickly prototype and develop a functional game with unique mechanics and creativity.',
        image: overthrowSynthetica,
        link: 'https://github.com/BlueTentProductions/overthrow-synthetica'
    },
    {
        title: 'Golden Gun (ECS Platformer demo)',
        description: 'Golden Gun is a platformer demo used to test the Entity-Component-System (ECS) architecture. Developed in C++ and utilizing SDL2, the game showcases responsive platformer controls. The ECS system allows for flexible and efficient management of game entities, giving me practice to create games in this form in the future.',
        image: goldenGun,
        link: 'https://github.com/XiniDev/Golden-Gun'
    },
  ];

const Projects: React.FC = ():JSX.Element => {
    return (
        <section id="projects" className="py-20 bg-gray-100 text-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
                <div className="grid lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                    <div className="overflow-hidden rounded-lg mb-4">
                        <img src={project.image} alt={project.title} className="w-full h-48 object-cover object-center"/>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <a href={project.link} className="text-blue-500 hover:text-blue-700 transition duration-300" target="_blank" rel="noopener noreferrer">View Project</a>
                    </div>
                ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;