import React, { useState } from 'react';
import { Grid, Button, TextField } from '@mui/material';

import InputForm from './InputForm';
import BooksCatalog from './BooksCatalog';

export default function Catalog() {

    const generateOrderNumber = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    const [ orderNumber, setOrderNumber ] = useState(generateOrderNumber());
    const [orderItems, setOrderItems] = useState([]);
    const [ cost, setCost ] = useState(0);

    return (
        <Grid container textAlign={'center'}>
            <Grid item xs={12}>
                <InputForm {...{orderItems, setOrderItems, cost, setCost}} />
            </Grid>
            <Grid item xs={12}>
                <BooksCatalog {...{orderItems, setOrderItems, cost, setCost}} />
            </Grid>
        </Grid>
    );
}