import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './App.scss';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import MyNavbar from '../components/shared/MyNavbar/MyNavbar';
import Footer from '../components/shared/Footer/Footer';
import Home from '../components/pages/Home/Home';
import Login from '../components/pages/Login/Login';
import Register from '../components/pages/Register/Register';
import ShoppingCart from '../components/pages/ShoppingCart/ShoppingCart';
import Products from '../components/pages/Products/Products';
import Singleview from '../components/pages/Singleview/Singleview';
import fbConnection from '../helpers/data/connection';

fbConnection();
const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken()
        // save the token to the session storage
          .then((token) => sessionStorage.setItem('token', token));
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
         <BrowserRouter>
         <React.Fragment>
           <MyNavbar authed={authed}/>
           <div className="container">
             <div className="row">
               <Switch>
                 <Route path='/home' component={Home} authed={authed} />
                 <Route path='/login' component={Login} authed={authed} />
                 <Route path='/register' component={Register} />
                 <Route path='/products/:id' render={(props) => <Singleview authed={authed} {...props} />} />
                 <Route path='/products' component={Products} authed={authed} />
                 <Route path='/shoppingCart' component={ShoppingCart} authed={authed} />
                 <Redirect from="*" to="/home"/>
                 </Switch>
             </div>
           </div>
         </React.Fragment>
         </BrowserRouter>
         <Footer/>
      </div>
    );
  }
}

export default App;
