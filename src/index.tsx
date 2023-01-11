import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Spin } from 'antd';
import App from './App';
import './index.css';

const LoadingScreen = (): React.ReactElement => {
  return (
    <div className="loading-container">
      <Spin />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Router basename={process.env.REACT_APP_BASENAME}>
      <Suspense fallback={<LoadingScreen />}>
        <App />
      </Suspense>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();