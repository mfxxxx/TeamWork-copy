import React, { useContext, useEffect, useState } from 'react'
import Service from './../services/Service'
import ItemOfGoods from '../itemOfGoods/ItemOfGoods'
import st from './listOfCoods.module.scss'

const ListOfCoods = ({ categoryItems }) => {
  const [newItemLoading, setNewItemLoading] = useState(false)
  const { loading, error, getAllGoods } = Service()
  const [list, setList] = useState([])

  useEffect(() => {
    onRequest(true)
  }, [])

  const onRequest = (initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)
    getAllGoods().then(onListItemLoaded)
  }

  const onListItemLoaded = (newcharList) => {
    setList(newcharList)
    setNewItemLoading(false)
  }

  function renderItems(arr) {
    if (categoryItems) {
      const items = arr
        .filter((item) => item.category === categoryItems)
        .map((item) => {
          return <ItemOfGoods key={item.id} item={item} />
        })
      return <div className={st.main}>{items}</div>
    }
    const items = arr.map((item) => {
      return <ItemOfGoods key={item.id} item={item} />
    })
    return <div className={st.main}>{items}</div>
  }

  const items = renderItems(list)
  const errorMessage = error ? 'error' : null
  const spinner = loading && !newItemLoading ? <Loading /> : null
  return (
    <>
      {errorMessage}
      {spinner}
      {items}
    </>
  )
}

const Loading = () => {
  return (
    <div className={st.loading}>
      <img src="" alt="loading..." />
    </div>
  )
}

export default ListOfCoods
