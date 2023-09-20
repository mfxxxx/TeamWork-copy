import React, { useState } from 'react'
import axios from 'axios'
import st from './AddNewItem.module.scss'
//добавление нового товара
const AddNewItem = ({ editableGoods, setEditableGoods }) => {
  //состояние для отслеживания режима редактирования для каждой строк
  const [addingNewItem, setAddingNewItem] = useState(false)
  //Поля для новой карточки товара
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    img: '',
  })

  //Изменения состояния
  const handleAddNewItem = () => {
    setAddingNewItem(true)
  }

  const handleSaveNew = () => {
    const newId = Date.now().toString()
    const newItemWithId = { ...newItem, id: newId }
    // setEditableGoods([...editableGoods, newItemWithId])
    //Добавление нового товара в начало списка
    setEditableGoods([newItemWithId, ...editableGoods])
    axios
      .post('http://localhost:3002/goods', newItemWithId)
      .then(() => {
        console.log('Карточка товара добавлена')
      })
      .catch((error) => {
        console.error('Возникла ошибка при добавлении нового товара', error)
      })
    setAddingNewItem(true)
    setNewItem({
      name: '',
      description: '',
      price: 0,
      category: '',
      img: '',
    })
  }

  //Функция на проверку заполнены ли все поля
  const isFormValid = () => {
    return (
      newItem.name.trim() !== '' &&
      newItem.price !== 0 &&
      newItem.category !== '' &&
      newItem.img.trim() !== ''
    )
  }

  return (
    <div className={st.wrapper}>
      {addingNewItem ? (
        <>
          <div className={st.wrapper_field}>
            <input
              type="text"
              className={`${st.column} ${st.column_name}`}
              placeholder="Название товара"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
            />
            <textarea
              type="text"
              className={`${st.column} ${st.column_descr}`}
              placeholder="Описание"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
            />
            <input
              type="number"
              className={`${st.column} ${st.column_price}`}
              placeholder="Цена"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
              required
            />
            <select
              value={newItem.category}
              className={`${st.column} ${st.column_category}`}
              onChange={(e) =>
                setNewItem({ ...newItem, category: e.target.value })
              }
            >
              {/* Значения для выпадающего списка категорий */}
              <option value="" disabled hidden>
                Выберите категорию
              </option>
              <option value="sofa-bed">Диван-кровать</option>
              <option value="press">Шкаф</option>
              <option value="bed">Кровать</option>
              <option value="chair">Кресло</option>
              <option value="table">Журнальный стол</option>
            </select>
            <input
              type="text"
              className={`${st.column} ${st.column_img}`}
              value={newItem.img}
              placeholder="Изображение"
              onChange={(e) => setNewItem({ ...newItem, img: e.target.value })}
              required
            />
          </div>
          <button
            className={`${st.btn} ${st.btn_save}`}
            onClick={handleSaveNew}
            disabled={!isFormValid()}
          >
            Сохранить новый товар
          </button>
        </>
      ) : (
        <button className={`${st.btn}`} onClick={handleAddNewItem}>
          Добавить новый товар
        </button>
      )}
    </div>
  )
}

export default AddNewItem
