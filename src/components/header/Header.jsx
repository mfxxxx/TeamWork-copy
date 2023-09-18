import React, { useContext } from 'react'
import { CustomContext } from '../../Context'
import { NavLink } from 'react-router-dom'
import './../../styles/style.scss'
import st from './Header.module.scss'

const Header = () => {
  const { user, logOutUser } = useContext(CustomContext)
  return (
    <header className={st.header}>
      <div className="container">
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
            {user && user.role === 'seller' ? (
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
      </div>
    </header>
  )
}

export default Header
