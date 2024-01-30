import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './timetracker.css';
import Clock from 'react-simple-clock'
import { useTimer } from './TimerContext';
const Dashboard = () => {
    const token = JSON.parse(localStorage.getItem('user_details')).access
    const user = JSON.parse(localStorage.getItem('user_details')).user_id
    const [date, setDate] = useState(new Date());
    const [isTimerRunning, setTimerRunning] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const { timer, startTimer, stopTimer } = useTimer();


    const currentDate = () => {
        return (
            <div>
                {date.toDateString()}
            </div>
            )
    }

    const clock = () => {
        return (
            <div>

                <Clock live={true} hourMarkFormat="number" className="clock-class" mode="dark" />
            </div>
        )
    }


    // useEffect(() => {
    //     let interval;

    //     if (isTimerRunning) {
    //         interval = setInterval(() => {
    //             setCurrentTime((prevTime) => prevTime + 1);
    //         }, 1000);
    //     } else {
    //         clearInterval(interval);
    //     }

    //     return () => clearInterval(interval);
    // }, [isTimerRunning]);


    
    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const handleToggle = async () => {
        if(!isTimerRunning){
            startTimer()
            setTimerRunning(true);
        }
        else if (isTimerRunning) {
            const stopTime = new Date();
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const elapsedTimeInSeconds = Math.floor((stopTime - startTime) / 1000);
            const formatdate = stopTime.toLocaleDateString('en-US', options).replace(/\//g, '-').split('-')
            const todayDate = (formatdate[2] + '-' + formatdate[0] + '-' + formatdate[1]);
            const payload = {
                user: user,
                seconds: elapsedTimeInSeconds,
                date: todayDate
            };
            await axios.post('http://localhost:8000/api/record-time/', payload);
            stopTimer()
            setTimerRunning(false);
        } else {
            setStartTime(new Date());
            stopTimer()
            setTimerRunning(false);
        }
    };

    return (
        <div class="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ margin: '15px 25px' }}>

                    <div class="textstyle">
                        <h1 class="heading-tag-1">Dashboard</h1>

                        <div class="date-time">
                            <div className="formatted-time-box">
                            <p className="formatted-time">{formatTime(timer.time)}</p>
                        </div>
                            <button class="sign-up-button" onClick={handleToggle}>
                                {isTimerRunning ? 'Stop Timer' : 'Start Timer'}
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', margin: '70px 15px' }}>
                    <h4 class="heading-tag-2">{currentDate()}</h4>

                    <div style={{ border: '5px solid black', padding: '25px 25px', borderRadius: '5px' }}>
                        {clock()}
                    
                    </div>

                </div>

            </div>
            <div class="row gutters-sm">
              <div class="col-sm-6 mb-3">
                <div class="card h-100">
                  <div class="card-body">
                    <h6 class="d-flex align-items-center mb-3 "><i class="material-icons text-info mr-2 card-text-style">Birthdays</i></h6>
                    {/* <small>Working Days</small>
                    <div class="progress mb-3" style={{ height: "5px" }}>
                      <div class="progress-bar bg-primary" role="progressbar" style={{ width: "80%" }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>No. of days Present</small>
                    <div class="progress mb-3" style={{ height: "5px" }}>
                      <div class="progress-bar bg-primary" role="progressbar" style={{ width: "72%" }} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>No. of days Absent</small>
                    <div class="progress mb-3" style={{ height: "5px" }}>
                      <div class="progress-bar bg-primary" role="progressbar" style={{ width: "89%" }} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>No. of Half-days</small>
                    <div class="progress mb-3" style={{ height: "5px" }}>
                      <div class="progress-bar bg-primary" role="progressbar" style={{ width: "55%" }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                    </div> */}
                    {/* <small>Backend API</small>
                    <div class="progress mb-3" style={{ height: "5px" }}>
                      <div class="progress-bar bg-primary" role="progressbar" style={{ width: "66%" }} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div class="col-sm-6 mb-3">
                <div class="card h-100">
                  <div class="card-body">
                    <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2 card-text-style">On Leaves Today</i></h6>
                    {/* <small>Total Yearly Leaves</small>
                    <div class="progress mb-3" style={{ height: "5px" }}>
                      <div class="progress-bar bg-primary" role="progressbar" style={{ width: "80%" }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>Remaining Leaves </small>
                    <div class="progress mb-3" style={{ height: "5px" }}>
                      <div class="progress-bar bg-primary" role="progressbar" style={{ width: "89%" }} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>Total Monthly Leaves</small>
                    <div class="progress mb-3" style={{ height: "5px" }}>
                      <div class="progress-bar bg-primary" role="progressbar" style={{ width: "72%" }} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>Leaves taken in this month</small>
                    <div class="progress mb-3" style={{ height: "5px" }}>
                      <div class="progress-bar bg-primary" role="progressbar" style={{ width: "55%" }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                    </div> */}
                    {/* <small>Backend API</small>
                    <div class="progress mb-3" style={{ height: "5px" }}>
                      <div class="progress-bar bg-primary" role="progressbar" style={{ width: "66%" }} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

        </div>
    );
};

export default Dashboard;
