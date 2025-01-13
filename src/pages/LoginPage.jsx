import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Key, Eye, EyeClosed } from "lucide-react"

import { UserAuth } from '../context/authContext';

const LoginPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = UserAuth();
    const navigate = useNavigate();

    const onSubmit = async ({ email, password }) => {
        try {
            setLoading(true)
            const { session, error } = await signInUser(email, password);

            if (error) {
                throw new Error(error);
            }

            if (session) {
                toast.success('Login successful! Redirecting...');
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error(error.message || 'Login failed. Please try again.');
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <div className="h-screen max-h-screen flex items-center justify-center">
            <div className="p-5 backdrop-blur-sm border border-gray-500 rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='font-bold text-3xl text-center'>
                        Login
                    </h2>
                    <div className='mt-4'>
                        <label className="input input-bordered flex items-center gap-2 bg-transparent rounded-full">
                            <Mail className='h-4 w-4 opacity-70' size={16} />
                            <input type="email" className="grow" placeholder="Email"
                                id="email"
                                {...register('email', { required: 'Email is required' })}
                                autoComplete='off'
                            />
                        </label>
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <div className="mt-4">
                        <label className="input input-bordered flex items-center gap-2 bg-transparent rounded-full">
                            <Key className='h-4 w-4 opacity-70' size={16} />
                            <input type={showPassword ? 'text' : 'password'} className="grow" placeholder="Password"
                                id="email"
                                {...register('password', { required: 'Password is required' })}
                            />
                            <button
                                type="button"
                                onClick={() => {

                                    setShowPassword(!showPassword)
                                }}
                                className="focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeClosed className='h-4 w-4 opacity-70' size={16} />
                                ) : (
                                    <Eye className='h-4 w-4 opacity-70' size={16} />
                                )}
                            </button>
                        </label>
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    </div>
                    <div className='py-5'>
                        <button type="submit" className="btn glass rounded-full w-full text-white hover:text-black" disabled={loading}>
                            {loading ? <span className="loading loading-spinner text-white loading-md"></span> : ""}
                            Login
                        </button>
                    </div>
                </form>
                <div className="mt-4">
                    <p>Dont have an account? <Link to="/register" className="font-semibold underline hover:no-underline"> Register here.</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
