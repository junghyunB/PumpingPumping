<div className="mode2MyPageSection">
<div className="mode2selectSection">
  <Link to="/mode2buy" className="z-indexZone">
    <Button variant="outline-dark">BuyTicket</Button>
  </Link>
  <Link to="/mode2my" className="z-indexZone">
    <Button variant="outline-dark">MyPage</Button>
  </Link>
</div>
<div className="mode2MyPageMainSelectSection">
  <div className="mode2MyContents">
    <div className="mode2MyTitle">
      <button onClick={subEpoch}>
        <BiLeftArrow size={30} />
      </button>
      <h3>{changeEpochM2} round</h3>
      <button onClick={addEpoch}>
        <BiRightArrow size={30} />
      </button>
    </div>
    <div className="mode2MyTicketList">
      <div className="myTicketTitle">
        <p>Own Mode#2 Ticket : </p>
      </div>
      <div className="ticketListSection">
      </div>
    </div>
    <div className="mode2TicketInfo">
      <div className="mode2totalTicketSection">
        <p>Total Ticket : {totalTicketAmountM2} EA</p>
      </div>
      <div className="mode2totalAmountSection">
        <p>Total Prize : {totalAmountM2} KLAY</p>
      </div>
    </div>

    <div className="winningTicketSection">
      {winningNumberM2 === "0" ? (
        <div className="currnetEpochWinningTicket">
          <h2>Winning Ticket</h2>
          <h2>Proceeding...</h2>
        </div>
      ) : (
        <div className="winningTicketNotTie">
          <div className="winningTicketTitle">
            <h3>winningTicket</h3>
          </div>
          <div className="winningTicketimgSection">
            <img src={mode1ticket} alt="Ticket"></img>
            <div className="winningNumberData">
              <p>#{winningNumberM2}</p>
              <p>
                {changeEpochM2}, {winningTicketIdM2}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    <div className="mode2Result">
      {winningNumberM2 === "0" ? (
        <div className="resultSection">
          <p>Result : Proceeding...</p>{" "}
        </div>
      ) : isClaimedM2 === "0" ? (
        <div className="resultSection">
          <p>Result : False</p>{" "}
        </div>
      ) : isClaimedM2 === "1" ? (
        <>
          <div className="winningresultSection">
            <p>Result : Success</p>
          </div>
          <div className="winningclaimSection">
            <p>Claim : Possible</p>
          </div>
        </>
      ) : (
        <>
          <div className="winningresultSection">
            <p>Result : Success</p>
          </div>
          <div className="winningclaimSection">
            <p>Claim : Already Did it</p>
          </div>
        </>
      )}
    </div>
    <div className="mode2Claim">
      <Button variant="outline-dark" onClick={claimRewardM2}>
        Claim
      </Button>
    </div>
    <div></div>
  </div>
</div>
</div>