import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap';
import ProductState from './context/Products/ProductState';
import AllProductsScreen from './screens/AllProductsScreen';
import ProductScreen from './screens/ProductScreen';
import Cart from './screens/Cart';
import SignInScreen from './screens/SignInScreen';
import SignupScreen from './screens/SignupScreen';

import UploadProducts from './screens/UploadProducts';
import UserState from './context/Users/UserState';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import jwt from 'jsonwebtoken'

function App() {
  if(localStorage.getItem('userDetails')){
    const user = JSON.parse(atob(localStorage.getItem('userDetails')))
    const decoded = jwt.verify(user.token, atob("N1FbJHV0aysmOkNdNGhHVA=="))
    const now = Date.now().valueOf() 
    if(now>decoded.exp){
      console.log('Successfully logged in');
    }
    else{
      console.log('Token Expired pleaselogin again');
      localStorage.removeItem('cartItems')
    }
  }
  
  const routes = (
    <>
      <Header />
      <Container>
        <main className='py-3'>
          <Route path='/login' component={SignInScreen} />
          <Route path='/register' component={SignupScreen} />
          <Route path="/cart/:id?" component={Cart} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/productlist' component={ProductListScreen} exact />
          {/* <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact /> */}
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/uploadproducts' component={UploadProducts} />
          <Route path='/' component={AllProductsScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
        </main>
      </Container>
      <Footer />
    </>
  )
  return (
    <Router >
      <ProductState>
        <UserState>
          <div className="App">
            {routes}
          </div>
        </UserState>
      </ProductState>
    </Router>
  );
}

export default App;
