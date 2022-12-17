<div className="mode2selectSection">
<div className="chooseNumberSection">
  <Link to="/mode2buy" className="BackPage">
    <BiLeftArrow size={40} />
  </Link>
  <p>Choose Number : {selectTicket} </p>
</div>
<div className="availableSection">
  <div className="availableSection1">
    <h3>Available : {remainBuyTicket} EA</h3>
  </div>
  <div className="amountSection">
    <h3>Amount : {amount} KLAY</h3>
  </div>
</div>
</div>
<div className="choiceSection">
<div className="ticketSection">
  <div className="ticketContainer1">
    {section1?.map((item) => item)}
  </div>
  <div className="ticketContainer1">
    {section2?.map((item) => item)}
  </div>
  <div className="ticketContainer1">
    {section3?.map((item) => item)}
  </div>
  <div className="ticketContainer1">
    {section4?.map((item) => item)}
  </div>
  <div className="ticketContainer1">
    {section5?.map((item) => item)}
  </div>
</div>
<div className="buyButtonSection">
  <Button variant="outline-dark" onClick={buyTicketM2}>
    Buy Ticket
  </Button>
</div>
</div>
