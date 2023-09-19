import React, { useContext, useEffect, useState } from 'react'
import { FaUserLarge } from 'react-icons/fa6'
import { CustomContext } from '../../../Context'
import axios from 'axios'
import st from './GooodsList.module.scss'

const GooodsList = () => {
  const { user } = useContext(CustomContext)
  const [allGoods, setAllGoods] = useState([])
  const [editableGoods, setEditableGoods] = useState([...allGoods])
  const [editMode, setEditMode] = useState({})
  //состояние для отслеживания режима редактирования для каждой строк
  const [addingNewItem, setAddingNewItem] = useState(false)
  //добавление новой карточки товара

  //получение данных о всем товаре из db.json
  useEffect(() => {
    axios
      .get('http://localhost:3002/goods')
      .then(({ data }) => {
        setAllGoods(data)
        setEditableGoods(data)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])

  //функция для изменения категории
  const handleEdit = (id, field, value) => {
    const updatedGoods = editableGoods.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [field]: value,
        }
      }
      return item
    })
    setEditableGoods(updatedGoods)
  }

  // функция для включения/выключения режима редактирования
  const toggleEditMode = (id) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [id]: !prevEditMode[id],
    }))
  }

  const sendUpdatedDataToServer = (id, updatedData) => {
    axios
      .put(`http://localhost:3002/goods/${id}`, updatedData) // Assuming you use PUT for updates
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
    <section className={st.goodsList}>
      <div className={st.user}>
        <FaUserLarge />
        {user.email}
      </div>
      <h2 className={st.title}>Весь список товаров</h2>
      <button className={st.btn}>Добавить новый товар</button>
      <div className={st.wrapper}>
        <table className={st.goodsTable}>
          <thead>
            <tr>
              <th>Название товара</th>
              <th>Описание</th>
              <th>Цена, руб.</th>
              <th>Категория</th>
              <th>Картинка</th>
            </tr>
          </thead>
          <tbody>
            {editableGoods.map((item) => {
              const { id, name, description, price, category, img } = item
              const isEditMode = editMode[id]
              return (
                <tr className={st.item} key={id}>
                  <td className={st.column_name}>
                    {isEditMode ? (
                      <textarea
                        type="text"
                        value={name}
                        onChange={(e) => handleEdit(id, 'name', e.target.value)}
                      />
                    ) : (
                      name
                    )}
                  </td>
                  <td className={st.column_descr}>
                    {isEditMode ? (
                      <textarea
                        type="text"
                        value={description}
                        onChange={(e) =>
                          handleEdit(id, 'description', e.target.value)
                        }
                      />
                    ) : (
                      description
                    )}
                  </td>
                  <td className={st.column_price}>
                    {isEditMode ? (
                      <input
                        type="number"
                        value={price}
                        onChange={(e) =>
                          handleEdit(id, 'price', e.target.value)
                        }
                      />
                    ) : (
                      price
                    )}
                  </td>
                  <td className={st.column_category}>
                    {isEditMode ? (
                      <select
                        value={category}
                        onChange={(e) =>
                          handleEdit(id, 'category', e.target.value)
                        }
                      >
                        {/* Значения для выпадающего списка категорий */}
                        <option value="sofa-bed">Диван-кровать</option>
                        <option value="press">Шкаф</option>
                        <option value="bed">Кровать</option>
                        <option value="chair">Кресло</option>
                        <option value="table">Журнальный стол</option>
                      </select>
                    ) : (
                      category
                    )}
                  </td>
                  {/* <td className={st.column_img}>
                    {isEditMode ? (
                      <div
                        className={st.dropzone}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleImageDrop(e, id)}
                      >
                        Перетащите изображение сюда или нажмите, чтобы выбрать
                        файл
                      </div>
                    ) : (
                      <img src={img} alt="" />
                    )}
                  </td> */}
                  <td className={st.column_img}>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={img}
                        onChange={(e) => handleEdit(id, 'img', e.target.value)}
                      />
                    ) : (
                      <img src={img} alt="" />
                    )}
                  </td>
                  <td>
                    {isEditMode ? (
                      <button className={st.btn} onClick={() => handleSave(id)}>
                        Сохранить
                      </button>
                    ) : (
                      <button
                        className={st.btn}
                        onClick={() => toggleEditMode(id)}
                      >
                        Редактировать
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default GooodsList
