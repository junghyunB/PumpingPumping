import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashBoardM1Action } from "../../redux/actions/dashBoardM1Action";
import Pagination from "react-js-pagination";
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

  const Paging = () => {
    const [page, setPage] = useState(1);
    const maxContents = 5;
    const handlePageChange = (page) => { 
      setPage(page); 
    };
    const pagelist = dashboardM1Arr.slice(((page - 1) * maxContents) , page * maxContents);
    let tableBody = [];
    for (let i = 0; i < maxContents; i++) {
      tableBody.push(
        pagelist[i] ? (
          <tr>
            <td>{pagelist[i][0]}</td>
            <td>{pagelist[i][1]} EA</td>
            <td>{pagelist[i][2]} KLAY</td>
          </tr>
        ) : (
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        )
      );
        }

    return (
      <>
      <h3>Mode#1</h3>
      <div className="leftTableSection">
      <table>
      <thead>
      <tr>
          <th>회차</th>
          <th>Total Ticket</th>
          <th>Prize</th>
        </tr>
      </thead>
      <tbody>
        {tableBody?.map((item) => item)}
      </tbody>
    </table>
    </div>
      <Pagination 
      activePage={page}
      itemsCountPerPage={5}
      totalItemsCount={dashboardM1Arr.length}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange} 
      />
      </>
    ); 
  }; 
  
  useEffect(() => {
    dispatch(dashBoardM1Action.dashBoardM1Act());
  }, []);

  return (
    <div className="dashBoardLeftSection">
      <div className="dashBoardLeftTable">
        <Paging />
      </div>
    </div>
  );
};

export default DashBoardM1;
