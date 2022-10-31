import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Heading.css";
import { useSelector, useDispatch } from 'react-redux';

import { totalAmountAction } from '../../redux/actions/totalAmountAction';
import { myTicketAmountAction } from '../../redux/actions/myTicketAmountAction';

const Heading = () => {

  const dispatch = useDispatch();

  const account = useSelector(state => state.account.account);
  const totalAmount = useSelector(state => state.ticket.totalAmount);
  const myTicketAmount = useSelector(state => state.ticket.myTicketAmount);
  const getMyRatio = (myTicketAmount / totalAmount).toFixed(3);

  useEffect(() => {
    dispatch(totalAmountAction.totalAmountAct());
    dispatch(myTicketAmountAction.myTicketAmountAct(account));
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
      <h1>내 당첨 확률 : {getMyRatio}% </h1>
      </Col>
    <Col>
      <h1 className='Amount-section'>총 응모 티켓 : {totalAmount} </h1>
      </Col>
    </Row>
  </Container>
  )
}

export default Heading