import React from 'react';
import { Route } from 'react-router';
import { Container } from 'semantic-ui-react';
import Errors from './commonFiles/Errors';
import FindOpponent from './Game/FindOpponent';
import Game from './Game/Game';
import Winner from './Game/Winner';
import HomePage from './layout/HomePage';
import NavBar from './layout/NavBar';
import LoginForm from './Users/LoginForm';
import RegisterForm from './Users/RegisterForm';
import UserProfile from './Users/UserProfile';

function App() {

  return (
    <div>
      <Route exact path='/' component={HomePage} />     
      <Route
        path={'/(.+)'}
        render={() => (
          <>
             <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route path='/login' component={LoginForm}/> 
              <Route path='/register' component={RegisterForm} />
              <Route path='/userProfile' component={UserProfile} />
              <Route path='/findOpponent' component={FindOpponent} />
              <Route path='/game' component={Game} />
              <Route path='/errors' component={Errors} />
              <Route path='/winner' component={Winner} />
            </Container>
          </>
        )}
      />
    </div>
  );
}

export default App;