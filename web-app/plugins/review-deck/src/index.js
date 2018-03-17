import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let obj= [{
    "content": "Hack In the North Is Best",
    "time": 29,
    "date": "03/17/2018",
    "author":"sanket"
},
    {
        "content": "Eat Code Sleep Repeat!!!!",
        "time": 29,
        "date": "03/17/2018",
        "author":"abhijeet"
    }
];

ReactDOM.render(<App data={obj}/>, document.getElementById('root'));
registerServiceWorker();
