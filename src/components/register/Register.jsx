import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import InputMask from 'react-input-mask'
import { CustomContext } from '../../Context'

import st from './Register.module.scss'
const Register = () => {
  const { register, handleSubmit, formState, reset, watch } = useForm()
  const { errors } = formState
  const password = watch('password')

  const { registerUser } = useContext(CustomContext)

  return (
    <>
      <section className={st.register}>
        <div className="container">
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
              <InputMask
                mask="+7 (999) 999-99-99"
                {...register('tel')}
                type="tel"
                placeholder="Введите телефон"
              />
              <input
                {...register('password')}
                type="password"
                placeholder="Введите пароль"
              />
              {errors.password && <p>{errors.password.message}</p>}
              <input
                {...register('confirmPassword', {
                  validate: (value) =>
                    value === password || 'Пароли не совпадают',
                })}
                type="password"
                placeholder="Введите повторно пароль"
                autoComplete="new-password"
                required
              />
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>
            <button type="submit">Зарегистриваться</button>
            <div className={st.register_link}>
              <p>У вас уже есть аккаунт?</p>
              <Link to="/login"> Перейти</Link>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Register
