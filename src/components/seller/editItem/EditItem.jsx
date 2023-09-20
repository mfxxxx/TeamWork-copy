import React from 'react'
import st from './EditItem.module.scss'

//Изменение содержимого товара
const EditItem = ({ setEditMode, id }) => {
  // функция для включения/выключения режима редактирования
  const toggleEditMode = (id) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [id]: !prevEditMode[id],
    }))
  }
  return (
    <button className={st.btn} onClick={() => toggleEditMode(id)}>
      Редактировать
    </button>
  )
}

export default EditItem
