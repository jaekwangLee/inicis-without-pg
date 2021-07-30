import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import reportWebVitals from './reportWebVitals';
import Loader from '@/components/loader';

ReactDOM.render(
    <BrowserRouter>
        <Suspense fallback={<Loader />}>
            <App />
        </Suspense>
    </BrowserRouter>,
    document.getElementById('root'),
);
reportWebVitals();
