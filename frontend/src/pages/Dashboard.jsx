import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'



import { useDispatch, useSelector } from 'react-redux'

import Table from '../components/table/Table'

import * as constants from '../constants'

import axios from 'axios'

import AddStudent from '../components/addStudent/AddStudent'
import { fetchStudent, fetchSubjects } from '../Redux/Action/action'
import EditStudent from '../components/EditStudent/EditStudent'

import Chart from '../components/Chart/Chart'

import { AiFillDelete } from 'react-icons/ai';
import AddSubject from '../components/AddSubject/AddSubject'



const Subjects = {
    head: [

        'Subject',
        'Student',

    ]
}


const renderSubjectHead = (item, index) => (
    <th key={index}>{item}</th>
)


const renderSubjectBody = (item, index) => (
    <tr key={index}>

        <td>{item.name}</td>
        <td>{item.student.map(x => x.name + ',')}</td>
       
    </tr>
)


const Students = {
    header: [
        'name',
        'email',
        'phone',
        "dateOfBirth",
        "subject",
        "action"
    ]
}



const renderHead = (item, index) => (
    <th key={index}>{item}</th>
)










const Dashboard = () => {

    const deleteStudent = (id) => {
        const requestBody = {
            query: `
                mutation{
                    deleteStudent(_id:"${id}"){
                      name
                    }
                }
              `}
    
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(r => {
                console.log(r.data)
    
            })
    
    
    }



    const renderBody = (item, index) => {
        return (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.dateOfBirth}</td>
                <td>{item.subject.map(x => x.name + ',')}</td>
                <td><button className="btn" onClick={() => deleteStudent(item._id)}><AiFillDelete /></button>
                    <EditStudent id={item._id} />
                </td>
    
            </tr>
        )
    
    
    }
    
    // const [students, setStudent] = useState()
    // const [subject, setSubject] = useState()


    // const fetchStudents = () => {
    //     const requestBody = {
    //         query: `
    //     query{
    //         students{
    //             _id
    //           name
    //           email
    //           phone
    //           dateOfBirth
    //           subject{
    //               name
    //           }
    //         }
    //       }
    //       `}


    //     fetch('http://localhost:4000/graphql', {
    //         method: 'POST',
    //         body: JSON.stringify(requestBody),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(response => response.json())
    //         .then(r => setStudent(r.data.students))
    // }


    // const fetchSubjects = () => {
    //     const requestBodySubject = {
    //         query: `
    //     query{
    //         subjects{
    //           _id
    //           name
    //           student{
    //             name
    //           }
    //         }
    //       }
    //       `}

    //     fetch('http://localhost:4000/graphql', {
    //         method: 'POST',
    //         body: JSON.stringify(requestBodySubject),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(response => response.json())
    //         .then(r => setSubject(r.data.subjects))

    // }
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchStudent())
        dispatch(fetchSubjects())
        //  fetchStudents()
        //   fetchSubjects()
        



    }, []);

    const student = useSelector(state => state.store.student)
    const subject = useSelector(state => state.store.subject)



    console.log(subject)
    return (
        <div>
            <h2 className="page-header">Dashboard</h2>
            <div className="row">


                <div className="col-6">
                    <div className="card full-height">
                        <Chart
                            type='line'
                            height='100%'
                        />
                    </div>
                </div>



                <div className="col-6">
                    <div className="card">
                        <div className="card__header">
                            <h3>Subjects</h3>
                        </div>
                        <div className="card__body">
                            {subject ? (
                                <div>
                                    <Table
                                        headData={Subjects.head}
                                        renderHead={(item, index) => renderSubjectHead(item, index)}
                                        bodyData={subject}
                                        renderBody={(item, index) => renderSubjectBody(item, index)}
                                    />
                                </div>
                            ) : (<div></div>)}
                              <div className="card__footer">
                        
                            <AddSubject />
                        </div>

                        </div>

                    </div>
                </div>

                <div className="col-12">
                    <div className="card">
                        <div className="card__header">
                            <h3>Students List</h3>
                        </div>
                        <div className="card__body">
                            {student ? (
                                <div>
                                    <Table
                                        headData={Students.header}
                                        renderHead={(item, index) => renderHead(item, index)}
                                        bodyData={student}
                                        renderBody={(item, index) => renderBody(item, index)}
                                    />
                                </div>
                            ) : (<div></div>)
                            }

                        </div>
                        <div className="card__footer">
                            <Link to='/students'>view all</Link>
                            <AddStudent />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Dashboard
