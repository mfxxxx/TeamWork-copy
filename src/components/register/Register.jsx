import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { CustomContext } from '../../Context'

import st from './Register.module.scss'
const Register = () => {
  const { register, handleSubmit, formState, reset, watch } = useForm();

  const { registerUser } = useContext(CustomContext)

  return (
    <>
      <section className={st.register}>
        <div className="container">
          <div className={st.register_wrapper}>
            <form onSubmit={handleSubmit(registerUser)}>
              <h2>Регистрация</h2>
              <div className={st.register_inputs}>
                <input
                  {...register('login')}
                  type="text"
                  placeholder="Введите логин"
                />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Введите email"
                />
                <input
                  {...register('tel')}
                  type="tel"
                  placeholder="Введите телефон"
                />
                <input
                  {...register('password')}
                  type="password"
                  placeholder="Введите пароль"
                />
              </div>
              <button type="submit">Зарегистриваться</button>
              <div className={st.register_link}>
                <p>У вас уже есть аккаунт?</p>
                <Link to="/login"> Перейти</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register
