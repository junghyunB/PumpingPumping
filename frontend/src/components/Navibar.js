import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { connectAccount } from "../redux/actions/connectAccount";
import { Link } from "react-router-dom";

const Navibar = () => {
  const { account } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const connectWallet = () => {
    if (window.klaytn) dispatch(connectAccount.getAccount());
  };
  
  useEffect(() => {
    connectWallet()
  }, [account])
  return (
    <Container>
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Link to="/">Raffle</Link>
          <Link to="/mode1">Mode#1</Link>
          <Link to="/mode2">Mode#2</Link>
          {account === "" ? (
            <Button variant="outline-secondary" onClick={connectWallet}>
              Connect Wallet
            </Button>
          ) : (
            <Button variant="outline-secondary">{account.substr(0,6)}...{account.slice(-6)}</Button>
          )}
        </Container>
      </Navbar>
    </Container>
  );
};

export default Navibar;
