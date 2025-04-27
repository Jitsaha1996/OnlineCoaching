import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  TableHead,
  TextField,
} from '@mui/material';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import SearchIcon from '@mui/icons-material/Search';
import theme from '../../theme';
import { IStudents } from '../../common/IStudents';
//import { IGenerics } from '../../common/IGenerics';
const StudentDetailsAdmin: React.FC = () => {
  const [students, setStudents] = useState<IStudents[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students/');
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data: IStudents[] = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  

  if (loading) return <p>Loading students...</p>;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

  function handleDelete(_id: number): void {
    throw new Error('Function not implemented.');
  }

  function handleEdit(_id: number): void {
    throw new Error('Function not implemented.');
  }

  return (
    <TableContainer component={Paper}>
      <TextField fullWidth label="Search" id="Search" />
      
      <Table sx={{ minWidth: 500 }} aria-label="student table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : students
          ).map((student) => (
            <TableRow key={student._id}>
              <TableCell>{student._id}</TableCell>
              <TableCell>{student.sName}</TableCell>
              <TableCell>{student.sclass}</TableCell>
              <TableCell>{student.phone}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleEdit(student._id)}>✏️</IconButton>
                {<IconButton onClick={() => handleDelete(student._id)}>🗑️</IconButton> }
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={2} />
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[2, 5,10, 25, { label: 'All', value: -1 }]}
              colSpan={2}
              count={students.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={(subprops) => (
                <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                  <IconButton
                    onClick={(e) => subprops.onPageChange(e, 0)}
                    disabled={subprops.page === 0}
                    aria-label="first page"
                  >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                  </IconButton>
                  <IconButton
                    onClick={(e) => subprops.onPageChange(e, subprops.page - 1)}
                    disabled={subprops.page === 0}
                    aria-label="previous page"
                  >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  </IconButton>
                  <IconButton
                    onClick={(e) => subprops.onPageChange(e, subprops.page + 1)}
                    disabled={subprops.page >= Math.ceil(subprops.count / subprops.rowsPerPage) - 1}
                    aria-label="next page"
                  >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                  </IconButton>
                  <IconButton
                    onClick={(e) =>
                      subprops.onPageChange(
                        e,
                        Math.max(0, Math.ceil(subprops.count / subprops.rowsPerPage) - 1)
                      )
                    }
                    disabled={subprops.page >= Math.ceil(subprops.count / subprops.rowsPerPage) - 1}
                    aria-label="last page"
                  >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                  </IconButton>
                </Box>
              )}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default StudentDetailsAdmin;


