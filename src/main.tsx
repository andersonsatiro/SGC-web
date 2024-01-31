import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import { GlobalContextProvider } from './context/GlobalContext.tsx'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Dashboard } from './routes/dashboard/Dashboard.tsx'
import { ErrorPage } from './routes/ErrorPage.tsx'
import { PrivateRoute } from './routes/PrivateRoute.jsx'
import { Collaborators } from './routes/dashboard/collaborators/Collaborators.tsx'
import { Leaders } from './routes/dashboard/leaders/Leaders.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "menu-inicial",
    element: <PrivateRoute><Dashboard /></PrivateRoute>
  },
  {
    path: "menu-inicial/colaboradores",
    element: <PrivateRoute> <Collaborators /> </PrivateRoute>
  },
  {
    path: "menu-inicial/lideranças",
    element: <PrivateRoute> <Leaders /> </PrivateRoute>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  </React.StrictMode>,
)
