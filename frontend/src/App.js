import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Header from './components/Header/Header';
import ProviderRegistration from './components/Registration/ProviderRegistration';
import WelcomePage from './components/MainLayout/WelcomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={Header}/>
        <Route exact path="/provider-registration" component={ProviderRegistration} />
        <Route exact path="/" component={WelcomePage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
