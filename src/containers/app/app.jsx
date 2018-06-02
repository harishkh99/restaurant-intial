import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../home';
import About from '../about';
import Location from '../location'
const App = () => (
    <div>
        <main>
            <Route exact path="/" component={Location} />
            <Route exact path="/restaurants" component={Home} />
            <Route exact path="/about-us" component={About} />
        </main>
    </div>
);

export default App;
