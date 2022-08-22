import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReportApp } from './reports/report' 
import 'bootstrap/dist/css/bootstrap.css';
import GetDataFromExcelJusTInput from './GetDataFromExcelJusTInput';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GetDataFromExcelJusTInput />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
