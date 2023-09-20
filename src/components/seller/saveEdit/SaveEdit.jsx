import React from 'react'
import axios from 'axios'
import st from './SaveEdit.module.scss'

//Cохранение изменений при редактировании товара
const SaveEdit = ({ editableGoods, setEditableGoods, setEditMode, id }) => {
  const sendUpdatedDataToServer = (id, updatedData) => {
    axios
      .put(`http://localhost:3002/goods/${id}`, updatedData)
      .then(() => {
        console.log('Data saved successfully')
      })
      .catch((error) => {
        console.error('Error saving data:', error)
      })
  }
  // Функция для обработки сохранения изменений при нажатии кнопки "Сохранить"
  const handleSave = (id) => {
    const updatedData = editableGoods.find((editedItem) => editedItem.id === id)
    const updatedGoods = editableGoods.map((item) => {
      if (item.id === id) {
        return updatedData || item
      }
      return item
    })
    setEditableGoods(updatedGoods)
    sendUpdatedDataToServer(id, updatedData)
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [id]: false,
    }))
  }
  return (
    <button className={st.btn} onClick={() => handleSave(id)}>
      Сохранить
    </button>
  )
}

export default SaveEdit
