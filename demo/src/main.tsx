import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import { Provider } from 'react-redux';
import { store } from '@harpreet547/cdh';
import { FluentProvider } from '@fluentui/react-components';
import { lightTheme } from '@harpreet547/cwc';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <FluentProvider theme={lightTheme}>
        <App />
      </FluentProvider>
    </Provider>
  </React.StrictMode>,
)
