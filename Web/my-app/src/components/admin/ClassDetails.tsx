import React, { useState, useEffect } from 'react'
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
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import SearchIcon from '@mui/icons-material/Search';
import theme from '../../theme';
import { useForm, Controller } from "react-hook-form";

import { IClass, IBoard } from '../../common/IClass';




const ClassDetails: React.FC = () => {
    const [allClasses, setAllClasses] = useState<IClass[]>([]);
    const [classes, setClasses] = useState<IClass[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [classNameToDelete, setClassNameToDelete] = useState<string>("");
    const [classIdToEdit, setClassIdToEdit] = useState<string | null | undefined>("");
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [openAddClass, setOpenAddClass] = React.useState(false);
    const [openEditClass, setOpenEditClass] = React.useState(false);
    const [openDeleteClass, setOpenDeleteClass] = React.useState(false);
    const [formData, setFormData] = useState<any>({
        className: "",
        classDescription: "",
        boards: [] as IBoard[],
    });
    const fetchClasses = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:5000/api/class/');
            if (!response.ok) {
                throw new Error('Failed to fetch classes');
            }
            let data: IClass[] = await response.json();

            data.sort((a, b) => a.className.localeCompare(b.className, undefined, { sensitivity: 'base' }));

            setClasses(data);
            setAllClasses(data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const handleChange = (e: any, index?: number) => {
        console.log("input element", e);
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleClickOpenAddClass = () => {
        setOpenAddClass(true);
    };
    const handleCloseAddClass = () => {
        setOpenAddClass(false);
    };

    const handleClickOpenEditClass = (classToEdit: IClass) => {
        setFormData({
            _id: classToEdit._id,
            className: classToEdit.className,
            classDescription: classToEdit.classDescription,
            boards: classToEdit.boards || [],
        });
        setClassIdToEdit(classToEdit._id);
        setOpenEditClass(true);
    };
    const handleCloseEditClass = () => {
        setOpenEditClass(false);
    };

    const handleClickOpenDeleteClass = (classToDelete: string) => {
        setClassNameToDelete(classToDelete);
        setOpenDeleteClass(true);
    };
    const handleCloseDeleteClass = () => {
        setOpenDeleteClass(false);
    };

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

    if (loading) return <p>Loading Classes...</p>;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - classes.length) : 0;

    const handleSearch = async (className: string) => {
        try {
            if (!className.trim()) {
                setClasses(allClasses);
                return;
            }

            const filtered = allClasses.filter(cls =>
                cls.className.toLowerCase().includes(className.toLowerCase())
            ).sort((a, b) => a.className.localeCompare(b.className, undefined, { sensitivity: 'base' }));
            setClasses(filtered);

        } catch (err) {
            console.error(err);
        }

    };

    const handleAddClass = async (newClass: {
        className: string,
        classDescription: string,
        boards: IBoard[],
    }) => {
        try {
            const response = await fetch('http://localhost:5000/api/class/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newClass),

            });
            if (!response.ok) throw new Error('Failed to add class');
            // const classData = await response.json();
            await fetchClasses(); // refresh list

            setFormData({
                className: "",
                classDescription: "",
                boards: [] as IBoard[],
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = async (classId: string | null | undefined) => {
        try {

            const response = await fetch(`http://localhost:5000/api/class/edit/${classId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    className: formData.className,
                    classDescription: formData.classDescription,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update class');
            }
            setFormData({
                className: "",
                classDescription: "",
                boards: [] as IBoard[],
            });
            await fetchClasses();
            handleCloseEditClass();
        } catch (err) {
            console.error(err);
        }
    }

    const handleDelete = async (className: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/class/delete/${className}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete class');
            }
            await fetchClasses();
            handleCloseDeleteClass();

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={openAddClass}
                onClose={handleCloseAddClass}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            handleAddClass(formData);
                            handleCloseAddClass();
                        },
                    },
                }}
            >
                <DialogTitle>Enter Class Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a Class, please fill in the following sections
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="className"
                        name="className"
                        label="Class Name"
                        type="text"
                        value={formData.className}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="classDescription"
                        name="classDescription"
                        label="Class Description"
                        type="text"
                        value={formData.classDescription}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddClass}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openEditClass}
                onClose={handleCloseEditClass}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            handleEdit(classIdToEdit);
                            handleCloseEditClass();
                        },
                    },
                }}
            >
                <DialogTitle>Edit Class Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit class name and/or class description
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="className"
                        name="className"
                        label="Class Name"
                        type="text"
                        value={formData.className}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="classDescription"
                        name="classDescription"
                        label="Class Description"
                        type="text"
                        value={formData.classDescription}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditClass}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDeleteClass}
                onClose={handleCloseDeleteClass}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            handleDelete(formData);
                            handleCloseDeleteClass();
                        },
                    },
                }}
            >
                <DialogTitle>Delete Class Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the class?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteClass}>Cancel</Button>
                    <Button onClick={() => {
                        if (classNameToDelete) {
                            handleDelete(classNameToDelete);
                        }
                    }
                    }>Delete</Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper}>
                <Box display="flex" alignItems="center" gap={2}>
                    <TextField fullWidth label="Search Class" id="Search"
                        onChange={(e) => handleSearch(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <SearchIcon />
                            )
                        }} />
                    <Button variant="outlined" sx={{ width: 200, height: 50, fontSize: 16 }} onClick={handleClickOpenAddClass}>
                        ➕ Add Class
                    </Button>
                </Box>

                <Table sx={{ minWidth: 500 }} aria-label="student table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Class Name</TableCell>
                            <TableCell>Class Description</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? classes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : classes
                        ).map((Class) => (
                            <TableRow key={Class._id}>
                                <TableCell>{Class._id}</TableCell>
                                <TableCell>{Class.className}</TableCell>
                                <TableCell>{Class.classDescription}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleClickOpenEditClass(Class)}>✏️</IconButton>
                                    <IconButton onClick={() => handleClickOpenDeleteClass(Class.className)}>🗑️</IconButton>
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
                                rowsPerPageOptions={[2, 5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={2}
                                count={classes.length}
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
        </React.Fragment>
    )

}

export default ClassDetails;