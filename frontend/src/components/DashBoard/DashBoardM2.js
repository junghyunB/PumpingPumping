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
    const maxContents = 5;
    const handlePageChange = (page) => {
      setPage(page);
    };
    const pagelist = dashboardM2Arr.slice(
      (page - 1) * maxContents,
      page * maxContents
    );
    let tableBody = [];
    for (let i = 0; i < maxContents; i++) {
      tableBody.push(
        pagelist[i] ? (
          <tr>
            <td>{pagelist[i][0]}</td>
            <td>{pagelist[i][1]} EA</td>
            <td>{pagelist[i][2]} KLAY</td>
            <td>
              #{pagelist[i][3]} [{pagelist[i][0]}, {pagelist[i][4]}]
            </td>
          </tr>
        ) : (
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        )
      );
    }

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
            <tbody>{tableBody?.map((item) => item)}</tbody>
          </table>
        </div>
        <Pagination
          activePage={page}
          itemsCountPerPage={5}
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
