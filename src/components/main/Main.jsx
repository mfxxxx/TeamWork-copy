import React from 'react'
import ListOfCoods from './../../components/listOfCoods/listOfCoods'
import st from './Main.module.scss'
import './../../styles/style.scss'

const Main = () => {
  return (
    <>
      {/* секция со слайдерами */}
      <section className={st.sliders}>
        <div className="container">
          <h2 className={st.title}>Кроссовки</h2>
          <ListOfCoods categoryItems="sneakers" />
          <h2 className={st.title}>Футболки</h2>
          <ListOfCoods categoryItems="shorts" />
        </div>
      </section>
      {/* секция с брэндами */}
      <section className={st.brand}>
        <div className="container"></div>
      </section>
      {/* секция о нас */}
      <section className={st.aboutUs}>
        <div className="container"></div>
      </section>
      {/* секция с акциями*/}
      <section className={st.aboutUs}>
        <div className="container"></div>
      </section>
    </>
  )
}

export default Main
