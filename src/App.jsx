import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { AppBar, Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2';
import './App.css'

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [opcion, setOpcion] = useState(false);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    titulo: '',
    precio: '',
    descripcion: '',
    fk_id_categoria: ''
  });

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getCategories = () => {
    axios.get(import.meta.env.VITE_APP_API + '/categories').then(result => {
      setCategories(result.data['categorias']);
    });
  }

  const getProducts = () => {
    axios.get(import.meta.env.VITE_APP_API + '/products').then(result => {
      setProducts(result.data['productos']);
    });
  }

  const getProductById = (id, buttonText) => {
    const element = document.getElementById('p-' + id);
    element.innerText = 'Cargando';
    axios.get(import.meta.env.VITE_APP_API + '/get-product', { params: { id } }).then(result => {
      element.innerText = buttonText;
      setProduct({
        id: result.data['producto'][0].id,
        titulo: result.data['producto'][0].titulo,
        precio: result.data['producto'][0].precio,
        descripcion: result.data['producto'][0].descripcion,
        fk_id_categoria: result.data['producto'][0].categorias.map(c => c.id)
      });
      setOpen(true);
    });
  }

  const createProduct = () => {
    if (product.titulo != '' && product.precio != '' && product.descripcion != '' && product.fk_id_categoria != '') {
      const element = document.getElementById('crear');
      element.innerText = 'Creando';
      axios.post(import.meta.env.VITE_APP_API + '/create-product', product).then(result => {
        window.location.reload();
      }).catch(e => {
        setOpen(false);
        Swal.fire({
          title: e,
          icon: "error",
          draggable: true
        });
      });
    } else {
      window.alert('Todos los campos son requeridos')
    }
  }

  const updateProduct = () => {
    if (product.titulo != '' && product.precio != '' && product.descripcion != '' && product.fk_id_categoria != '') {
      const element = document.getElementById('editar');
      element.innerText = 'Editando';
      axios.put(import.meta.env.VITE_APP_API + '/edit-product', product).then(result => {
        window.location.reload();
      }).catch(e => {
        setOpen(false);
        Swal.fire({
          title: e,
          icon: "error",
          draggable: true
        });
      });
    } else {
      window.alert('Todos los campos son requeridos')
    }
  }

  const deleteProduct = (id) => {
    swalWithBootstrapButtons.fire({
      title: "Seguro que deseas eliminar el producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(import.meta.env.VITE_APP_API + '/delete-product', { params: { id } }).then(result => {
          swalWithBootstrapButtons.fire({
            title: "Se ha eliminado correctamente el producto",
            icon: "success"
          });
          window.location.reload();
        }).catch(e => {
          swalWithBootstrapButtons.fire({
            title: "No fue posible eliminar el producto",
            icon: "error"
          });
        });
      } else {
        result.dismiss === Swal.DismissReason.cancel
      }
    });
  }

  return (
    <>
      <AppBar component={'nav'} position='static' className='app-bar'>
        <Grid container>
          <Typography variant="h4" sx={{ color: 'text.white' }} textAlign={'left'}>
            Mis productos
          </Typography>
          <Button className='btn-create' variant='outlined' color='inherit' onClick={() => {
            setOpen(true)
            setOpcion(true)
          }}>+</Button>
        </Grid>
      </AppBar>
      <Box sx={{ flexGrow: 1 }} className='container-product'>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 6, md: 4 }} className='container-grid'>
          {
            products.length > 0 ? products.map((p) => (
              <Grid key={p.id} item size={{ xs: 12, sm: 6, md: 4 }}>
                <Card className='product'>
                  <CardMedia
                    component="img"
                    height="194"
                    image={
                      p.categorias[0] && p.categorias[0].id === 1 ? "src/assets/1.png"
                        : p.categorias[0] && p.categorias[0].id === 2 ? "src/assets/2.jpeg"
                          : p.categorias[0] && p.categorias[0].id === 3 ? "src/assets/3.jpg"
                            : p.categorias[0] && p.categorias[0].id === 4 ? "src/assets/4.jpg"
                              : p.categorias[0] && p.categorias[0].id === 5 ? "src/assets/5.jpg"
                                : "src/assets/6.jpg"}
                    alt="Paella dish"
                  />
                  <CardContent className='description'>
                    <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                      {p.titulo}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                      {'Precio: $' + p.precio}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {p.descripcion}
                    </Typography>
                    <ul>
                      {p.categorias.map(c => (<li key={c.name}>{c.name}</li>))}
                    </ul>
                  </CardContent>
                  <CardActions disableSpacing className='btn-group'>
                    <Button id={'p-' + p.id} onClick={() => getProductById(p.id, 'Editar')} className='btn-left' variant='contained' color='warning'>Editar</Button>
                    <Button onClick={() => deleteProduct(p.id)} className='btn-right' variant='contained' color='error'>Eliminar</Button>
                  </CardActions>
                </Card>
              </Grid>
            )) : (
              <Stack spacing={2} direction="row" alignItems="center" className='loading-container'>
                <CircularProgress size={40} />
              </Stack>
            )
          }
        </Grid>
      </Box>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
        >
          {
            product.titulo != '' && !opcion ? (
              <>
                <DialogTitle>Editar producto</DialogTitle>
                <DialogContent>
                  <TextField
                    onChange={(e) => setProduct({ ...product, titulo: e.target.value })}
                    autoFocus
                    required
                    margin="dense"
                    id="titulo"
                    name="titulo"
                    label="Titulo"
                    value={product.titulo}
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => setProduct({ ...product, precio: e.target.value })}
                    autoFocus
                    required
                    margin="dense"
                    id="precio"
                    name="precio"
                    label="Precio"
                    value={product.precio}
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => setProduct({ ...product, descripcion: e.target.value })}
                    autoFocus
                    required
                    margin="dense"
                    id="descripcion"
                    name="descripcion"
                    label="Descripcion"
                    value={product.descripcion}
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  {
                    categories.length > 0 ? (
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Categorias disponibles: {categories.map(c => c.id + ', ')}
                      </Typography>
                    ) : null
                  }
                  <TextField
                    onChange={(e) => setProduct({ ...product, fk_id_categoria: e.target.value })}
                    autoFocus
                    required
                    margin="dense"
                    id="categorias"
                    name="categorias"
                    label="Categorias"
                    value={product.fk_id_categoria}
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(false)}>Cancelar</Button>
                  <Button onClick={() => updateProduct()} id='editar'>Editar</Button>
                </DialogActions>
              </>
            ) : (
              <>
                <DialogTitle>Crear producto</DialogTitle>
                <DialogContent>
                  <TextField
                    onChange={(e) => setProduct({ ...product, titulo: e.target.value })}
                    autoFocus
                    required
                    margin="dense"
                    id="titulo"
                    name="titulo"
                    label="Titulo"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => setProduct({ ...product, precio: e.target.value })}
                    autoFocus
                    required
                    margin="dense"
                    id="precio"
                    name="precio"
                    label="Precio"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => setProduct({ ...product, descripcion: e.target.value })}
                    autoFocus
                    required
                    margin="dense"
                    id="descripcion"
                    name="descripcion"
                    label="Descripcion"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                   {
                    categories.length > 0 ? (
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Categorias disponibles: {categories.map(c => c.id + ', ')}
                      </Typography>
                    ) : null
                  }
                  <TextField
                    onChange={(e) => setProduct({ ...product, fk_id_categoria: e.target.value })}
                    autoFocus
                    required
                    margin="dense"
                    id="categorias"
                    name="categorias"
                    label="Categorias"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {
                    setOpen(false)
                    setOpcion(false)
                  }}>Cancelar</Button>
                  <Button onClick={() => createProduct()} id='crear'>Crear</Button>
                </DialogActions>
              </>
            )
          }
        </Dialog>
      </React.Fragment>
    </>
  )
}

export default App;
