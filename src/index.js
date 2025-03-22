import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RepoProvider } from "./context/RepoContext";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RepoProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </RepoProvider>
);
