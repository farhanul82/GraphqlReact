import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Table from '../components/table/Table'
import { fetchStudent, fetchSubjects } from '../Redux/Action/action'



const Student = [
    'name',
    'email',
    'phone',
    "dateOfBirth",
    "subject",

]



const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.dateOfBirth}</td>
        <td>{item.subject?.map(x => x.name + ',')}</td>



    </tr>
)

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
                            {studentData ? (<Table
                                limit='10'
                                headData={Student}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={studentData}
                                renderBody={(item, index) => renderBody(item, index)}
                            />) : (<div></div>)}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Students