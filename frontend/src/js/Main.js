import "../css/Main.css";
import { PeraWalletConnect } from "@perawallet/connect";
import algosdk, { waitForConfirmation } from "algosdk";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';

//const crypto = require("crypto");



const peraWallet = new PeraWalletConnect();

// The app ID on testnet
// RPS app
const appIndex = 204422644;
const appAddress = "IFAPOCAHFVCZXLPVI4AWTHOG5OMEH4HD2YVT3DH6G6THAPCITH726S7ZY4";

// connect to the algorand node
// token, address(server), port
const algod = new algosdk.Algodv2(
  "",
  "https://testnet-api.algonode.cloud",
  443
);






function Main() {
  const [accountAddress, setAccountAddress] = useState(null);
  const [owner, setOwner] = useState(null);
  const [cotton, setCotton] = useState(null);
  const [elasticity, setElasticity] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress; //convert string to boolean

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        peraWallet.connector.on("disconnect", handleDisconnectWalletClick);
        console.log(accounts);
        if (accounts.length) {
          setAccountAddress(accounts[0]);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Container>
      <meta name="name" content="Testing frontend for PyTeal" />
      
      <h1 > CREATE SMART CONTRACT WITH YOUR PARTNER</h1>
      <div className="maindiv">
      <Row>
        <Col>
          <Button id="connectButton"
            onClick={
              isConnectedToPeraWallet
                ? handleDisconnectWalletClick
                : handleConnectWalletClick
            }
          >
            {isConnectedToPeraWallet ? "Disconnect" : "Connect to Wallet"}
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Button id="optinButton" onClick={() => optInApp()}>OptIn</Button>
        </Col>
      </Row>
      </div>
      <br />
      <div className="subdiv" >
      <Row>
        <Col>
          <Button id="buttons" onClick={() => setOwner(true)}><b>Start Contract</b></Button>
        </Col>
        
        <Col>
          <Button id="buttons" onClick={() => resolveApplication()}><b>Resolve Contract</b></Button>
        </Col>
      </Row>
      </div>
      <br />
      
      
      <Row>
        <Col id="firstCol">
        <h4> Choose percentage of cotton:</h4>
        <ListGroup id="list">
      
      <ListGroup.Item action variant="danger" 
       onClick={
            !!owner === true

            ? () =>{
            
              
              setCotton("0");
            
          }
          : () => setCotton("0")
        }>
     
        0 %
      </ListGroup.Item>
      <ListGroup.Item action variant="light"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setCotton("10");
        
      }
      : () => setCotton("10")
    }>
        10 %
      </ListGroup.Item>
      <ListGroup.Item action variant="danger"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setCotton("20");
        
      }
      : () => setCotton("20")
    }>
        20 %
      </ListGroup.Item>
      <ListGroup.Item action variant="light"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setCotton("30");
        
      }
      : () => setCotton("30")
    }>
        30 %
      </ListGroup.Item>
      <ListGroup.Item action variant="danger"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setCotton("40");
        
      }
      : () => setCotton("40")
    }>
        40 %
      </ListGroup.Item>
      <ListGroup.Item action variant="light"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setCotton("50");
        
      }
      : () => setCotton("50")
    }>
        50 %
      </ListGroup.Item>
      <ListGroup.Item action variant="danger"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setCotton("60");
        
      }
      : () => setCotton("60")
    }>
        60 %
      </ListGroup.Item>
      <ListGroup.Item action variant="light"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setCotton("70");
        
      }
      : () => setCotton("70")
    }>
        70 %
      </ListGroup.Item>
      <ListGroup.Item action variant="danger"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setCotton("80");
        
      }
      : () => setCotton("80")
    }>
        80 %
      </ListGroup.Item>
      <ListGroup.Item action variant="light"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setCotton("90");
        
      }
      : () => setCotton("90")
    }>
        90 %
      </ListGroup.Item>
      <ListGroup.Item action variant="danger"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setCotton("100");
        
      }
      : () => setCotton("100")
    }>
        100 %
      </ListGroup.Item>
    </ListGroup>

          
        
        <br />
        
        </Col>

        <Col>
        <h4> Choose percentage of elasticity:</h4>
        <ListGroup id="list">
      
      <ListGroup.Item action variant="danger"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setElasticity("0");
        
      }
      : () => setElasticity("0")
    }>
        0 %
      </ListGroup.Item>
      <ListGroup.Item action variant="light"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setElasticity("10");
        
      }
      : () => setElasticity("10")
    }>
        10 %
      </ListGroup.Item>
      <ListGroup.Item action variant="danger"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setElasticity("20");
        
      }
      : () => setElasticity("20")
    }>
        20 %
      </ListGroup.Item>
      <ListGroup.Item action variant="light"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setElasticity("30");
        
      }
      : () => setElasticity("30")
    }>
        30 %
      </ListGroup.Item>
      <ListGroup.Item action variant="danger"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setElasticity("40");
        
      }
      : () => setElasticity("40")
    }>
        40 %
      </ListGroup.Item>
      <ListGroup.Item action variant="light"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setElasticity("50");
        
      }
      : () => setElasticity("50")
    }>
        50 %
      </ListGroup.Item>
      <ListGroup.Item action variant="danger"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setElasticity("60");
        
      }
      : () => setElasticity("60")
    }>
        60 %
      </ListGroup.Item>
      <ListGroup.Item action variant="light"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setElasticity("70");
        
      }
      : () => setElasticity("70")
    }>
        70 %
      </ListGroup.Item>
      <ListGroup.Item action variant="danger"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setElasticity("80");
        
      }
      : () => setElasticity("80")
    }>
        80 %
      </ListGroup.Item>
      <ListGroup.Item action variant="light"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setElasticity("90");
        
      }
      : () => setElasticity("90")
    }>
        90 %
      </ListGroup.Item>
      <ListGroup.Item action variant="danger"
      onClick={
        !!owner === true

        ? () =>{
        
          
          setElasticity("100");
        
      }
      : () => setElasticity("100")
    }>
        100 %
      </ListGroup.Item>
    </ListGroup>
         
        
        <br />
        <br />

        </Col>

        <Col>
        <h4> Choose quantity of your order:</h4>
        <ListGroup id="list">
      
      <ListGroup.Item action variant="danger"
      onClick={
        !!owner === true
          ? () =>
              startApplication(
                
                "50"
               
              )
          : () => joinApplication("50")
      }>
        50
      </ListGroup.Item>
      <ListGroup.Item action variant="light"
      onClick={
        !!owner === true
          ? () =>
              startApplication(
                
                "100"
               
              )
          : () => joinApplication("100")
      }>
        100
      </ListGroup.Item>
      <ListGroup.Item action variant="danger"
      onClick={
        !!owner === true
          ? () =>
              startApplication(
                
                "150"
               
              )
          : () => joinApplication("150")
      }>
        150
      </ListGroup.Item>
      <ListGroup.Item action variant="light"
      onClick={
        !!owner === true
          ? () =>
              startApplication(
                
                "200"
               
              )
          : () => joinApplication("200")
      }>
        200
      </ListGroup.Item>
      <ListGroup.Item action variant="danger"
      onClick={
        !!owner === true
          ? () =>
              startApplication(
                
                "250"
               
              )
          : () => joinApplication("250")
      }>
        250
      </ListGroup.Item>
      
    </ListGroup>
    </Col>
        </Row>
    </Container>
  );

  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        peraWallet.connector.on("disconnect", handleDisconnectWalletClick);
        setAccountAddress(newAccounts[0]);
      })
      .catch((error) => {
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          console.log(error);
        }
      });
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();
    setAccountAddress(null);
  }

  async function optInApp() {
    try {
      // get suggested params
      const suggestedParams = await algod.getTransactionParams().do();

      const actionTx = algosdk.makeApplicationOptInTxn(
        accountAddress,
        suggestedParams,
        appIndex
      );

      const actionTxGroup = [{ txn: actionTx, signers: [accountAddress] }];

      const signedTx = await peraWallet.signTransaction([actionTxGroup]);
      console.log(signedTx);
      const { txId } = await algod.sendRawTransaction(signedTx).do();
      const result = await waitForConfirmation(algod, txId, 2);
    } catch (e) {
      console.error(`There was an error calling the rps app: ${e}`);
    }
  }

 

  async function startApplication(

    quantity="50"
  ) {
    try {
      
      setQuantity(quantity);
      // get suggested params
      const suggestedParams = await algod.getTransactionParams().do();
      const appArgs = [
        new Uint8Array(Buffer.from("start")),
        
        new Uint8Array(Buffer.from(cotton)),
        new Uint8Array(Buffer.from(elasticity)),
        new Uint8Array(Buffer.from(quantity))
      ];

      const accounts = [
        "IM3DRDXE4T4RK65XEVPDKPPEZFJTTQWXSNJVFMLQC7NY4ZIDZWPZ2UD2H4",
      ];

      let actionTx = algosdk.makeApplicationNoOpTxn(
        accountAddress,
        suggestedParams,
        appIndex,
        appArgs,
        accounts
      );

      let payTx = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: accountAddress,
        to: appAddress,
        amount: 100000,
        suggestedParams: suggestedParams,
      });

      let txns = [actionTx, payTx];
      algosdk.assignGroupID(txns);

      const actionTxGroup = [
        { txn: actionTx, signers: [accountAddress] },
        { txn: payTx, signers: [accountAddress] },
      ];

      const signedTxns = await peraWallet.signTransaction([actionTxGroup]);

      console.log(signedTxns);
      const { txId } = await algod.sendRawTransaction(signedTxns).do();
      const result = await waitForConfirmation(algod, txId, 4);
      // checkCounterState();
    } catch (e) {
      console.error(`There was an error calling the rps app: ${e}`);
    }
  }

  
  async function joinApplication(quantity) {
    try {
      
      const suggestedParams = await algod.getTransactionParams().do();
      const appArgs = [
        new Uint8Array(Buffer.from("accept")),
        new Uint8Array(Buffer.from(cotton)),
        new Uint8Array(Buffer.from(elasticity)),
        new Uint8Array(Buffer.from(quantity)),
        new Uint8Array(Buffer.from("DAM")),
        new Uint8Array(Buffer.from("Fasion inspect"))
        
        
      ];

     
      const accounts = [
        "PNVYDHXOMOKSE5AQVJI4JJCXI3SSSL7BIS2C7HSD3ZRRJYPXXA5K7RAFU4",
      ];

      let actionTx = algosdk.makeApplicationNoOpTxn(
        accountAddress,
        suggestedParams,
        appIndex,
        appArgs,
        accounts
      );

      let payTx = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: accountAddress,
        to: appAddress,
        amount: 100000,
        suggestedParams: suggestedParams,
      });

      let txns = [actionTx, payTx];
      algosdk.assignGroupID(txns);

      const actionTxGroup = [
        { txn: actionTx, signers: [accountAddress] },
        { txn: payTx, signers: [accountAddress] },
      ];

      const signedTxns = await peraWallet.signTransaction([actionTxGroup]);

      console.log(signedTxns);
      const { txId } = await algod.sendRawTransaction(signedTxns).do();
      const result = await waitForConfirmation(algod, txId, 4);
      // checkCounterState();
    } catch (e) {
      console.error(`There was an error calling the rps app: ${e}`);
    }
  }

  
  async function resolveApplication() {
    try {

      const suggestedParams = await algod.getTransactionParams().do();
      const appArgs = [
        new Uint8Array(Buffer.from("resolve"))
        
      ];

      
      const accounts = [
        "IM3DRDXE4T4RK65XEVPDKPPEZFJTTQWXSNJVFMLQC7NY4ZIDZWPZ2UD2H4",
      ];

      let actionTx = algosdk.makeApplicationNoOpTxn(
        accountAddress,
        suggestedParams,
        appIndex,
        appArgs,
        accounts
      );

      const actionTxGroup = [{ txn: actionTx, signers: [accountAddress] }];

      const signedTxns = await peraWallet.signTransaction([actionTxGroup]);
      const txns = [signedTxns];

      console.log(signedTxns);

      //const dr = algosdk.createDryrun(algod, txns);

      //test debugging
      //const dryRunResult = await algod.dryrun(dr).do();
      //console.log(dryRunResult);

      const { txId } = await algod.sendRawTransaction(signedTxns).do();
      const result = await waitForConfirmation(algod, txId, 4);
      console.log(result);
    } catch (e) {
      console.error(`There was an error calling the rps app: ${e}`);
    }
  }

  // Clear state
  // {
  //   "txn": {
  //     "apan": 3,
  //     "apid": 51,
  //     "fee": 1000,
  //     "fv": 13231,
  //     "gh": "ALXYc8IX90hlq7olIdloOUZjWfbnA3Ix1N5vLn81zI8=",
  //     "lv": 14231,
  //     "note": "U93ZQy24zJ0=",
  //     "snd": "LNTMAFSF43V7RQ7FBBRAWPXYZPVEBGKPNUELHHRFMCAWSARPFUYD2A623I",
  //     "type": "appl"
  //   }
  // }
}

export default Main;