import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "./index.css";
import { Provider } from 'react-redux';
import store from './redux/store.js';
import {Toaster} from "react-hot-toast";
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="318907440561-ft0595lqrgguqgiv30pte111v6jom0bs.apps.googleusercontent.com">
    <Provider store={store}>
      <Toaster />
      <App />
    </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  
)
