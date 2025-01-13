import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Key, Eye, EyeClosed, UserRound } from "lucide-react"

import { UserAuth } from '../context/authContext';

const SignupPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { signUpNewUser, session } = UserAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (session) {
      navigate("/chat")
    }
  }, [navigate, session])

  const onSubmit = async ({ displayName, email, password }) => {
    try {
      setLoading(true)
      const { session, error } = await signUpNewUser(email, password, displayName);

      if (error) {
        throw new Error(error);
      }




      if (session) {
        toast.success("Verification sent to your email")
        toast.success('Signup successful! Redirecting...');
        navigate('/chat');
      }
    } catch (error) {
      toast.error(error.message || 'Signup failed. Please try again.');
    }
    finally {
      reset();
      setLoading(false)
    }
  };

  return (
    <div className="h-screen max-h-screen flex items-center justify-center">
      <div className="p-5 backdrop-blur-sm  rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className='font-bold text-3xl text-center py-5'>
            Sign Up
          </h2>
          <hr />
          <div className='mt-4'>
            <label className="input input-bordered flex items-center gap-2 input-ghost rounded-full">
              <UserRound className='h-4 w-4 opacity-70' size={16} />

              <input type="text" className="grow" placeholder="Full Name"
                id="displayName"
                {...register('displayName', { required: 'Full Name is required' })}
                autoComplete='off'
              />
            </label>
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div className='mt-4'>
            <label className="input input-bordered flex items-center gap-2 input-ghost rounded-full">
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
            <label className="input input-bordered flex items-center gap-2 input-ghost rounded-full">
              <Key className='h-4 w-4 opacity-70' size={16} />
              <input type={showPassword ? 'text' : 'password'} className="grow" placeholder="Password"
                id="password"
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
                  <EyeClosed className='h-4 w-4 opacity-70' size={18} />
                ) : (
                  <Eye className='h-4 w-4 opacity-70' size={18} />
                )}
              </button>
            </label>
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <div className='py-5'>
            <button type="submit" className="btn glass rounded-full w-full text-white hover:text-black hover:bg-white" disabled={loading}>
              {loading ? <span className="loading loading-spinner text-white loading-md"></span> : ""}
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-4">
          <p>Already have an account? <Link to="/login" className="font-semibold underline hover:no-underline"> Login here.</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
