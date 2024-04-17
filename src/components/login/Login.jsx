import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { account, ID } from '../../lib/appwrite';
import './Login.css';

const Login = () => {
    const [register, setRegister] = useState(false);

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();

    async function login(email, password) {
        await account.createEmailSession(email, password);
        setLoggedInUser(await account.get());
        navigate("/challenge");
    }

    return (
        <div>
            <div className="login-tabs">
                <p onClick={() => setRegister(false)} className={register ? "login-tab" : "login-tab selected-tab"}>Login</p>
                <p onClick={() => setRegister(true)} className={register ? "login-tab selected-tab" : "login-tab"}>Register</p>
            </div>
            <p>
                {loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in'}
            </p>

            <form>
                <div className="form-input">
                    <label>Email</label>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-input">
                    <label>Password</label>
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                {
                register &&
                <div className="form-input">
                    <label>Name</label>
                    <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                }

                {
                !register &&
                <button type="button" onClick={() => login(email, password)}>
                Login
                </button>
                }

                {
                register &&
                <button
                type="button"
                onClick={async () => {
                    await account.create(ID.unique(), email, password, name);
                    login(email, password);
                }}
                >
                Register
                </button>
                }

                <button
                type="button"
                onClick={async () => {
                    await account.deleteSession('current');
                    setLoggedInUser(null);
                }}
                >
                Logout
                </button>
            </form>
        </div>
    );
}

export default Login;