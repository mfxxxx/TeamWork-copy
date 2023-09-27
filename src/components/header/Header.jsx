import React, { useContext } from 'react'
import { CustomContext } from '../../Context'
import { NavLink } from 'react-router-dom'
import st from './Header.module.scss'

const Header = () => {
  const { user, logOutUser } = useContext(CustomContext)
  return (
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
  )
}

export default Header
