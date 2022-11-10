import React, { useEffect } from 'react'
import "./DashBoardM2.css";
import {useSelector, useDispatch} from "react-redux";
import { dashBoardM2Action } from '../../redux/actions/dashBoardM2Action';
const DashBoardM2 = () => {

    const dispatch = useDispatch();

    const dashBoardDataM2 = useSelector(state => state.epochM2.dashBoardDataM2);

    function chunk(data = [], size = 5) {
        const items = [...data];
        const arr = [];
    
        while (items.length) {
          arr.push(items.splice(0, size));
        }
    
        return arr;
      }
      let dashboardM2Arr = chunk(dashBoardDataM2).reverse();

      useEffect(() => {
        dispatch(dashBoardM2Action.dashBoardM2Act());
      },[])

  return (
    <div className='dashBoardRightSection'>
    <div className='dashBoardRightTable'>
        <table>
            <thead>
                <tr>
                <th colSpan="4">Mode#2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>회차</td><td>Total Ticket</td><td>Prize</td><td>winningNumber</td>
                </tr>
                {dashboardM2Arr.map((item) => 
                  <tr>
                    <td>{item[0]}회차</td>
                    <td>{item[1]} Ticket</td>
                    <td>{item[2]} Klay</td>
                    <td>#{item[3]}[{item[0]}, {item[4]}]</td>
                  </tr>
            )}
            </tbody>
        </table>
    </div>
</div>
  )
}

export default DashBoardM2