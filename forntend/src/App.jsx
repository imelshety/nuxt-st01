import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Todo from './components/Todo';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Notfound from './components/Notfound';
import AddTodo from './components/AddTodo';
const App = () => {
  let router = createBrowserRouter([
    { path: '/', element: <Todo /> },
    { path: '/addtodo', element: <AddTodo /> },
    { path: '/login', element: <Login /> },
    { path: '/logout', element: <Logout /> },
    { path: '*', element: <Notfound /> }


  ]);
  return (
    <>
      <RouterProvider router ={router} />
    </>

  )
}

export default App;
