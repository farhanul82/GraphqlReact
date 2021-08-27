import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addStudent, addSubjectt, fetchStudent, fetchSubjects, getSubjectName } from "../../Redux/Action/action"
import "../addStudent/addStudent.css"
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



const AddSubject = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSubjectName())
  }, [])

  const subname = useSelector(state => state.store.subName)
  
  const dropdown_toggle_el = useRef(null)
  const dropdown_content_el = useRef(null)



  clickOutsideRef(dropdown_content_el, dropdown_toggle_el)

  const [name, setName] = useState()

  const studentAdd=(e)=>{
    e.preventDefault()
  
  
      dispatch(addSubjectt(name))
      dispatch(fetchStudent())
      dispatch(fetchSubjects())
   
  
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

       
        

        <input type="submit" value="Add" className="btn btn-danger mt-2 submitAddBtn" />
        </form>
      </div>
    </>
  )
}

export default AddSubject