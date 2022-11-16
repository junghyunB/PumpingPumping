import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Timer = () => {

    const dispatch = useDispatch()
    let deadline = useRef(); 
    let timer = useRef(null); 
    
    const [deadlineDate, setDeadlineDate] = useState(new Date('11 16, 2022 18:30:00').getTime());
    let now = new Date().getTime();
    let t = deadlineDate - now;
    let day = Math.floor((t % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((t % (1000 * 60)) / 1000);
    
    const [state, setState] = useState({ day, hours, minutes, seconds});


    const count = () => {

      now = new Date().getTime();
      t = deadline - now;
      day = Math.floor((t % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
      hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((t % (1000 * 60)) / 1000);

      setState({ day, hours, minutes, seconds });
    
    }


    const ChangeTimer = () => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const date = new Date().getDate();
        if(t < -700 && t > -1500) {
            console.log(1)
            setDeadlineDate(new Date(`${month + 1} ${date} ${year} 18:30:00`).getTime())
        }
    }

    useEffect(() => {
        deadline = deadlineDate;
        timer.current = setInterval(count, 1000); 
    },[])

    useEffect(() => {
        ChangeTimer();
    }, [t])



  return (
    <div>
        <p>MODE #2 Ramain Time</p>
        <p>
            {state.day < 10 ? `${state.day}` : state.day}D &nbsp; 
            {state.hours < 10 ? `${state.hours}` : state.hours}H &nbsp;
            {state.minutes < 10 ? `${state.minutes}` : state.minutes}M &nbsp;
            {state.seconds < 10 ? `${state.seconds}` : state.seconds}S &nbsp;
        </p>
    </div>
  )
}

export default Timer