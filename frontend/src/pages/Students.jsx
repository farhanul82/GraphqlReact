import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StudentTable from '../components/StudentTable/StudentTable'


import { fetchStudent, fetchSubjects } from '../Redux/Action/action'


const Students = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchStudent())
    }, [])

    const studentData = useSelector(state => state.store.student)
    return (
        <div>
            <h2 className="page-header">
                Students
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                           <StudentTable/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Students