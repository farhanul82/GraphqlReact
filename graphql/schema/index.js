const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Student {
    _id: ID!
    name: String!
    email: String!
    phone: String!
    dateOfBirth: String!
    subject:[Subject]
  }

 
  type Subject {
    _id: ID!
    name: String!
    student:[Student]
    
  }
  

  input StudentInput {
    name: String!
    email: String!
    phone: String!
    dateOfBirth: String!
    subject:[SubjectInput]
    
  }

  input SubjectInput {
    name: String!
  }


  type RootQuery {
    students: [Student!]!
    subjects: [Subject!]!
  }
  type RootMutation {
      createStudent(studentInput: StudentInput): Student
      createSubject(subjectInput: SubjectInput): Subject

      deleteStudent(_id:ID!):Student
      deleteSubject(_id:ID!):Subject
      
      updateStudent(_id:ID!,name:String):Student

      updateStudentEmail(_id:ID!,email:String):Student

      updateStudentPhone(_id:ID!,phone:String):Student

     
  }
  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);