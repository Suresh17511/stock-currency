import React, {useEffect} from 'react';
import './App.css';
import {useDispatch} from 'react-redux';
import {getCoins} from './actions/coins';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import Home from './components/home/Home';
import View from './components/view/View';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoins());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Link to="/">
          <div className="header">
            <img
              src="https://www.quikieapps.com/wp-content/uploads/2018/10/QuikieAppsLogoResized-01.png.webp"
              alt="Quikieapps logo"
            />
          </div>
        </Link>
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/home" />} />
          <Route path="/home" exact component={Home} />
          <Route path="/view" exact component={View} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
