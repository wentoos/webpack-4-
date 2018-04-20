import React from 'react';
import ReactDOM from 'react-dom'
import './css.css'
import { Hello } from "./components/Hello";

ReactDOM.render(<Hello compiler="TypesScript" framework="React" />,document.getElementById('app'));
