import React, { MouseEvent, useEffect } from 'react';
import { logoUrl } from '../../constants/assets';
import AuthService from '../../services/auth';
import { globalAuthToken, globalNotifications } from '../../state';
import { Persistence } from '@hookstate/persistence';
import { useHistory } from 'react-router';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useState } from '@hookstate/core';

interface Props {}

const LoginPage: React.FC<Props> = (props: Props) => {
  const form = useState({ username: '', password: '' });
  const authToken = useState(globalAuthToken);
  const history = useHistory();

  const notification = useState(globalNotifications);
  const handleSignin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    AuthService.signin({
      username: form.username.value,
      password: form.password.value,
    })
      .then((response) => {
        if (response.data) {
          authToken.attach(Persistence('state.authToken'));
          globalAuthToken.set(response.data);
          AuthService.getUserInfoByToken(response.data).then((userResponse) => {
            if (userResponse.data) {
              history.push('/');
            }
          });
        }
      })
      .catch((e) => {
        notification.set({
          duration: 3000,
          title: 'Something went wrong',
          description: e.message,
          show: true,
          type: 'error',
        });
      });
  };

  useEffect(() => {
    if (authToken.value) {
      history.push('/');
    }
  }, [authToken.value]);

  return (
    <div className='min-h-screen flex items-start justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <img className='mx-auto h-48 w-auto' src={logoUrl} alt='Cloudonut' />
          <h2 className='mt-6 text-center text-2xl font-extrabold text-gray-900'>
            <span className='text-yellow-500'>Cloudonut</span> For Restaurants
          </h2>
        </div>
        <form className='mt-8 space-y-6' action='#' method='POST'>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address / Username
              </label>
              <input
                id='username'
                name='username'
                type='text'
                autoComplete='username'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm'
                placeholder='Email address / Username'
                onChange={(e) => form.username.set(e.target.value)}
                value={form.username.value}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm'
                placeholder='Password'
                onChange={(e) => form.password.set(e.target.value)}
                value={form.password.value}
              />
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember_me'
                name='remember_me'
                type='checkbox'
                className='h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded'
              />
              <label
                htmlFor='remember_me'
                className='ml-2 block text-sm text-gray-900'
              >
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <a
                href='#'
                className='font-medium text-yellow-600 hover:text-yellow-500'
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
              onClick={handleSignin}
            >
              <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                <LockClosedIcon
                  className='h-5 w-5 text-yellow-500 group-hover:text-yellow-400'
                  aria-hidden='true'
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
