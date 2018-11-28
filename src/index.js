import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import ThemeSwitcher from './ThemeSwitcher'
//import Lane from './Lane'
//import Card from './Card'
//import Macushka from './Macushka'
import * as serviceWorker from './serviceWorker';


//ReactDOM.render(<Macushka />, document.getElementById('Macushka'));
ReactDOM.render(<App />, document.getElementById('root'));
/*ReactDOM.render(<ThemeSwitcher />, document.getElementById('knopki'));*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
