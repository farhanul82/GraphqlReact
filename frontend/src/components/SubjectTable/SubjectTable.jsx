import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudent, fetchSubjects } from '../../Redux/Action/action';

import './subjectTable.css'

import EditStudent from '../EditStudent/EditStudent';

import { AiFillDelete } from 'react-icons/ai';

const SubjectTable = props => {
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
    const initDataShow = props.limit && subject ? subject.slice(0, Number(props.limit)) : subject

    const [dataShow, setDataShow] = useState(initDataShow)

    let pages = 1

    let range = []

    if (props.limit !== undefined) {
        let page = Math.floor(subject.length / Number(props.limit))
        pages = subject.length % Number(props.limit) === 0 ? page : page + 1
        range = [...Array(pages).keys()]

    }

    const [currPage, setCurrPage] = useState(0)

    const selectPage = page => {
        const start = Number(props.limit) * page
        const end = start + Number(props.limit)

        setDataShow(subject.slice(start, end))

        setCurrPage(page)
    }

 


    return (
        <div>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Student</th>
                        
                        </tr>
 

                    </thead>


                    {
                        subject ? (
                            <tbody>
                                {
                                    subject.map((item, index) => {

                                        return (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.student.map(x => x.name + ',')}</td>

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

export default SubjectTable


