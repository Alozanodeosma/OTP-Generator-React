import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [timer,setTimer] = useState(5);

  useEffect(() => {
    if (timer === 0) return;
    const id = setTimeout(() => {
      setTimer(t => t - 1);
    }, 1000);
    return () => clearTimeout(id);
  }, [timer]);
  
  const [password, setPassword]=useState(`Click 'Generate OTP' to get a one-time password`);
  const [isClicked, setIsClicked] = useState(false);

 function createOTP(digits) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);      
  return (array[0] % 10 ** digits)
    .toString()
    .padStart(digits, '0');
}

  const generateOTP = ()=>{
    setPassword(createOTP(6));
    setIsClicked(true);
    setTimer(5);
    }

  if(!isClicked){
    return(
    <div className="container">
      <h1 id="otp-title">OTP Generator</h1>
      <h2 id="otp-display">{password}</h2>
      <p id="otp-timer" aria-live="polite"></p>
      <button id="generate-otp-button" onClick={generateOTP}>Generate OTP</button>
    </div>
  )
  }
  return(
    <div className="container">
      <h1 id="otp-title">OTP Generator</h1>
      <h2 id="otp-display">{password}</h2>
      <p id="otp-timer" aria-live="polite">{timer ? `Expires in: ${timer} seconds` : `OTP expired. Click the button to generate a new OTP.`}</p>
      <button id="generate-otp-button" onClick={generateOTP} disabled={timer > 0}>Generate OTP</button>
    </div>
  )
};
export default App
