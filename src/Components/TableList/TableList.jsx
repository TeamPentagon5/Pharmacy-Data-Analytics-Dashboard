/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './tableList.scss';

// MUI Table imports
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

function TableList() {
    const [medicineData, setMedicineData] = useState([]);

    // Fetch data from the backend API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getdate');
                setMedicineData(response.data.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    // Edit handler
    const handleEdit = (id) => {
        console.log('Edit button clicked for ID:', id);
        // Add logic to edit the specific item
        alert(`Edit record with ID: ${id}`);
    };

    // Delete handler
    const handleDelete = (id) => {
        console.log('Delete button clicked for ID:', id);
        // Add logic to delete the specific item
        alert(`Delete record with ID: ${id}`);
    };

    return (
        <TableContainer component={Paper} className="medicine_table">
            <Table sx={{ minWidth: 650 }} aria-label="medicine table">
                <TableHead>
                    <TableRow>
                        <TableCell className="table_header">Medicine Name</TableCell>
                        <TableCell className="table_header">Generic Names</TableCell>
                        <TableCell className="table_header">Expire Date</TableCell>
                        <TableCell className="table_header">Price</TableCell>
                        <TableCell className="table_header">Quantity</TableCell>
                        <TableCell className="table_header">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {medicineData.length > 0 ? (
                        medicineData.map((row, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <TableRow key={index}>
                                <TableCell className="table_cell">{row.medicineName}</TableCell>
                                <TableCell className="table_cell">{row.genericNames}</TableCell>
                                <TableCell className="table_cell">{row.expireDate}</TableCell>
                                <TableCell className="table_cell">৳{row.Price}</TableCell>
                                <TableCell className="table_cell">{row.Countity}</TableCell>
                                <TableCell className="table_cell">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleEdit(row._id)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={() => handleDelete(row._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="table_cell">
                                Loading data or no records found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableList;
