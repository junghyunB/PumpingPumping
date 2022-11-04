import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from "react-redux";
import { buyTicketAction } from "../../redux/actions/buyTicketAction";
import "./BuyModal.css";

const BuyModal = () => {
  const account = useSelector((state) => state.account.account);
  const show = useSelector((state) => state.modal.show);
  const amount = useSelector((state) => state.modal.amount);
  const dispatch = useDispatch();

  const handleShow = () => {
      if (account === "") {
          return alert("지갑 연결 후 이용 해 주세요");
      } 
    dispatch({ type: "BUY_MODAL", payload: true });
  };

  const handleClose = () => {
    dispatch({ type: "CLOSE_MODAL", payload: false });
  };

  const addAmount = () => {
    dispatch({type: "ADD_AMOUNT", payload: amount + 1});
  }

  const subAmount = () => {
    dispatch({type: "SUB_AMOUNT", payload: amount - 1});
  }

  const buyTicket = () => {
    dispatch(buyTicketAction.buyTicketAct(amount));
  }

  return (
    <div>
      <Button onClick={handleShow} variant="primary">
        구매하기
      </Button>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Buy Ticket!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdbyQo7_g01ImNhp7UG2ANuM6Ab4skIPfmg&usqp=CAU" />
          <div className="text-section">구매 갯수를 입력 해 주세요 (한 주소당 최대 10개 )</div>
          <div className="buy-section">
          <button onClick={subAmount}>-</button><div>{amount}</div><button onClick={addAmount}>+</button>
          </div>
          </Modal.Body>
          <Modal.Footer className="button-section">
            <Button variant="primary" onClick={buyTicket}>
              구매 하기
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
};

export default BuyModal;
