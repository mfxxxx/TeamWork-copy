import React, { useContext, useState } from 'react'
import { CustomContext } from './../../../Context'
import db from 'db.json'
import st from './UserList.module.scss'

const UserList = () => {
  const allUsers = db.users
  const [editingUserId, setEditingUserId] = useState(null)

  const { updateUserRole } = useContext(CustomContext)

  const saveRole = (id, role) => {
    updateUserRole(id, role)
    setEditingUserId(null)
  }

  return (
    <>
      <h2 className={st.title}>Все пользователи</h2>
      <table className={st.userTable}>
        <thead>
          <tr>
            <th>Логин</th>
            <th>Электронная почта</th>
            <th>Телефон</th>
            <th>Тип аккаунта</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => {
            const { id, email, login, tel, role } = user
            const isEditing = editingUserId === id
            return (
              <tr key={id}>
                <td>{login}</td>
                <td>{email}</td>
                <td>{tel}</td>
                <td>
                  {isEditing ? (
                    <select
                      defaultValue={role}
                      onBlur={(e) => saveRole(id, e.target.value)}
                      autoFocus
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  ) : (
                    <span onClick={() => setEditingUserId(id)}>{role}</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default UserList
