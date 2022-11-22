import React, { useEffect, useState } from "react";
import "./DashBoardM2.css";
import { useSelector, useDispatch } from "react-redux";
import { dashBoardM2Action } from "../../redux/actions/dashBoardM2Action";
import Pagination from "react-js-pagination";
const DashBoardM2 = () => {
  const dispatch = useDispatch();

  const dashBoardDataM2 = useSelector((state) => state.epochM2.dashBoardDataM2);

  function chunk(data = [], size = 5) {
    const items = [...data];
    const arr = [];

    while (items.length) {
      arr.push(items.splice(0, size));
    }

    return arr;
  }
  let dashboardM2Arr = chunk(dashBoardDataM2).reverse();

  const Paging = () => {
    const [page, setPage] = useState(1);
    const handlePageChange = (page) => {
      setPage(page);
    };
    const pagelist = dashboardM2Arr.slice((page - 1) * 10, page * 10);
    return (
      <>
      <h3>Mode#2</h3>
      <div className="rightTableSection">
        <table>
          <thead>
            <tr>
              <th>round</th>
              <th>Total Ticket</th>
              <th>Prize</th>
              <th>winningNumber</th>
            </tr>
          </thead>
          <tbody>
            {pagelist.map((item) => (
              <tr key={item[0]}>
                <td>{item[0]}round</td>
                <td>{item[1]} Ticket</td>
                <td>{item[2]} Klay</td>
                <td>
                  #{item[3]}[{item[0]}, {item[4]}]
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

          </tbody>
        </table>
        </div>
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={dashboardM2Arr.length}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </>
    );
  };

  useEffect(() => {
    dispatch(dashBoardM2Action.dashBoardM2Act());
  }, []);

  return (
    <div className="dashBoardRightSection">
      <div className="dashBoardRightTable">
        <Paging />
      </div>
    </div>
  );
};

export default DashBoardM2;
