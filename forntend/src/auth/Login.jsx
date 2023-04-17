import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { usersData } from '../data/users';
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [selectedUserPassword, setSelectedUserPassword] = useState();
    const navigate = useNavigate();
    let loggedInUser ={};

    // using axios to get all users to shoW them into select box
    async function getUsers() {
        try {
            const response = await axios.get('http://localhost:4000/users');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    const handleCardClick = (user) => {
        setSelectedUser(user);
    }
    const handleFormSubmit =(e)=>{
        e.preventDefault();
        setSelectedUserPassword(e.target.password.value);
    }
    // using useeffect to fetch users
    useEffect(() => {
        getUsers()
    }, []);
    
    usersData.map((user=>
        {
            if(user.username === selectedUser?.username && user.password=== selectedUserPassword&&selectedUserPassword){
                loggedInUser =
                {
                    username: user.username,
                    password: selectedUserPassword
                }
                localStorage.setItem("userData",JSON.stringify(loggedInUser));
                navigate("/", {state: {username: user.username}});
            }
        }
        ));
    return (
        <div className="bg-no-repeat bg-cover bg-center relative" style={{ backgroundImage: "url('../assets/sunset.jpg')" }}>
            <div className="absolute bg-gradient-to-b from-blue-400 to-green-400 opacity-75 inset-0 z-0"></div>
            <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                <div className="flex justify-center self-center  z-10">
                    <div className="p-12 bg-white mx-auto rounded-2xl w-96 md:w-[650px] z-50">
                        <div className="mb-4">
                            <h3 className="font-semibold text-3xl text-blue-600">Sign In </h3>
                            <p className="text-gray-500">Please sign in to your account.</p>
                        </div>
                        <form action="" onSubmit={handleFormSubmit}>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-blue-700 tracking-wide">User Name</label>
                                    {
                                        selectedUser ?
                                            <div className={`flex items-center border-2 rounded-lg p-2 cursor-pointer gap-3 border-blue-400 shadow-xl`}>
                                                <img src={selectedUser.avatar} alt={selectedUser.name} className='w-14 h-14' />
                                                <h5 className='text-slate-800 font-bold text-2xl'>{selectedUser.name}</h5>
                                            </div>
                                            :
                                            users.map(user => (
                                                <div className={`flex items-center border rounded-lg p-2 cursor-pointer gap-3 border-slate-400`} key={user.id} onClick={() => { handleCardClick(user) }}>
                                                    <img src={user.avatar} alt={user.name} className='w-14 h-14' />
                                                    <h5 className='text-slate-800 font-bold text-2xl'>{user.name}</h5>
                                                </div>
                                            ))
                                    }
                                </div>
                                <div className={`${selectedUser ? "space-y-2" : "hidden"}`}>
                                    <label className={`mb-5 text-sm font-medium text-blue-700 tracking-wide`}>
                                        Password
                                    </label>
                                    <input className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400" type="password" placeholder="Enter your password" name='password'/>
                                </div>
                                <div>
                                    <button type="submit" className="w-full flex justify-center bg-blue-400  hover:bg-blue-700 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                        Sign in
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login