import React, { useEffect, useState } from 'react';
import { Grid, Button, TextField, InputAdornment  } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function SearchForm(props) {

    const { allBooks, setAllBooks } = props;
    const { searchList, setSearchList } = props;
    const [ title, setTitle ] = useState('');
    const [ author, setAuthor ] = useState('');

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

    const FindCollection = () => {
        let newBooks = allBooks.filter((book) => (
          book.title.toLowerCase().includes(title.toLowerCase()) &&
          book.author.toLowerCase().includes(author.toLowerCase())
        ));
        setSearchList(newBooks);
      }

    const handleTitle = (event) => {
        setTitle(event.target.value);
      };
      
      const handleAuthor = (event) => {
        setAuthor(event.target.value);
      };
      
      useEffect(() => {
        FindCollection();
      }, [title, author]);

      return (
        <>
          <Grid>
            <IconTextField
              id='title'
              label='Title'
              helperText=''
              variant='standard'
              value={title}
              onChange={handleTitle}
              style={{ color: '#fff', margin: '10px' }}
              color={'warning'}
              inputProps={{ style: { color: '#fff' } }}
              iconEnd={<SearchOutlinedIcon sx={{ color: '#ed6c02' }} />}
            />
            <IconTextField
              id='author'
              label='Author'
              helperText=''
              variant='standard'
              value={author}
              onChange={handleAuthor}
              style={{ color: '#fff', margin: '10px' }}
              color={'warning'}
              inputProps={{ style: { color: '#fff' } }}
              iconEnd={<SearchOutlinedIcon sx={{ color: '#ed6c02' }} />}
            />
          </Grid>
        </>
      );
}