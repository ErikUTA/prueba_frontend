import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import './App.css'

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_API + '/products').then(result => {
      setProducts(result.data['productos']);
    });
  }, []);

  return (
    <Grid sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          {
            products.map((p) => (
              <Card key={p.id} sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={ 
                      p.categorias[0].id === 1 ? "src/assets/1.png" 
                      : p.categorias[0].id === 2 ? "src/assets/2.jpeg" 
                      : p.categorias[0].id === 3 ? "src/assets/3.jpg" 
                      : p.categorias[0].id === 4 ? "src/assets/4.jpg" 
                      : p.categorias[0].id === 5 ? "src/assets/5.jpg" 
                      : "src/assets/6.jpg"}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {p.titulo}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {p.descripcion}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Ver más
                  </Button>
                </CardActions>
              </Card>
            ))
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default App;
