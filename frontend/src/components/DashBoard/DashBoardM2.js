import React from 'react'
import "./DashBoardM2.css";
const DashBoardM2 = () => {
  return (
    <div className='dashBoardRightSection'>
    <div className='dashBoardRightTable'>
        <table>
            <thead>
                <tr>
                <th colSpan="3">Mode#2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>N회차</td><td>Total Ticket</td><td>Prize</td>
                </tr>
                <tr>
                <td>5회차</td><td>356 Ticket</td><td>1780 Klay</td>
                </tr>
                <tr>
                <td>4회차</td><td>289 Ticket</td><td>1455 Klay</td>
                </tr>
                <tr>
                <td>3회차</td><td>250 Ticket</td><td>1250 Klay</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
  )
}

export default DashBoardM2