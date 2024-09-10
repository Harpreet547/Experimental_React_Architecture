import React from 'react';
import Demo from './components/Demo';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DropdownDemo from './components/DropdownDemo/DropdownDemo';
import FormDemo from './components/FormDemo/FrormDemo';
import Growthbook from './components/Growthbook/Growthbook';
import ListViewDemo from './components/ListViewDemo/ListViewDemo';
import SagaReplacement from './components/SagaReplacement/SagaReplacement';

const router = createBrowserRouter([{
  path: '/',
  element: <Demo />,
}, {
  path: '/dropdown',
  element: <DropdownDemo />
}, {
  path: '/form',
  element: <FormDemo />
}, {
  path: '/growthbook',
  element: <Growthbook />
}, {
  path: '/listview',
  element: <ListViewDemo />
}, {
  path: '/sagaReplacement',
  element: <SagaReplacement />
}]);

const App: React.FC = (): React.ReactElement => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
