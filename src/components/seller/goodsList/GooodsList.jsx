import React, { useContext, useEffect, useState } from 'react'
import { FaUserLarge } from 'react-icons/fa6'
import { CustomContext } from '../../../Context'
import axios from 'axios'
import st from './GooodsList.module.scss'

const GooodsList = () => {
  const [allGoods, setAllGoods] = useState([])
  const { user } = useContext(CustomContext)
  useEffect(() => {
    axios
      .get('http://localhost:3002/goods')
      .then(({ data }) => {
        setAllGoods(data)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])
  return (
    <section className={st.goodsList}>
      <div className={st.user}>
        <FaUserLarge />
        {user.email}
      </div>
      <h2 className={st.title}>Весь список товаров</h2>
      <div className={st.wrapper}>
        <table className={st.goodsTable}>
          <thead>
            <tr>
              <th>Название товара</th>
              <th>Описание</th>
              <th>Цена</th>
              <th>Категория</th>
              <th>Картинка</th>
            </tr>
          </thead>
          <tbody>
            {allGoods.map((item) => {
              const { id, name, description, price, category, img } = item
              return (
                <tr className={st.item} key={id}>
                  <td className={st.column_name}>{name}</td>
                  <td className={st.column_descr}>{description}</td>
                  <td>{price}</td>
                  <td className={st.column_category}>{category}</td>
                  <td className={st.column_img}>
                    <img src={img} alt="" />
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
