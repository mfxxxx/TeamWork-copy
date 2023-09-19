import React, { useContext, useState, useEffect } from 'react'
import { CustomContext } from './../../../Context'
import { FaUserLarge } from 'react-icons/fa6'
import axios from 'axios'

import st from './UserList.module.scss'

const UserList = () => {
  const [allUsers, setAllUsers] = useState([])
  const [previousRole, setPreviousRole] = useState('')
  const [updatedUsers, setUpdatedUsers] = useState(new Map())
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const { user } = useContext(CustomContext)

  useEffect(() => {
    axios
      .get('http://localhost:3002/users')
      .then(({ data }) => {
        setAllUsers(data)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])

  const handleRoleChange = (userId, email, newRole) => {
    if (email === 'adminsportshop@gmail.com') {
      return
    }
    if (newRole === 'admin') {
      setShowModal(true)
      setSelectedUser({ userId, email })
      setPreviousRole(allUsers.find((user) => user.id === userId).role)
    } else {
      setUpdatedUsers(new Map(updatedUsers.set(userId, newRole)))
    }
  }
  const handleButtonClick = () => {
    for (const [userId, newRole] of updatedUsers) {
      axios
        .patch(`http://localhost:3002/users/${userId}`, { role: newRole })
        .then(() => {
          setAllUsers(
            allUsers.map((user) =>
              user.id === userId ? { ...user, role: newRole } : user,
            ),
          )
        })
        .catch((error) => {
          console.error('Error updating user role:', error)
        })
    }
    setUpdatedUsers(new Map())
  }

  const handleConfirm = () => {
    setUpdatedUsers(new Map(updatedUsers.set(selectedUser.userId, 'admin')))
    setShowModal(false)
    setSelectedUser(null)
  }

  const handleCancel = () => {
    setShowModal(false)
    setSelectedUser(null)
    setAllUsers(
      allUsers.map((user) =>
        user.id === selectedUser.userId
          ? { ...user, role: previousRole }
          : user,
      ),
    )
  }

  return (
    <section className={st.userlist}>
      {showModal && (
        <ConfirmModal
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          allUsers={allUsers}
        />
      )}
      <div className={st.user}>
        <FaUserLarge />
        {user.email}
      </div>
      <h2 className={st.title}>Все пользователи</h2>
      <div className={st.wrapper}>
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
              return (
                <tr key={id}>
                  <td>{login}</td>
                  <td>{email}</td>
                  <td>{tel}</td>
                  <td>
                    <select
                      value={role}
                      onChange={(e) => {
                        handleRoleChange(id, email, e.target.value)
                        setAllUsers(
                          allUsers.map((u) =>
                            u.id === id ? { ...user, role: e.target.value } : u,
                          ),
                        )
                      }}
                      disabled={email === 'adminsportshop@gmail.com'}
                    >
                      <option value="user">пользователь</option>
                      <option value="seller">продавец</option>
                      <option value="admin">администратор</option>
                    </select>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <button className={st.btn} onClick={handleButtonClick}>
        Сохранить изменения
      </button>
    </section>
  )
}

export default UserList

const ConfirmModal = ({ onConfirm, onCancel, allUsers }) => {
  const [adminCount, setAdminCount] = useState(0)

  useEffect(() => {
    const countAdmins = allUsers.reduce((count, user) => {
      return user.role === 'admin' ? count + 1 : count
    }, 0)

    setAdminCount(countAdmins)
  }, [allUsers])

  return (
    <div className={st.modal}>
      <div className={st.modalContent}>
        <p>Вы уверены, что хотите установить {adminCount}-го администратора?</p>
        <p>В таком случае он получит доступ ко всему</p>
        <div className={st.btns}>
          <button onClick={onConfirm}>Да</button>
          <button onClick={onCancel}>Нет</button>
        </div>
      </div>
    </div>
  )
}
