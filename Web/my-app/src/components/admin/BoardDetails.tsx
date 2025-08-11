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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import { IClass, IBoard, ISubject } from '../../common/IClass';
import { baseURL } from '../../common/constant';

const BoardDetails: React.FC = () => {
    interface BoardFormData {
        boards: IBoard[];
        boardName: string;
        boardDescription?: string;
        subjects: ISubject[];
    }
    const initialFormData: BoardFormData = {
        boards: [],
        boardName: "",
        boardDescription: "",
        subjects: [],
    };

    const [allClasses, setAllClasses] = useState<IClass[]>([]);
    const [filtered, setFiltered] = useState<IClass[]>([]);
    const [classes, setClasses] = useState<IClass[]>([]);
    const [selectedClass, setSelectedClass] = useState<string | null>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [openAddBoard, setOpenAddBoard] = React.useState(false);
    const selectedClassObj = allClasses.find(c => c.className === selectedClass);
    const [formData, setFormData] = useState<BoardFormData>(initialFormData);
    const fetchClasses = async (): Promise<void> => {
        try {
            const response = await fetch(`${baseURL}/class/`);
            if (!response.ok) {
                throw new Error('Failed to fetch classes');
            }
            let data: IClass[] = await response.json();

            data.sort((a, b) => a.className.localeCompare(b.className, undefined, { sensitivity: 'base' }));

            setClasses(data);
            setAllClasses(data);
            setSelectedClass(data.length > 0 ? data[0].className : "");
            setFiltered(data);
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


    const flattenData = () =>
        filtered.flatMap((cls) =>
            cls.boards.map((board) => ({
                id: cls._id,
                className: cls.className,
                boardName: board.boardName,
                boardDescription: board.boardDescription
            }))
        );

    const flattenedRows = flattenData();

    const handleClickOpenAddBoard = () => {
        setOpenAddBoard(true);
    };
    const handleCloseAddBoard = () => {
        setFormData(initialFormData);
        setSelectedClass(allClasses.length > 0 ? allClasses[0].className : "");
        setOpenAddBoard(false);
    };

    const handleChangePage = (
        e: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (loading) return <p>Loading Boards...</p>;
    const handleSearchBoards = (searchTerm: string) => {
        const lower = searchTerm.toLowerCase();
        const filteredData = classes.filter(cls =>
            cls.className.toLowerCase().includes(lower) ||
            cls.boards.some(board => board.boardName.toLowerCase().includes(lower))
        );
        setFiltered(filteredData);
        setPage(0);
    };

    const emptyRows = rowsPerPage > 0
        ? Math.max(0, (1 + page) * rowsPerPage - flattenedRows.length)
        : 0


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

    const handleAddBoard = async () => {
        try {
            if (!selectedClassObj) {
                throw new Error("No class selected");
            }

            const payload: BoardFormData = {
                ...formData,
                boards: [
                    ...(selectedClassObj?.boards || []),
                    {
                        boardName: formData.boardName,
                        boardDescription: formData.boardDescription,
                        subjects: formData.subjects
                    }
                ]
            }
            const response = await fetch(`${baseURL}/class/editboards/${selectedClass}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),

            });
            if (!response.ok) throw new Error('Failed to add board');
            // const classData = await response.json();
            await fetchClasses(); // refresh list

            setFormData({
                boards: [] as IBoard[],
                boardName: "",
                boardDescription: "",
                subjects: [] as ISubject[],
            });
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <React.Fragment>
            <Dialog
                open={openAddBoard}
                onClose={handleCloseAddBoard}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            handleAddBoard();
                            handleCloseAddBoard();
                        },
                    },
                }}
            >
                <DialogTitle>Enter Class Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a Board, please fill in the following sections
                    </DialogContentText>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Select Class
                            </InputLabel>
                            <NativeSelect
                                value={selectedClass || ""}
                                onChange={(e) => {
                                    console.log("Selected Class: ", e.target.value);
                                    setSelectedClass(e.target.value)
                                }}
                                inputProps={{
                                    name: 'selectedClass',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                {allClasses.map((option) => (
                                    <option key={option._id} value={option.className}>
                                        {option.className}
                                    </option>
                                ))}
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="boardName"
                        name="boardName"
                        label="Board Name"
                        type="text"
                        value={formData.boardName}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="boardDescription"
                        name="boardDescription"
                        label="Board Description"
                        type="text"
                        value={formData.boardDescription}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddBoard}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>

            <Box>
                <TableContainer component={Paper}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <TextField fullWidth label="Search Board" id="Search"
                            onChange={(e) => handleSearchBoards(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <SearchIcon />
                                )
                            }} />
                        <Button variant="outlined" sx={{ width: 200, height: 50, fontSize: 16 }} onClick={handleClickOpenAddBoard}>
                            ➕ Add Board
                        </Button>
                    </Box>

                    <Table sx={{ minWidth: 500 }} aria-label="student table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Class Name</TableCell>
                                <TableCell>Board Name</TableCell>
                                <TableCell>Board Description</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? flattenedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : flattenedRows
                            ).map((row, idx) => (
                                <TableRow key={`${row.id}-${idx}`}>
                                    <TableCell>{row.className}</TableCell>
                                    <TableCell>{row.boardName}</TableCell>
                                    <TableCell>{row.boardDescription}</TableCell>
                                    <TableCell align="right">
                                        <IconButton>✏️</IconButton>
                                        <IconButton>🗑️</IconButton>
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
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    count={flattenedRows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    colSpan={2}
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
            </Box>

        </React.Fragment>
    )
}

export default BoardDetails;