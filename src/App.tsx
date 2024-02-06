import React from 'react';
import './App.scss';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/registerPage';
import Layout from './pages/layout';
import ChatPage from './pages/chat/ChatPage';
import ProtectedRoute from './routes/ProtectedRoute';
import { useSelector } from 'react-redux';
import { selectUserAuth } from './store/loginSlice/loginSlice';
import DocumentPage from './pages/document/DocumentsPage';
function App() {

  const userAuth = useSelector(selectUserAuth);  
  
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
      loader: async () => {
        if(userAuth.tokenValue){
          console.log(userAuth.tokenValue)
          return redirect('/chat')
        }
        return null
      }
    },
    {
      path: "/register",
      element: <RegisterPage />
    },
    {
      path:"/",
      element: 
      <ProtectedRoute token ={userAuth.tokenValue}>
        <Layout />
      </ProtectedRoute>,
       children: [
        {path:"/chat", element: <ChatPage />},
        {path:"/document", element: <DocumentPage />}
      ]
    },
    {
      path: "*",
      element: <p> Not found </p>
    }
  ])
  
  return (
    <React.Fragment>
      <RouterProvider router={router}></RouterProvider>
    </React.Fragment>
  );
}

export default App;
