import React from 'react';
import ReactDOM, {Container} from 'react-dom/client';
import {App} from './App';
import {BrowserRouter} from 'react-router';


const root = ReactDOM.createRoot(
    document.getElementById('root') as Container
);

root.render(<BrowserRouter><App /></BrowserRouter>);
