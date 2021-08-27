import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addStudent, fetchStudent, fetchSubjects, getSubjectName } from "../../Redux/Action/action"
import "./addStudent.css"
import Select from "react-select"



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



const AddStudent = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSubjectName())
  }, [])

  const subname = useSelector(state => state.store.subName)
  
  const dropdown_toggle_el = useRef(null)
  const dropdown_content_el = useRef(null)



  clickOutsideRef(dropdown_content_el, dropdown_toggle_el)

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [bDate, setBDate] = useState()
  const [subjectName, setSubjectNAme] = useState([])

  const a = [...subname.map((x,index)=>{
    return({
      value:`${x.name}`,
      label:`${x.name}`
    })
  })]




  const studentAdd=async(e)=>{
    e.preventDefault()
    console.log(name,email,phone,bDate,subjectName)
    if(subjectName.length==2){
     await dispatch(addStudent(name,email,phone,bDate,subjectName))
     await  dispatch(fetchStudent())
     await  dispatch(fetchSubjects())
    }else{
      alert("Please Select Two Subjects")
    }
  
  }
  

  return (
    <>
      <button ref={dropdown_toggle_el} className="dropdown__toggle btn addBtn">Add</button>

      <div ref={dropdown_content_el} className="dropdown__content">

        <form className="loginForm" onSubmit={(e)=>studentAdd(e)}>
          <div className="form-group">

            <input
              type="text"
              placeholder='Name'
              className="form-control"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="form-group">

            <input
              type="text"
              placeholder='Email'
              className="form-control"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

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

          <div className="form-group">

            <input
              type="date"
              placeholder='Date of Birth'
              className="form-control"
              name="bDate"
              onChange={(e) => setBDate(e.target.value)}
              value={bDate}
            />
          </div>
          

          <label htmlFor="select" className="mt-3">Select any two</label>
         
          <Select  isMulti options={a} onChange={(e)=>setSubjectNAme([...e.map(x=>x.label)])}></Select>

              {/* {a.map((x,index) => {
                return (<option value={index}>{x}</option>)

              })} */}
        

        <input type="submit" value="Add" className="btn btn-danger mt-2 submitAddBtn" />
        </form>
      </div>
    </>
  )
}

export default AddStudent