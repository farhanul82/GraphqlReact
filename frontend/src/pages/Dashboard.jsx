import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'


import AddStudent from '../components/addStudent/AddStudent'
import { fetchStudent, fetchSubjects } from '../Redux/Action/action'
import EditStudent from '../components/EditStudent/EditStudent'

import Chart from '../components/Chart/Chart'

import { AiFillDelete } from 'react-icons/ai';
import AddSubject from '../components/AddSubject/AddSubject'
import StudentTable from '../components/StudentTable/StudentTable'
import SubjectTable from '../components/SubjectTable/SubjectTable'






const Dashboard = () => {

 
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStudent())
        dispatch(fetchSubjects())
    }, []);

    const student = useSelector(state => state.store.student)
    const subject = useSelector(state => state.store.subject)

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
                           <SubjectTable/>
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
                           <StudentTable/>

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
