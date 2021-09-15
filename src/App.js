import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Sidenav from './components/Sidenav';
import FindJobs from './pages/FindJobs';
import FindPeople from './pages/FindPeople';
import './styles/main.sass';

const App = () => (
  <Router>
    <main>
      <Sidenav />
      <Route exact path="/" component={FindJobs} />
      <Route exact path="/people" component={FindPeople} />
    </main>
  </Router>
);

export default App;
