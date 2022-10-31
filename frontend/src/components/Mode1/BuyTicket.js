import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./BuyTicket.css";
import BuyModal from "./BuyModal";

const BuyTicket = () => {


  return (
    <Card style={{ width: '20rem' }}>
    <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdbyQo7_g01ImNhp7UG2ANuM6Ab4skIPfmg&usqp=CAU" />
    <Card.Body className='section'>
      <Card.Title>Mode#1 Ticket</Card.Title>
      <Card.Text>
        Mode#1 Raffle에 쓰이는 티켓 입니다.
      </Card.Text>
      <BuyModal />
    </Card.Body>
  </Card>
  )
}

export default BuyTicket