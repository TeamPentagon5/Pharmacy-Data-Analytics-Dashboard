/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './tableList.scss';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function TableList() {
    const [medicineData, setMedicineData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [formData, setFormData] = useState({
        medicineName: '',
        genericNames: '',
        expireDate: '',
        price: '',
        quantity: '',
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/getdate');
            setMedicineData(response.data.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (id) => {
        const selected = medicineData.find((item) => item._id === id);
        setFormData({
            medicineName: selected.medicineName || '',
            genericNames: selected.genericNames || '',
            expireDate: selected.expireDate?.split('T')[0] || '',
            price: selected.price || '',
            quantity: selected.quantity || '',
        });
        setSelectedId(id);
        setOpen(true);
    };

    const handleUpdateSubmit = async () => {
        try {
            await axios.put(`http://localhost:5000/api/update/${selectedId}`, formData);
            setOpen(false);
            setSelectedId(null);
            fetchData();
        } catch (err) {
            console.error('Error updating data:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/delete/${id}`);
            fetchData();
        } catch (err) {
            console.error('Error deleting data:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
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
                            medicineData.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.medicineName}</TableCell>
                                    <TableCell>{row.genericNames}</TableCell>
                                    <TableCell>{row.expireDate?.split('T')[0]}</TableCell>
                                    <TableCell>৳{row.price}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>
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
                                <TableCell colSpan={6}>Loading data or no records found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit Medicine</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Medicine Name"
                        name="medicineName"
                        fullWidth
                        value={formData.medicineName}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Generic Names"
                        name="genericNames"
                        fullWidth
                        value={formData.genericNames}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Expire Date"
                        name="expireDate"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formData.expireDate}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        name="price"
                        fullWidth
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Quantity"
                        name="quantity"
                        fullWidth
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdateSubmit} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TableList;
