import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import UserService from '@services/UserService';
import { StatusMessage } from '@types';
import { useTranslation } from 'next-i18next';

const UserLoginForm: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const { t } = useTranslation();

  const clearErrors = () => {
    setNameError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!name && name.trim() === '') {
      setNameError(t('login.validate.name'));
      result = false;
    }

    if (!password && password.trim() === '') {
      setPasswordError(t('login.validate.password'));
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    console.log("[UserLoginForm] handleSubmit triggered."); // New log
    event.preventDefault();

    clearErrors();

    console.log("[UserLoginForm] Validating input..."); // New log
    if (!validate()) {
      console.warn("[UserLoginForm] Validation failed."); // New log
      return;
    }
    console.log("[UserLoginForm] Validation successful."); // New log

    const user = { username: name, password };
    console.log("[UserLoginForm] User object created:", user); // New log

    try {
      console.log("[UserLoginForm] Attempting to call UserService.loginUser..."); // New log
      const response = await UserService.loginUser(user);
      console.log("[UserLoginForm] UserService.loginUser call completed. Response status:", response.status); // New log

      if (response.status === 200) {
        setStatusMessages([{ message: t('login.success'), type: 'success' }]);

        const userData = await response.json();
        console.log("[UserLoginForm] User data from response:", userData); // New log
        sessionStorage.setItem(
          'loggedInUser',
          JSON.stringify({
            token: userData.token,
            fullname: userData.fullname,
            username: userData.username,
            role: userData.role,
          })
        );
        console.log("[UserLoginForm] User session stored. Redirecting to /dashboard..."); // New log
        router.push('/dashboard');
      } else if (response.status === 401) {
        const { errorMessage } = await response.json();
        console.warn("[UserLoginForm] Login failed (401):", errorMessage); // New log
        setStatusMessages([{ message: errorMessage, type: 'error' }]);
      } else {
        console.error("[UserLoginForm] Login failed with status:", response.status); // New log
        setStatusMessages([
          {
            message: t('general.error'),
            type: 'error',
          },
        ]);
      }
    } catch (error) {
      console.error("[UserLoginForm] CRITICAL ERROR in handleSubmit after trying to call UserService:", error); // New log
      // Display a generic error message to the user
      setStatusMessages([
        {
          message: t('general.error') + " (Details: " + (error instanceof Error ? error.message : "Unknown error") + ")",
          type: 'error',
        },
      ]);
    }
  };

  return (
    <div className="max-w-sm m-auto">
      <div>
        <h3 className="px-0">{t('login.title')}</h3>
      </div>
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto ">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  ' text-red-800': type === 'error',
                  'text-green-800': type === 'success',
                })}
                data-testid={type === 'success' ? 'success-message' : 'error-message'}>
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label
              htmlFor="nameInput"
              className="block mb-2 text-sm font-medium">
              {t('login.label.username')}
            </label>
          </div>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="nameInput"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
              data-testid="username"
            />
            {nameError && <div className="text-red-800 ">{nameError}</div>}
          </div>
        </div>
        <div className="mt-2">
          <div>
            <label
              htmlFor="passwordInput"
              className="block mb-2 text-sm font-medium">
              {t('login.label.password')}
            </label>
          </div>
          <div className="block mb-2 text-sm font-medium">
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
              data-testid="password"
            />
            {passwordError && (
              <div className=" text-red-800">{passwordError}</div>
            )}
          </div>
        </div>

        <div className="row">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
            data-testid="login-button">
            {t('login.button')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserLoginForm;
