import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import List from './list/List';
import Main from './main/Main';
import Plane from './plane/Plane';
import Chart from './chart/Chart';

const router = createBrowserRouter([
  {path: '',
    element: <Main />,
  },
  {path: '/list',
    element: <List />,
  },
  {path: '/plane/:id',
    element: <Plane />,
  },
  {path: '/chart',
    element: <Chart />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


reportWebVitals();
