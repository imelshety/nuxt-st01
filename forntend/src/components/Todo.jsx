import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Carduser from './Carduser';
import { useLocation } from 'react-router-dom';

const Todo = (props) => {
  const [userTodo, setuserTodo] = useState([]);
  const{state} = useLocation();
  
let data = '';
let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:4000/todos',
  headers: { 
    'Authorization': 'Basic cm9ib246c2VjcmV0',
  },
  data : data
};
   function getTodos() {
  axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  setuserTodo(response.data);
    localStorage.setItem( "userTodo", JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

}

  useEffect(() => {
    getTodos();
  
    
  }, [])


 
  return (
<>
{/* navbar for users */}
<div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">Todo</a>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        
          <h3 className='w-70 text-white'>{state?.username} </h3>
        
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
{/* card for user */}
<div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>task </th>
        <th>completed</th>
      </tr>
    </thead>
    <tbody>
     {userTodo.map(todo =>( <Carduser id={todo.id} task={todo.task} completed={todo.completed} key={todo.id}/>
     ))}
    </tbody>
  </table>
</div>
</>
  )
}

export default Todo;