import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashBoardM1Action } from "../../redux/actions/dashBoardM1Action";
import "./DashBoardM1.css";

const DashBoardM1 = () => {
  const dispatch = useDispatch();
  const dashboardM1 = useSelector((state) => state.epochM1.dashboardM1);

  function chunk(data = [], size = 3) {
    const items = [...data];
    const arr = [];

    while (items.length) {
      arr.push(items.splice(0, size));
    }

    return arr;
  }

  let dashboardM1Arr = chunk(dashboardM1).reverse();


  useEffect(() => {
    dispatch(dashBoardM1Action.dashBoardM1Act());
  }, []);
  return (
    <div className="dashBoardLeftSection">
      <div className="dashBoardLeftTable">
        <table>
          <thead>
            <tr>
              <th colSpan="3">Mode#1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>회차</td>
              <td>Total Ticket</td>
              <td>Prize</td>
            </tr>
            {dashboardM1Arr.map((item) => 
                  <tr>
                    <td>{item[0]}회차</td>
                    <td>{item[1]} Ticket</td>
                    <td>{item[2]} Klay</td>
                  </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashBoardM1;
