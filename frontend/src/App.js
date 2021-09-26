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
import ShippingScreen from './screens/ShippingScreen';
import OrderState from './context/Orders/OrderState';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import MyOrderScreen from './screens/MyOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderListScreen from './screens/OrderListScreen';
import ProfileScreen from './screens/ProfileScreen';
import CouponCodes from './screens/CouponCodes';
import AdminScreen from './screens/AdminScreen';
import CouponState from './context/Coupons/CouponState';
import PrivacyPolicy from './screens/PrivacyPolicy';
import RefundCancellationPolicy from './screens/RefundCancellationPolicy';
import TermsAndCondition from './screens/TermsAndCondition';
import ContactUs from './screens/ContactUs';

function App() {
  if(localStorage.getItem('userDetails')){
    const user = JSON.parse(atob(localStorage.getItem('userDetails')))
    jwt.verify(user.token, atob("N1FbJHV0aysmOkNdNGhHVA=="), function(err, decoded){
      if (err) {
        console.log('Token Expired pleaselogin again');
      localStorage.removeItem('userDetails')
      }
      else{
        console.log('Successfully logged in');
      }
    })
    
  }
  
  const routes = (
    <>
      <Header />
      <Container>
        <main className='py-3'>
          <Route path='/login' component={SignInScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/myOrders' component={MyOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/register' component={SignupScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path="/cart/:id?" component={Cart} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/productlist' component={ProductListScreen} exact />
          {/* <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact /> */}
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/uploadproducts' component={UploadProducts} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/admin/adminscreen' component={AdminScreen} />
          <Route path='/admin/coupon' component={CouponCodes} />
          <Route path='/privacy-policy' component={PrivacyPolicy} exact />
          <Route path='/refund-cancellation-policy' component={RefundCancellationPolicy} exact />
          <Route path='/terms-conditions' component={TermsAndCondition} exact />
          <Route path='/contact-us' component={ContactUs} exact />
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
          <OrderState>
            <CouponState>
              <div className="App">
                {routes}
              </div>
            </CouponState>
          </OrderState>
        </UserState>
      </ProductState>
    </Router>
  );
}

export default App;
