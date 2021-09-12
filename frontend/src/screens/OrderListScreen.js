import React, { useContext, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Alert, Spinner } from 'react-bootstrap'
import OrderContext from '../context/Orders/OrderContext'

const OrderListScreen = ({ history }) => {
  const orderContext = useContext(OrderContext)
  const userInfo = localStorage.getItem('userDetails') && JSON.parse(atob(localStorage.getItem('userDetails')))
  console.log(userInfo);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      
      orderContext.getadminOrders()
    } else {
      history.push('/login')
    }
     // eslint-disable-next-line
  }, [])

  return (
    <>
      <h1>Orders</h1>
      {orderContext.loading ? (
        <Spinner />
      ) : orderContext.error ? (
        <Alert variant='danger'>{orderContext.error}</Alert>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orderContext.orders && orderContext.orders.length>0 && orderContext.orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.ordered_on.substring(0, 10)}</td>
                <td>₹{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paid_at.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
