import React from 'react'
import './DashBoard.css'
import { DashBoardM1, DashBoardM2 } from '../components'

const DashBoard = () => {
  return (
    <div className='dashBoardPageContainer'>
        <DashBoardM1 />
        <DashBoardM2 />
    </div>
  )
}

export default DashBoard