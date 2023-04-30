import React from "react";
import { IconButton } from "@mui/material";

import PlusOneOutlinedIcon from '@mui/icons-material/PlusOneOutlined';

export default function Order(props) {

    const {orderItems, setOrderItems} = props;
    const {cost, setCost} = props;

    const AddOne = () => {
        console.log(`+1 id: ` + props.bookId);
        let orderItem = orderItems.filter(it => it.bookId === props.bookId)[0];
        if (orderItem !== undefined) {
            orderItem.quantity += 1;
            setCost(cost + orderItem.book.price);
        } else {
            alert('Add item first!');
        }
        setOrderItems(orderItems);
        console.log(orderItems);
    }

    return(
        <>
            <IconButton
                onClick={(event) => {AddOne()}}>
                    <PlusOneOutlinedIcon/>
                </IconButton>
        </>
    );
}