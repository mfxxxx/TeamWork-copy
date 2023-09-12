import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { CustomContext } from '../../Context'
import './../../styles/style.scss'
import st from './Login.module.scss'

const Login = () => {
  const { register, handleSubmit, formState, reset, watch } = useForm()
  const { loginUser, error } = useContext(CustomContext)

  return (
    <>
      <section className={st.login}>
        <div className="container">
          <div className={st.login_wrapper}>
            <form onSubmit={handleSubmit(loginUser)}>
              <h2>Вход в аккаунт</h2>
              <div className={st.login_inputs}>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Введите свой email"
                />
                <input
                  {...register('password')}
                  type="password"
                  placeholder="Введите пароль"
                />
                {error && (
                  <p className="error-message">Неверный email или пароль</p>
                )}
              </div>
              <button type="submit">Войти</button>
              <div className={st.login_link}>
                <p>Хотите создать аккаунт?</p>
                <Link to="/register"> Перейти</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
