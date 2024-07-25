import { NavLink, useNavigate } from 'react-router-dom';
import { useState, ChangeEvent } from 'react';
import { SignupType } from '@anuj_insan/common';
import axios from 'axios';
import { BACKEND_URL } from '../config';


interface LabelledInputTypes {
    type: string,
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelledInput = ({ type, label, placeholder, onChange }: LabelledInputTypes) => {
    return (
        <>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} type={type} name={type} id={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </>
    );
};

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate();

    const [user, setUser] = useState<SignupType>({
        email: "",
        password: "",
        name: ""
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    };

    const sendRequest = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, user);
            const jwt = response.data;
            localStorage.setItem("token", jwt.jwt);
            navigate("/blogs")
        } catch(e) {

        }
    }

    return (
        <>
            <div className="h-screen flex justify-center flex-col">
                <div className="flex justify-center">
                    <div>
                        <div className="text-3xl text-center font-bold">
                            Create an Account
                        </div>
                        <div className='text-center'>
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <NavLink className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>{type === "signup" ? "Signin" : "Signup"}</NavLink>
                        </div>
                        <div className='mt-8'>
                            <div className="mt-2">
                                {type === "signup" ? <LabelledInput type='name' label="Name" placeholder='name' onChange={handleInput} /> : null}
                            </div>
                            <div  className="mt-2">
                                <LabelledInput type='email' label="Email" placeholder='xyz@gmail.com' onChange={handleInput} />
                            </div>
                            <div className="mt-2">
                                <LabelledInput type='password' label="Password" placeholder='password' onChange={handleInput} />
                            </div>
                            <div className="mt-10">
                                <button type="submit" onClick={sendRequest} className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign Up" : "Sign In"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export { LabelledInput };