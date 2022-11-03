import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Heading.css";
import { useSelector, useDispatch } from 'react-redux';

import { totalAmountAction } from '../../redux/actions/totalAmountAction';
import { myRatioAction } from '../../redux/actions/myRatioAction';
import { totalTicketAmountAction } from '../../redux/actions/totalTicketAmountAction';

const Heading = () => {

  const dispatch = useDispatch();
  const account = useSelector(state => state.account.account);
  let totalAmount = useSelector(state => state.ticket.totalAmount);
  const myRatio = useSelector(state => state.ticket.myRatio);
  const totalTicketAmount = useSelector(state => state.ticket.totalTicketAmount);




  useEffect(() => {
    dispatch(totalAmountAction.totalAmountAct());
    dispatch(myRatioAction.myRatioAct(account));
    dispatch(totalTicketAmountAction.totalTicketAmountAct());
  },[account])
  return (
    <Container>
    <Row>
      <Col>
      <h1 className='title'>Mode#1</h1>
      </Col>
    </Row>
    <Row>
      <Col>
      <h1>내 당첨 확률 : {myRatio} % </h1>
      </Col>
    <Col>
      <h1 className='Amount-section'>총 응모 티켓 : {totalTicketAmount} Ticket </h1>
      <h1 className='Amount-section'>당첨 금액 : {totalAmount} KLAY </h1>
      </Col>
    </Row>
  </Container>
  )
}

export default Heading