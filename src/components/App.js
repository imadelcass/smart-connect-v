import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React from 'react';
import Auth from './Auth';
import Header from './Header';
import Signup from './Signup';
import Profile from './Profile';
import UserProfile from './UserProfile';
import Message from './Message';
import Home from './Home';
import { NameProvider } from './context';
import { EmailProvider } from './EmailContext';
import './style/App.css';
import { UserProvider } from './UserContext';
import { CurrentUserProvider } from './CurrentUserContext';
import Suggestion from './Suggestion';
import { DocumentContextProvider } from './DocumentContext';
function App() {
  return (
    <DocumentContextProvider>
    <CurrentUserProvider>
      <UserProvider>
        <NameProvider>
          <EmailProvider>
              <Router>
                <div className='App'>
                  <Switch>
                    <Route path='/message'>
                      <Message />
                    </Route>
                    <Route path='/profile'>
                      <Profile />
                    </Route>
                    <Route path='/suggestion'>
                      <Suggestion />
                    </Route>
                    <Route path='/home'>
                      <Header />
                      <Home />
                    </Route>
                    <Route path='/login'>
                      <Header />
                      <Auth />
                    </Route>
                    <Route path='/signup'>
                      <Header />
                      <Signup />
                    </Route>
                    <Route path='/users/:id'>
                      <UserProfile />
                    </Route>
                    <Route path='/'>
                      <Header />
                      <Signup />
                    </Route>
                  </Switch>
                </div>
              </Router>
          </EmailProvider>
        </NameProvider>
      </UserProvider>
    </CurrentUserProvider>
    </DocumentContextProvider>
  );
}
export default App;
