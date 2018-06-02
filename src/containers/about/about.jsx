import React from 'react';
import Header from '../header';

const About = (props) => (
    <div>
        <Header location={props.location} />
        <h1>About Page</h1>
        <p>Did you get here via Redux?</p>
    </div>
);

export default About;
