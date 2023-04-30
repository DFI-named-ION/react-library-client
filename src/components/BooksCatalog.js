import React, { useState, useEffect } from "react";
import Order from './Order';
import SearchForm from './SearchForm';
import { 
  ListItem, ListItemText, ListItemSecondaryAction, Grid
} from '@mui/material';

import { createAPIEndPoint, ENDPOINTS } from '../api';

export default function BooksCatalog(props) {
  const [allBooks, setAllBooks] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const {orderItems, setOrderItems} = props;
  const {cost, setCost} = props;

  useEffect(() => {
    createAPIEndPoint(ENDPOINTS.books).fetchAll()
      .then(response => {
        setAllBooks(response.data);
        setSearchList(response.data);
      })
      .catch(err => {
        console.log('booksFetchAll error: ' + err);
      });
  }, []);

    const AddToCart = (book) => {
        if (orderItems.filter((b) => b.bookId === book.id).length === 1) {
            alert('Book already in cart. Use +1 button to manage quantity')
        } else {
            orderItems.push({
                id: 0,
                bookId: book.id,
                quantity: 1,
                orderId: 0,
                book: book,
                order: null
            });
            setCost(cost + book.price);
        }
        setOrderItems(orderItems);
    }

  return (
    <div style={{ margin: '0px auto', marginTop: '15px', width: '100%' }}>
        <SearchForm {...{allBooks, setAllBooks, searchList, setSearchList}} />
        <br />
        <Grid container spacing={3}>
            {searchList.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4}>
                <ListItem
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
                button
                onClick={(event) => AddToCart(item)}
                >
                <ListItemText
                    primary={item.title}
                    secondary={item.author}
                    style={{ paddingRight: 16, paddingBottom: 0 }}
                />
                <ListItemText
                    primary=""
                    secondary={'$' + item.price}
                    style={{ paddingRight: 16, paddingBottom: 0 }}
                />
                    <ListItemSecondaryAction>
                        <Order {...{orderItems, setOrderItems, cost, setCost}} bookId={item.id} />
                    </ListItemSecondaryAction>
                </ListItem>
            </Grid>
            ))}
        </Grid>
    </div>
  );
}