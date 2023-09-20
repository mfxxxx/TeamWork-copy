import React, { useContext, useEffect, useState } from 'react'
import { FaUserLarge } from 'react-icons/fa6'
import { CustomContext } from '../../../Context'
import AddNewItem from '../addNewItem/AddNewItem'
import SaveEdit from '../saveEdit/SaveEdit'
import EditItem from '../editItem/EditItem'
import DeleteItem from '../deleteItem/DeleteItem'
import axios from 'axios'
import st from './GoodsList.module.scss'

const GooodsList = () => {
  const { user } = useContext(CustomContext)
  const [allGoods, setAllGoods] = useState([])
  const [editableGoods, setEditableGoods] = useState([...allGoods])
  const [editMode, setEditMode] = useState({})

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

  return (
    <section className={st.goodsList}>
      <div className={st.user}>
        <FaUserLarge />
        {user.email}
      </div>
      <h2 className={st.title}>Весь список товаров</h2>
      <AddNewItem
        editableGoods={editableGoods}
        setEditableGoods={setEditableGoods}
      />
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
                      <SaveEdit
                        editableGoods={editableGoods}
                        setEditableGoods={setEditableGoods}
                        setEditMode={setEditMode}
                        id={id}
                      />
                    ) : (
                      <div className={st.btns}>
                        <EditItem setEditMode={setEditMode} id={id} />
                        <DeleteItem
                          editableGoods={editableGoods}
                          setEditableGoods={setEditableGoods}
                          id={id}
                        />
                      </div>
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
