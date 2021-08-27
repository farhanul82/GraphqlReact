
// const students = [];
// const subjects = []

// const resolvers = {
     
//     students: () => {
//         return students.map(x=>x)
//       },


//     subjects:()=>{
//         return subjects.map(x=>x)
//     },
//       createStudent: args => {
//         const student = {
//           _id: Math.random().toString(),
//           name: args.studentInput.name,
//           email: args.studentInput.name,
//           phone: +args.studentInput.phone,
//           dateOfBirth: args.studentInput.dateOfBirth,

//           subject:[...subjects]
//         };
//         students.push(student);
//         return student;
//       },

//       createSubject: args => {
//         const subject = {
//           _id: Math.random().toString(),
//           name: args.subjectInput.name,
//         };
//         subjects.push(subject);
//         return subject;
//       },

     
// }
// console.log(students)
// console.log(subjects)
// module.exports = resolvers 


const Student = require('../../models/Students');

const Subject = require('../../models/Subject');



module.exports = {
    students: async () => {
      try {
        const students = await Student.find();
        return students.map(student => {
          return {
            ...student._doc,
            _id: student.id,
            name : student.name,
            email : student.email,
            phone : student.phone,
            dateOfBirth: student.dateOfBirth,
            subject : [...student.subject]
          };
        });
      } catch (err) {
        throw err;
      } 
    },

    subjects:async()=>{
       
        try {
            const subjects = await Subject.find();
         
            return subjects.map(subject => {
              const student =  Student.find({"subject.name":`${subject.name}`})

              return {
                ...subject._doc,
                _id: subject.id,
                name : subject.name,
                student:student
               
              };
            });
          } catch (err) {
            throw err;
          }
        },
    createStudent: async args => {
     
    console.log(args)
      try {
        const existingStudent = await Student.findOne({ email: args.studentInput.email, });
        if (existingStudent) {
            throw new Error('Student exists already.');
          }
        const student = new Student({
            name: args.studentInput.name,
            email: args.studentInput.email,
            phone: +args.studentInput.phone,
            dateOfBirth: args.studentInput.dateOfBirth,
            subject : [...args.studentInput.subject]
       
          });

          const result  = await student.save();
          return { ...result._doc,
            name: result.name,
            email: result.email,
            phone: result.phone,
            dateOfBirth: result.name,
            subject: result.subject,
        };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    createSubject: async args => {
      try {
        
  
        const subject = new Subject({
          name: args.subjectInput.name,
        });
  
        const result = await subject.save();
  
        return { ...result._doc,  name: result.name,};
      } catch (err) {
        throw err;
      }
    },

    deleteStudent: async args=>{
     
      return await Student.findByIdAndRemove(args)
    },


    deleteSubject: async args=>{
      console.log(args)
      return await Subject.findByIdAndRemove(args._id)
    },




    updateStudent:async (args)=>{
      console.log(args)
      return await Student.findOneAndUpdate({ _id:args._id},{name:args.name},{new:true})
    },

    updateStudentEmail:async (args)=>{
      console.log(args)
      return await Student.findOneAndUpdate({ _id:args._id},{email:args.email},{new:true})
    },

    updateStudentPhone:async (args)=>{
      console.log(args)
      return await Student.findOneAndUpdate({ _id:args._id},{phone:args.phone},{new:true})
    },
  };   