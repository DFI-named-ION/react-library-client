import './App.css';
import { Container, Typography } from '@material-ui/core';
import Catalog from './components/Catalog';

function App() {
  return (
        <>
            <Container maxWidth="md">
                <Typography
                    gutterBottom
                    variant='h2'
                    align='center'
                >
                    Library Shop
                </Typography>
                <Catalog />
            </Container>
        </>
    );
}

export default App;
