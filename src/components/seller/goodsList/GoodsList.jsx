import React, { useContext, useEffect, useState } from 'react'
import { FaUserLarge } from 'react-icons/fa6'
import { CustomContext } from '../../../Context'
import AddNewItem from '../addNewItem/AddNewItem'
import SaveEdit from '../saveEdit/SaveEdit'
import EditItem from '../editItem/EditItem'
import DeleteItem from '../deleteItem/DeleteItem'
import axios from 'axios'
import st from './GoodsList.module.scss'

const GoodsList = () => {
  const { user } = useContext(CustomContext)
  const [allGoods, setAllGoods] = useState([])
  const [editableGoods, setEditableGoods] = useState([...allGoods])
  const [editMode, setEditMode] = useState({})
  // состояние для хранения текущего изображения
  const [draggedImage, setDraggedImage] = useState(null)

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

  // const handleImageDrop = (e) => {
  //   e.preventDefault()
  //   const file = e.dataTransfer.files[0]

  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onload = (event) => {
  //       setDraggedImage(event.target.result)
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }
  const handleImageDrop = (e, id) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]

    if (file) {
      const formData = new FormData()
      formData.append('image', file)

      axios
        .post(`http://localhost:3002/goods//${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          // Обработка успешного сохранения изображения
          console.log('Изображение успешно сохранено')
          // После сохранения изображения в базе данных, вы можете получить его новый путь или идентификатор и обновить состояние товара с этим значением.
          const newImageURL = response.data.imageURL // Зависит от вашей реализации на сервере
          const updatedGoods = editableGoods.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                img: newImageURL,
              }
            }
            return item
          })
          setEditableGoods(updatedGoods)
        })
        .catch((error) => {
          console.error('Ошибка при сохранении изображения:', error)
        })
    }
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
                        <option value="t-">Диван-кровать</option>
                        <option value="press">Шкаф</option>
                        <option value="bed">Кровать</option>
                        <option value="chair">Кресло</option>
                        <option value="table">Журнальный стол</option>
                      </select>
                    ) : (
                      category
                    )}
                  </td>
                  <td
                    className={st.column_img}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleImageDrop(e, id)}
                  >
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
                  {/* <td
                    className={st.column_img}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleImageDrop(e)}
                  >
                    {isEditMode ? (
                      <>
                        <p>Добавьте ссылку или перетащите изображение</p>
                        <input
                          type="text"
                          value={img}
                          onChange={(e) =>
                            handleEdit(id, 'img', e.target.value)
                          }
                        />
                        <img src={draggedImage || img} alt="" />
                      </>
                    ) : (
                      <img src={img} alt="" />
                    )}
                  </td> */}

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

export default GoodsList
