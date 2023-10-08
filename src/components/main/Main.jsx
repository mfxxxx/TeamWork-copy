import React from 'react'
import ListOfCoods from './../../components/listOfCoods/listOfCoods'
import st from './Main.module.scss'
import './../../styles/style.scss'
import brooks from "./brooks.png"
import oneway from "./one_way.png"
import salomon from "./salomon.png"
import puma from "./puma.png"
import fuse from "./fuse.png"
import asics from "./asics.png"

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
        <div className="container">
            <div className={st.brands}>
              <p>Наши бренды</p>
              <img src={brooks} alt=""/>
              <img src={oneway} alt=""/>
              <img src={salomon} alt=""/>
              <img src={puma} alt=""/>
              <img src={fuse} alt=""/>
              <img src={asics} alt=""/>
          </div>
        </div>
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
