import { FETCH_STUDENT, FETCH_SUBJECT,FETCH_SUBJECT_NAME,UPDATE_NAME ,ADD_SUBJECT,ADD_STUDENT } from '../Type'


const Reducer = (state = {
    subject:[],
    student:[],
    subName:[]
},action) => {
    switch (action.type){
        default:
            return state;
            case FETCH_STUDENT:
            
            return({
                ...state,
                student:action.payload
            })

            case ADD_STUDENT:
            
                return({
                    ...state,
                    student:action.payload
                })

            case UPDATE_NAME:
            console.log(action.payload)
                return({
                    ...state,
                    student:action.payload
                })
        case FETCH_SUBJECT:
            
            return({
                ...state,
                subject:action.payload
            })

          
        case FETCH_SUBJECT_NAME:
            return({
                ...state,
                subName:action.payload
            })
    }
};

export default Reducer;