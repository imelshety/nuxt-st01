import axios from 'axios';
import React, { useState } from 'react'
import useId from 'react-use-uuid';

const AddTodo = () => {
    const id = useId();
    const [checked, setChecked] = useState(false);
    const handleChange = () => {
        setChecked(!checked);
    };
    let config ={}
    let data =""
    const userID = JSON.parse(localStorage.getItem('userTodo'));
    const handleAddTodo = (e) => {
        e.preventDefault();
        // console.log(e.target.todo.value);
        // console.log(checked);
        // console.log(userID[0].id);
        // console.log(id);
        data = '';
        config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/todos',
            headers: {
                'Authorization': 'Basic cm9ib246c2VjcmV0',
            },
            body: JSON.stringify({
                "task":"hello world",
                "completed":true,
            }),
        };
        setTodos();
    }
    function setTodos() {
        axios.request(config)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
        return (
            <div>
                <form action="" onSubmit={handleAddTodo}>
                    <input type="text" name='todo' placeholder="Todo name" className="input input-bordered w-full max-w-xs" />
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Completed</span>
                            <input name="done" type="checkbox" checked={checked}
                                onChange={handleChange} className="checkbox" />
                        </label>
                    </div>
                    <button type="submit">Done</button>
                </form>
            </div>
        )
    }

export default AddTodo