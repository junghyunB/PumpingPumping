import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from "react-redux";
import { connectKaiKasAccount } from "../../redux/actions/connectKaiKasAccount";
import { connectMetaMaskAccount } from "../../redux/actions/connectMetaMaskAccount";
import { Link } from "react-router-dom";

const Navibar = () => {
  const accountKaiKas = useSelector((state) => state.account.accountKaiKas);
  console.log(accountKaiKas);
  const accountMetaMask = useSelector((state) => state.account.accountMetaMask);
  const dispatch = useDispatch();


  const storedMetaMask = localStorage.getItem("metamaskAccount");
  const storedKaiKas = localStorage.getItem("kaikasAccount");

  const connectKaiKasWallet = () => {
  dispatch(connectKaiKasAccount.getKaiKasAccount());
  };

  const connectMetaMaskWallet = () => {
    dispatch(connectMetaMaskAccount.getMetaMaskAccount())
  };

  const disabledLogin = () => {
    localStorage.removeItem("metamaskAccount");
    localStorage.removeItem("kaikasAccount");
    window.location.reload();
  }

  const walletChangeMetaMask = () => {
    if(window.location.reload && storedMetaMask !== null) {
      dispatch(connectMetaMaskAccount.getMetaMaskAccount())
    }
  }

  const walletChangeKaiKas = () => {
    if(window.location.reload && storedKaiKas !== null) {
      dispatch(connectKaiKasAccount.getKaiKasAccount());
    }
  }


  
  useEffect(() => {
    walletChangeKaiKas()
    walletChangeMetaMask()
  }, [])
  return (
    <Container>
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Link to="/">Raffle</Link>
          <Link to="/mode1">Mode#1</Link>
          <Link to="/mode2">Mode#2</Link>
          {storedMetaMask == null && storedKaiKas == null ? (
            <>
            <Dropdown>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
              ConnectWallet
            </Dropdown.Toggle>
    
            <Dropdown.Menu variant="dark">
              <Dropdown.Item onClick={connectMetaMaskWallet}>
                MetaMask
              </Dropdown.Item>
              <Dropdown.Item onClick={connectKaiKasWallet}>KaiKas</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </>
          ) : (
            <Button variant="outline-secondary" onClick={disabledLogin}>Disabled</Button>
          )}
        </Container>
      </Navbar>
    </Container>
  );
};

export default Navibar;
