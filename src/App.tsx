import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Homepage from './routes/Homepage';
import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                  {/* <Header /> */}
                  <Routes>
                      <Route path="/" element={<Homepage />}/>
                  </Routes>
            </Router>
        </div>
    );
}

export default App;
