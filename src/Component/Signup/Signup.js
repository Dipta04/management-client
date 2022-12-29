import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Signup = () => {

    const [error, setError] = useState('');

    const { createUser, googleSignIn, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location =useLocation();
    const from = location.state?.from?.pathname || '/addtask';

    const handleSignup = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        // if(!/(?=.*[A-Z].*[A-Z])/.test(password))
        // {
        //   setError('Please provide atleast two uppercase');
        //   return;
        // }
        // if(password.length < 6)
        // {
        //   setError('Password should be at least 6 characters.');
        //    return;
        // }
        // if(!/(?=.*[!@#$&*])/.test(password))
        // {
        //    setError('Please add at least one special character'); 
        //    return ; 
        // }
        
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setError('');
                form.reset();
                toast.success('Now you are a registered User');
                // navigate(from, {replace: true});
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            })
    }

    const handleGoogleSignin = () =>{
        googleSignIn()
        .then(result => {
            const user = result.user;
            const currentUser = {
                email: user.email
            }
            console.log(currentUser);
            if(user)
            {
                navigate(from, {replace: true});
            }
        })
        .catch(error => {
            console.error(error);
            setError(error.message);
        })
        .finally(() =>{
            setLoading(false);
        })
    }

    return (
        <div>

            <div className="w-full mx-auto my-10 max-w-md p-4 rounded-md shadow sm:p-8 bg-gray-900 text-gray-100">
                {/* <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
                <p className="text-sm text-center text-gray-400">Dont have account?
                    <a href="#" rel="noopener noreferrer" className="focus:underline hover:underline">Sign up here</a>
                </p> */}
                <div className="my-6 space-y-4">
                    <button onClick={handleGoogleSignin} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                        <p>Login with Google</p>
                    </button>

                </div>
                <div className="flex items-center w-full my-4">
                    {/* <hr className="w-full dark:text-gray-400"> */}
                    <p className="px-3 mx-auto dark:text-gray-400">-------------OR-------------</p>
                    {/* <hr className="w-full dark:text-gray-400"> */}
                </div>
                <form onSubmit={handleSignup} novalidate="" action="" className="space-y-8 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label for="name" className="block text-sm">Name</label>
                            <input type="name" name="name" id="name" placeholder="Name" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 border-violet-400" />
                        </div>
                        <div className="space-y-2">
                            <label for="email" className="block text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="Email" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 border-violet-400" />
                        </div>
                        <div className="space-y-2">
                            <div className="">
                                <label for="password" className="text-sm">Password</label>

                            </div>
                            <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 border-violet-400" />
                        </div>
                    </div>
                    <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900">Sign Up</button>
                </form>
            </div>

        </div>
    );
};

export default Signup;