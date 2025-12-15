import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import Home from './pages/Home';
import Library from './pages/Library';
import Login from './pages/Login';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/library" component={Library} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </PlayerProvider>
    </AuthProvider>
  );
};

export default App;