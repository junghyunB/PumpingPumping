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
    const handlePageChange = (page) => { 
      setPage(page); 
    };
    const pagelist = dashboardM1Arr.slice(((page - 1) * 10) , page * 10)

    return (
      <>
      <table>
      <thead>
        <tr>
          <th colSpan="3"><h2>Mode#1</h2></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>회차</td>
          <td>Total Ticket</td>
          <td>Prize</td>
        </tr>
        {pagelist.map((item) => 
              <tr key={item[0]}>
                <td>{item[0]}회차</td>
                <td>{item[1]} Ticket</td>
                <td>{item[2]} Klay</td>
              </tr>
        )}
      </tbody>
    </table>
      <Pagination 
      activePage={page}
      itemsCountPerPage={10}
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
