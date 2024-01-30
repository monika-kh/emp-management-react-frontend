import React, { useEffect, useState } from "react";
import axios from "axios";

import "./addattendence.css";
import { AlipaySquareFilled } from "@ant-design/icons";

const AddAttendence = () => {
    const [checked, setChecked] = useState([]);
    const [employeelist, setEmployeeList] = useState([])
    const [date, setDate] = useState(new Date());
    const [markAttendence, setmarkAttendence] = useState(false)


    const token = JSON.parse(localStorage.getItem('user_details')).access

    const currentDate = () => {
        return (
            <div>
                Date: {date.toDateString()}
            </div>)

    }

    const handleAttendenceCheck = (event, emp) => {

        const data = {
            "employee": emp,
            "is_present": event.target.checked
        }
        addattendenceHandler(data)
        setmarkAttendence(!isChecked);
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);

        console.log("---------------", updatedList)
    };
    

    const handleHalfdayCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
       
    };

    // Return classes based on whether item is checked
    var isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";

    useEffect(() => {
        empListHandler()
    }, [])


    async function empListHandler() {
        const response = await axios.get("http://127.0.0.1:8000/employee/users/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setEmployeeList(res.data)
            return res.data
        }).then(console.log(employeelist.data))

    }


    async function addattendenceHandler(data) {
        const response = await axios.post("http://127.0.0.1:8000/employee/add-attendence/", data, { 
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then (res => {
            console.log(res.data)
            return res.data
        }).then(console.log("resp"))

        
    }

    return (

        <div class="add-container">
            <h4 class="time-heading">{currentDate()}</h4>
            <div class="add-main-body">
                <div class="col-md-4 mb-3">
                    <div className="app">
                        <div className="attendance-table">
                            <h3 class="main-heading">Attendance</h3>
                            <table>
                                <thead>
                                    <tr class="tr-head">
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Attendance</th>
                                        <th>Half Day Leave</th>
                                    </tr>
                                </thead>
                                <tbody class="t-body">
                                    {employeelist.length > 0 ? (
                                        employeelist.map((emp, index) => (
                                            <tr class="tr-data" key={emp.user_id}>
                                                <td>{index + 1}</td>
                                                <td>{emp.name}</td>
                                                <td>
                                                    <input
                                                        value={emp.user_id}
                                                        type="checkbox"
                                                        onChange={(event) => handleAttendenceCheck(event, emp.user_id)}
                                                        checked={checked.includes(emp.user_id)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        value={emp.name}
                                                        type="checkbox"
                                                        onChange={(event)=>handleHalfdayCheck(event, emp.user_id)}
                                                        checked={checked.includes(emp.name)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr class="tr-data">
                                            <td colSpan="3">No data found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div />
        </div>




    )
}
export default AddAttendence;