import { FETCH_STUDENT, FETCH_SUBJECT, FETCH_SUBJECT_NAME, UPDATE_NAME, ADD_STUDENT, ADD_SUBJECT } from '../Type'


export const fetchStudent = () => (dispatch) =>{
    const requestBodySubject = {
        query: `
        query{
            students{
                _id
              name
              email
              phone
              dateOfBirth
              subject{
                  name
              }
            }
          }
      `}
    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBodySubject),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(r => {

            dispatch({
                type:FETCH_STUDENT ,
                payload: r.data.students
            });
        })

}




export const fetchSubjects = () => (dispatch) => {
    const requestBodySubject = {
        query: `
    query{
        subjects{
          _id
          name
          student{
            name
          }
        }
      }
      `}
    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBodySubject),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(r => {

            dispatch({
                type: FETCH_SUBJECT,
                payload: r.data.subjects
            });
        })



}

export const getSubjectName = () => (dispatch) => {
    const requestBodySubject = {
        query: `
    query{
        subjects{
          name
       
        }
      }
      `}
    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBodySubject),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(r => {

            dispatch({
                type: FETCH_SUBJECT_NAME,
                payload: r.data.subjects
            });
        })

}



export const addStudent = (name, email, phone, bDate, subjectName) => (dispatch) => {
    const requestBody = {
        query: `
       
mutation{
    createStudent(studentInput:{
      name:"${name}"
      email:"${email}"
      phone:"${phone}"
      dateOfBirth:"${bDate}"
      subject:[
        {name:"${subjectName[0]}"}
        {name:"${subjectName[1]}"}
     
      ]
    }){
      name
      email
      phone
      dateOfBirth
      subject{
          name
      }
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
        .then(r =>{
          alert("Successfully Added")
           
            })
}




export const addSubjectt = (name) => (dispatch) => {
    const requestBody = {
        query: `
       
        mutation{
            createSubject(subjectInput:{
              name:"${name}"
            }){
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
            alert("Successfully Added")
            })

}






export const updateName = (id, name) => (dispatch) => {
    const requestBody = {
        query: `
        mutation{
            updateStudent(_id:"${id}",name:"${name}"){
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
        .then(r =>{ console.log(r.data)
             
            dispatch({
                type: UPDATE_NAME,
                payload: r.data.students
            });
           
        })
}


export const updatePhone= (id, phone) => (dispatch) => {
    console.log(phone)
    const requestBody = {
        query: `
        mutation{
            updateStudentPhone(_id:"${id}",phone:"${phone}"){
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
            dispatch({
                type: UPDATE_NAME,
                payload: r.data.students
            });
        })
}


export const updateEmail = (id, email) => (dispatch) => {
    const requestBody = {
        query: `
        mutation{
            updateStudentEmail(_id:"${id}",email:"${email}"){
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
        .then(r =>{
            dispatch({
                type: UPDATE_NAME,
                payload: r.data.students
            });
             console.log(r.data)
            })
}