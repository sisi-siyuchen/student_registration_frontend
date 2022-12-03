import React, {useEffect, useState} from "react";
import {CourseService} from "../service/CourseService";
import CourseTable from "../components/CourseTable";

export default function EnrolledCourse(){
    // mimic set states - useState React Hook
    const [courses, setCourses] = useState([]);
    // mimic componentDidMount
    useEffect(() => {
        CourseService.getStudentEnrolledCourses().then(response => {
            setCourses(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    function dropCourse(courseName) {
        CourseService.dropCourse(courseName)
            .then(response => {
                alert(`Congrats! ${courseName} dropped successfully!`);
                window.location.reload();
            }).catch(error => {
            alert(`Sorry, drop ${courseName} failed due to ${error}`);
        })
    }

    return(
        <div>
            <CourseTable courses={courses} buttonText={"Drop"}
                         buttonColor={"error"} handleButtonClick={dropCourse}/>
        </div>
    )
}

// export default class EnrolledCourses extends React.Component {
//     state = {
//         courses: []
//     }
//     componentDidMount(){
//         CourseService.getStudentEnrolledCourses().then(response => {
//             this.setState({
//                 courses: response.data
//             })
//         }).catch(error => {
//             console.log(error);
//         })
//     }
//
//     dropCourse(courseName) {
//         CourseService.dropCourse(courseName)
//             .then(response => {
//                 alert(`Congrats! ${courseName} dropped successfully!`);
//                 window.location.reload();
//             }).catch(error => {
//             alert(`Sorry, ${courseName} dropment failed due to ${error}`);
//         })
//
//     }
//
//     render(){
//         return (
//             <div>
//                 <CourseTable courses={this.state.courses} buttonText={"Drop"}
//                              buttonColor={"error"} handleButtonClick={this.dropCourse}/>
//             </div>
//         )
//     }
// }