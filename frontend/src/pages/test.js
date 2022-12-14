<div className="mode1MyPageSection">
<Card className="mod1MyPageSection1">
  <div className="buyMypageselect">
    <div className="buybuttonSection">
      <Link to="/mode1buy" className="z-indexZone">
        <Button variant="outline-dark">BuyTicket</Button>
      </Link>
    </div>
    <div className="mypagebuttonSection">
      <Link to="/mode1my" className="z-indexZone">
        <Button variant="outline-dark">MyPage</Button>
      </Link>
    </div>
  </div>
  <div className="mode1epochSection">
    <button onClick={subEpoch}>
      <BiLeftArrow size={30} />
    </button>
    {changeEpoch === currentEpoch ? (
      <h3>{changeEpoch} round proceeding...</h3>
    ) : (
      <h3>{changeEpoch} round</h3>
    )}
    <button onClick={addEpoch}>
      <BiRightArrow size={30} />
    </button>
  </div>
  <hr></hr>
  <div className="ownedTicketSection">
    <div className="ownedTicketEaSection">
      <p>Own Mode#1 Ticket : {ownedMyTicket} EA</p>
    </div>
    {ownedMyTicketNum.map((item) => (
      <div className="ownedTicketNumSection">
        [{changeEpoch}, {item}]
      </div>
    ))}
  </div>
  <div className="dataSection">
    <h5>Total Ticket : {totalTicketAmount} EA</h5>
  </div>
  <div className="dataSection">
    <h5>Total Prize : {totalAmount} Klay</h5>
  </div>
  <div className="dataSection">
    <h5>Winning Rate : {totalAmount === 0 ? "0 %" : `${myRatio} %`}</h5>
  </div>
  <WinningAndClaim />
</Card>
</div>