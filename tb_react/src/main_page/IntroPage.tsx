import React from 'react'
import '../css/MainPage.css'
import '../css/Calendar.css'
import Sidebar from './Sidebar'
import Header from './Header'

const IntroPage: React.FC = () => {
  return (
    <div className="container_main">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="main_container"></div>
      </main>
    </div>
  )
}
export default IntroPage
