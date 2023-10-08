import React, { useContext } from 'react'
import { CustomContext } from '../../Context'
import { NavLink } from 'react-router-dom'
import st from './Header.module.scss'
import logo from './logo.png'
import f from './1.png'
import s from './2.png'
import t from './3.png'


const Header = () => {
  const { user, logOutUser } = useContext(CustomContext)
  return (
    <section>
      <div className="container"><img src={logo} alt=""/> <h>Время работы: 10:00-22:00</h></div>
      <header className={st.header}>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Главная</NavLink>
            </li>
            <li>
              <NavLink to="/goods">Товары</NavLink>
            </li>
            {user && user.role === 'admin' ? (
              <li>
                <NavLink to="/admin">Панель админа</NavLink>
              </li>
            ) : (
              ''
            )}
            {(user && user.role === 'seller') ||
            (user && user.role === 'admin') ? (
              <li>
                <NavLink to="/seller">Панель продавца</NavLink>
              </li>
            ) : (
              ''
            )}
            {user && user.login && user.login.length ? (
              <li>
                <NavLink to="/" onClick={() => logOutUser()}>
                  Выйти
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/login">Войти</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <div className="container">
        <img src={f} alt=""/>
        <img src={s} alt=""/>
        <img src={t} alt=""/>
      </div>
    </section>
  )
}

export default Header
