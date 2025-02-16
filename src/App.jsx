import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./layouts/Layout"
import NotFound from "./pages/NotFound"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import PrivateRoute from "./components/PrivateRoute"
import ChatPage from "./pages/ChatPage"
import ChatLayout from "./layouts/ChatLayout"


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '*', element: <NotFound /> }
    ]
  },
  // Chat Router 
  {
    path: '/chat',
    element: <ChatLayout />,
    children:
      [
        {
          path: '', element: (
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          )
        }
      ]
  },
])

function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
