import React from 'react'
import axios from 'axios'
import st from './SaveEdit.module.scss'

//Cохранение изменений при редактировании товара
const SaveEdit = ({ editableGoods, setEditableGoods, setEditMode, id }) => {
  // Функция для обработки сохранения изменений при нажатии кнопки "Сохранить"
  const handleSave = (id) => {
    const updatedData = editableGoods.find((editedItem) => editedItem.id === id)
    const goodsData = {
      id: id,
      name: updatedData.name,
      description: updatedData.description,
      price: updatedData.price,
      category: updatedData.category,
      img: updatedData.img,
    }
    axios
      .put(`http://localhost:3002/goods/${id}`, goodsData)
      .then(() => {
        console.log('Данные успешно сохранены')
      })
      .catch((error) => {
        console.error('Ошибка при сохранении данных:', error)
      })

    const updatedGoods = editableGoods.map((item) => {
      if (item.id === id) {
        return updatedData || item
      }
      return item
    })
    setEditableGoods(updatedGoods)
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
