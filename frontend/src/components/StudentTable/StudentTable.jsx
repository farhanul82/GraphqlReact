import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudent, fetchSubjects } from '../../Redux/Action/action';

import './studentTable.css'

import EditStudent from '../EditStudent/EditStudent';

import { AiFillDelete } from 'react-icons/ai';

const StudentTable = props => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchStudent())
        dispatch(fetchSubjects())
        //  fetchStudents()
        //   fetchSubjects()




    }, []);

    const student = useSelector(state => state.store.student)
    const subject = useSelector(state => state.store.subject)


    // console.log(props)
    const initDataShow = props.limit && student ? student.slice(0, Number(props.limit)) : student

    const [dataShow, setDataShow] = useState(initDataShow)

    let pages = 1

    let range = []

    if (props.limit !== undefined) {
        let page = Math.floor(student.length / Number(props.limit))
        pages = student.length % Number(props.limit) === 0 ? page : page + 1
        range = [...Array(pages).keys()]

    }

    const [currPage, setCurrPage] = useState(0)

    const selectPage = page => {
        const start = Number(props.limit) * page
        const end = start + Number(props.limit)

        setDataShow(student.slice(start, end))

        setCurrPage(page)
    }

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
                alert("Successfully Deleted")

            })


    }


    return (
        <div>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>dateOfBirth</th>
                            <th>subject</th>
                            <th>action</th>
                        </tr>


                    </thead>

               
                        {
                            student ? (
                                <tbody>
                                    {
                                        student.map((item, index) => {

                                            return (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.dateOfBirth}</td>
                                                    <td>{item.subject?.map(x => x.name + ',')}</td>
                                                    <td><button className="btn" onClick={() => deleteStudent(item._id)}><AiFillDelete /></button>
                                                        <EditStudent id={item._id} />
                                                    </td>

                                                </tr>
                                            )

                                        })
                                    }
                                </tbody>
                            ) : null
                        }
          

                </table>
            </div>
            {
                pages > 1 ? (
                    <div className="table__pagination">
                        {
                            range.map((item, index) => (
                                <div key={index} className={`table__pagination-item ${currPage === index ? 'active' : ''}`} onClick={() => selectPage(index)}>
                                    {item + 1}
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </div>
    )
}

export default StudentTable


