import React, { useState, useEffect } from "react";
import ReactModal from 'react-modal';
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { createAPIEndPoint, ENDPOINTS } from "../api";

import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

export default function OrderForm(props){

    const { customerAddress, setCustomerAddress } = props;
    const [isOpen, setIsOpen] = useState(false);
    const { orderNumber, setOrderNumber } = props;
    const {orderItems, setOrderItems} = props;
    const {cost, setCost} = props;

    const ConfirmAction = () => {
        
        let order = {
            id: 0,
            address: customerAddress,
            cost: cost,
            orderItems: null
        }
        
        //console.log(order);

        // 

        orderItems.map((item) => {
            item.order = order;

            console.log(item);

            createAPIEndPoint(ENDPOINTS.orderItems).create(item)
                .then(response => {
                    console.log(response.data);
                })
                .catch(err => {
                    console.log('orderItemsCreate error: ' + err);
                });
        });

        // order.orderItems = orderItems.map(item => ({...item, book: {...item.book}}));            циклічна помилка ...

        // 

        createAPIEndPoint(ENDPOINTS.orders).create(order)
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log('ordersCreate error: ' + err);
            });

        window.location.reload();
        alert('Transaction and other ... OK!');
    }

    let currentDate = new Date();
    currentDate = currentDate.toLocaleDateString() + ' - ' + currentDate.toLocaleTimeString()
    return(
        <>
            <div>
                <Button
                    variant='contained'
                    style={{marginTop: '40px', width: '200px'}}
                    endIcon={<ReceiptLongOutlinedIcon/>}
                    onClick={() => setIsOpen(true)}
                >
                    Checkout Bill
                </Button>
                <ReactModal
                    style={{
                        overlay: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                        content: {
                            maxHeight: '80%',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            overflowY: 'scroll',
                            width: '500px',
                            height: '700px',
                            padding: '40px'
                        }
                    }}
                    isOpen={isOpen}
                    contentLabel="Bill"
                    onRequestClose={() => setIsOpen(false)}
                >
                    <h1 style={{color: '#000', textAlign: 'center', fontWeight: 300}}>Thank for your purchase</h1>
                    <h4 style={{color: '#000', fontWeight: 500, marginTop: '80px', marginLeft: '20px'}}>Address: {customerAddress}</h4>
                    <h4 style={{color: '#000', fontWeight: 500, marginTop: '0px', marginLeft: '20px'}}>Invoice: #{orderNumber}</h4>
                    <h4 style={{color: '#000', fontWeight: 500, marginTop: '0px', marginLeft: '20px'}}>Date: {currentDate}</h4>
                    <hr style={{border: '2px solid dimgray'}}/>
                    <List style={{color: '#000'}}>
                        {
                            orderItems.map((item) => (
                                <ListItem>
                                    <h3 style={{fontWeight: 100, fontSize: '18pt'}}>{item.book.title}</h3>
                                    <hr/>
                                    <h3 style={{fontWeight: 700, fontSize: '12pt'}}>x {item.quantity} - {item.book.price}$</h3>
                                </ListItem>
                            ))
                        }
                        <hr style={{border: '2px solid dimgray'}}/>
                        <h4 style={{color: '#000', fontWeight: 500, marginTop: '20px', marginLeft: '20px'}}>Total: {cost}$</h4>
                    </List>
                    <br/>
                    <br/>
                    {orderItems.length !== 0 && (
                        <Button 
                            style={{width: '100%'}} 
                            variant="contained"
                            onClick={ConfirmAction}
                        >
                            PAY
                        </Button>
                    )}
                    <br/>
                    <br/>
                </ReactModal>
            </div>
        </>
    );
}