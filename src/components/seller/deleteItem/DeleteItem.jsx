import React from 'react'
import axios from 'axios'
import st from './DeleteItem.module.scss'
const DeleteItem = ({ editableGoods, setEditableGoods, id }) => {
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3002/goods/${id}`)
      .then(() => {
        console.log('Товар удален успешно')
        const updatedGoods = editableGoods.filter((item) => item.id !== id)
        setEditableGoods(updatedGoods)
      })
      .catch((error) => {
        console.error('Ошибка удаления товара:', error)
      })
  }
  return (
    <button
      className={`${st.btn} ${st.btn_delete}`}
      onClick={() => handleDelete(id)}
    >
      Удалить товар
    </button>
  )
}

export default DeleteItem
