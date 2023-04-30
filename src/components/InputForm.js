import React, { useState } from 'react';
import { Grid, Button, TextField, InputAdornment  } from '@mui/material';

import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

import OrderForm from './OrderForm';

export default function InputForm(props) {

    const GenerateAddress = () => {
        const streets = ["Main St.", "Park Ave.", "Broadway", "Elm St.", "Cedar Ln.", "Oak Rd.", "Maple St.", "Pine Ave."];
        const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Seattle", "Miami", "Dallas", "Atlanta", "Denver"];
        return `${streets[Math.floor(Math.random() * streets.length)]}, ${cities[Math.floor(Math.random() * cities.length)]}`;
    }

    const GenerateOrderNumber = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    
    const {orderItems, setOrderItems} = props;
    const [ customerAddress, setCustomerAddress ] = useState(GenerateAddress());
    const { cost, setCost } = props;
    const [ orderNumber, setOrderNumber ] = useState(GenerateOrderNumber());

    const IconTextField = ({ iconStart, iconEnd, InputProps, ...props }) => {
        return (
            <TextField
                {...props}
                InputProps={{
                ...InputProps,
                startAdornment: iconStart ? (
                    <InputAdornment position="start">{iconStart}</InputAdornment>
                ) : null,
                endAdornment: iconEnd ? (
                    <InputAdornment position="end">{iconEnd}</InputAdornment>
                ) : null
                }}
            />
        );
    };

    const UpdateAddress = (address) => {
        setCustomerAddress(address);
    }

    return (
        <>
            <Grid>
                <IconTextField
                    label="Адреса"
                    helperText=""
                    defaultValue={customerAddress}
                    variant="standard"
                    onChange={(event) => UpdateAddress(event.target.value)}
                    style={{ color: '#fff', margin: '10px' }}
                    color={'secondary'}
                    inputProps={{ style: { color: '#fff' } }}
                    iconEnd={<FmdGoodOutlinedIcon sx={{ color: "#9c27b0"}} />}
                />
                <IconTextField
                    id='cost'
                    label="Загальна вартість"
                    helperText=""
                    defaultValue={cost}
                    variant="standard"
                    readOnly
                    style={{ color: '#fff', margin: '10px'}}
                    color={'secondary'}
                    inputProps={{ style: { color: '#fff', textAlign: 'end' }, readOnly: true }}
                    iconEnd={<AttachMoneyOutlinedIcon sx={{ color: "#9c27b0"}} />}
                />
                <br/>
                <OrderForm {...{customerAddress, cost, setCost, orderNumber, setOrderNumber, orderItems, setOrderItems}}/>
            </Grid>
        </>
    );
}