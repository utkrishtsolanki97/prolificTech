import React, { useContext, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import OrderContext from '../context/Orders/OrderContext'

const MyOrderScreen = () => {
    const orderContext = useContext(OrderContext)
    console.log(orderContext.orders);
    useEffect(() => {
        if (orderContext.orders.length === 0) {
            orderContext.getLoggedinUserOrders()
        }
        
    }, [])
    return (
        <>
            <h2>My Orders</h2>
        
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orderContext.orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.ordered_on.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
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
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
    )
}

export default MyOrderScreen
