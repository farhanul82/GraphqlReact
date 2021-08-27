import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import "./editForm.css"

import { fetchStudent, updateEmail, updateName, updatePhone } from '../../Redux/Action/action'

import { AiTwotoneEdit } from 'react-icons/ai';




const clickOutsideRef = (content_ref, toggle_ref) => {
    document.addEventListener('mousedown', (e) => {

        // user click toggle
        if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
            content_ref.current.classList.toggle('active')
        } else {
            // user click outside toggle and content
            if (content_ref.current && !content_ref.current.contains(e.target)) {
                content_ref.current.classList.remove('active')
            }
        }
    })
}


const EditStudent = ({id}) => {
    const dropdown_toggle_el = useRef(null)
    const dropdown_content_el = useRef(null)
    const dispatch = useDispatch()

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [bDate, setBDate] = useState()
    const [subjectName, setSubjectNAme] = useState([])
  

    const nameUpdate=(e)=>{
        e.preventDefault()
        console.log(name)
        dispatch(updateName(id,name)) 
        dispatch(fetchStudent())
       }

       const emailUpdate=(e)=>{
        e.preventDefault()
        console.log(name)
        dispatch(updateEmail(id,email)) 
        dispatch(fetchStudent())
       }

       const phoneUpdate=(e)=>{
        e.preventDefault()
        console.log(name)
        dispatch(updatePhone(id,phone)) 
        dispatch(fetchStudent())
       }

    clickOutsideRef(dropdown_content_el, dropdown_toggle_el)
    return (
        <>
            <button ref={dropdown_toggle_el} className="dropdown__toggle"><AiTwotoneEdit/></button>

            <div ref={dropdown_content_el} className="dropdown__content">
                <form className="EditForm" onSubmit={(e)=>nameUpdate(e)}>
                    <div className="form-group">

                        <input
                            type="text"
                            placeholder='Name'
                            className="form-control"
                            name="username"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <input type="submit" value="submit"  className=" btn EditSubmitBtn"></input>
                </form>


                <form className="EditForm" onSubmit={(e)=>emailUpdate(e)}>
                    <div className="form-group">

                        <input
                            type="text"
                            placeholder='email'
                            className="form-control"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <input type="submit" value="submit" className=" btn EditSubmitBtn"></input>
                </form>

                <form className="EditForm" onSubmit={(e)=>phoneUpdate(e)}>
                    <div className="form-group">

                        <input
                            type="text"
                            placeholder='Phone'
                            className="form-control"
                            name="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                        />
                    </div>
                    <input type="submit" value="submit"  className=" btn EditSubmitBtn"></input>
                </form>

              
            </div>
        </>
    )
}

export default EditStudent