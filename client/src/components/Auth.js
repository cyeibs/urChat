import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

// import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
  fullName: '',
  username: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: '',
}

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, phoneNumber, avatarURL } = form;

    const URL = 'http://localhost:5000/auth';

    const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
      username, password, fullName: form.fullName, phoneNumber, avatarURL,
    });

    cookies.set('token', token);
    cookies.set('username', username);
    cookies.set('fullName', fullName);
    cookies.set('userId', userId);

    if (isSignup) {
      cookies.set('phoneNumber', phoneNumber);
      cookies.set('avatarURL', avatarURL);
      cookies.set('hashedPassword', hashedPassword);
    }

    window.location.reload();
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  }

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? 'Зарегистрироваться' : 'Войти'}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Имя</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Имя"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Никнейм</label>
              <input
                name="username"
                type="text"
                placeholder="Никнейм"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Номер телефона</label>
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Номер телефона"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Ссылка на аватарку</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="Ссылка на аватарку"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Пароль</label>
              <input
                name="password"
                type="password"
                placeholder="Пароль"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Повторите пароль</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Повторите пароль"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button>{isSignup ? 'Зарегистрироваться' : 'Войти'}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup
                ? "Уже зарегистрированы?"
                : "У вас еще нет аккаунта?"
              }
              <span onClick={switchMode}>
                {isSignup ? 'Войти' : 'Зарегистрироваться'}
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* <div className="auth__form-container_image">
        <img src={signinImage} alt="sign in" />
      </div> */}
    </div>
  )
}

export default Auth
