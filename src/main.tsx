import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import { GlobalContextProvider } from './context/GlobalContext.tsx'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Dashboard } from './routes/dashboard/Dashboard.tsx'
import { ErrorPage } from './routes/ErrorPage.tsx'
import { PrivateRoute } from './routes/PrivateRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  </React.StrictMode>,
)
