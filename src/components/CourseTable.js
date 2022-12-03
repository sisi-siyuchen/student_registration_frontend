import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";




export default function CourseTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell># Number</TableCell>
            <TableCell align="right">Course Name</TableCell>
            <TableCell align="right">Course Location</TableCell>
            <TableCell align="right">Course Content</TableCell>
            <TableCell align="right">Teacher Id</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.courses.map((course, index) => (
            <TableRow
              // key={course.courseName}
              key = {index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                { index+1 }
              </TableCell>
              <TableCell align="right">{course.courseName}</TableCell>
              <TableCell align="right">{course.courseLocation}</TableCell>
              <TableCell align="right">{course.courseContent}</TableCell>
              <TableCell align="right">{course.teacherId}</TableCell>
              <TableCell align="right">
                <Button variant="contained"
                        color={props.buttonColor}
                        onClick={() => props.handleButtonClick(course.courseName)}>
                  {props.buttonText}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
