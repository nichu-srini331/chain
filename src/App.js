import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {ethers} from 'ethers'
import SimpleStorage_abi from './SimpleStorage_abi.json'

function App() {

  const contractAddress = '0xA88cF56D02F9d41f077A74C604C87262F876Fa03';

  const [error,seterror] = useState(null)
  const[default_acc,setdefault_acc] = useState(null)
  const[connButton,setconnButton] = useState('CONNECT TO Wallet')

  const[current_val,setcurr_val] = useState(null)

  const[provider,setprovider] = useState(null)
  const[signer,setsigner] = useState(null)
  const[contract,setcontract] = useState(null)

  const connectWallet = () => {
    if(window.ethereum){
      window.ethereum.request({method:'eth_requestAccounts'}).then(res=>{
        accChangeHandler(res[0]);
        setconnButton("Connected")
      })

    }else{
      seterror('Need Metamask !')
    }

  }

  const accChangeHandler = (newAcc) => {
    setdefault_acc(newAcc)
    updateEthers();
  }
  const updateEthers = async() => {
    let tempProvider = new ethers.BrowserProvider(window.ethereum);
		setprovider(tempProvider);

		let tempsigner = await tempProvider.getSigner();
		setsigner(tempsigner);

		let tempContract = new ethers.Contract(contractAddress, SimpleStorage_abi, tempsigner);
		setcontract(tempContract);	
	}

const getCurrentValue = async() => {
  let val = await contract.get();
  setcurr_val(val);
}

const setHandler = (e) => {
  e.preventDefault();
  contract.set(e.target.t1.value);
}

  return (
    <div className="App">
      <h1>LEARNING MANAGMENT</h1>

      <h2>Connect to your wallet to Log In</h2>

      <button onClick={connectWallet}>{connButton}</button>
      <h3>Your account : {default_acc}</h3>
    {error}
    
    <form onSubmit={setHandler}>
      <h1>Enter the Course You have completed : </h1>
      <input type='text' id='t1'/>
      
      <button type='submit' className='cls'>Update Course</button>
    </form>
    <br></br>
      <br></br>
<h3>Click to know the Completed Course</h3>
    <button onClick={getCurrentValue}> Get Completed Course</button>
    <br></br>
   <h2>1.{current_val}</h2> 
    </div>
  );
}

export default App;
