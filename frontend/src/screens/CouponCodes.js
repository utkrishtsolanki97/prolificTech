import React, { useContext, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import './CouponCodes.scss'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import CouponContext from '../context/Coupons/CouponContext'
import { Table, Button, Alert } from 'react-bootstrap'


const CouponCodes = () => {
    const couponContext = useContext(CouponContext)

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
        //   productContext.deleteProduct(id)
        couponContext.deleteCoupon(id)
        }
      }
    
    useEffect(() => {
        if(couponContext.couponList.length === 0){
            couponContext.getAllCoupons()
        }
         // eslint-disable-next-line
    }, [])
    useEffect(() => {
        // couponContext.getAllCoupons()
         // eslint-disable-next-line
    }, [couponContext.couponList])
    const user = JSON.parse(atob(localStorage.getItem('userDetails')))
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState()
    const [code, setCode] = useState('')
    const [discountPercentage, setDiscountPercentage] = useState(0)
    const [max_discount, setMax_discount] = useState(0)
    const handleDate = (e) =>{
        e.preventDefault()
        let x = {}
        x.couponCode = code
        x.valid_from = moment(startDate).startOf('day').format("YYYY-MM-DDTHH:mm:ssZ")
        x.valid_till = moment(endDate).endOf('day').format("YYYY-MM-DDTHH:mm:ssZ")
        x.created_on = moment(new Date).format("YYYY-MM-DDTHH:mm:ssZ")
        x.created_by = user._id
        x.discountPercentage = discountPercentage
        x.max_discount = max_discount
        console.log(x);
        couponContext.createCoupon(x)
    }
    console.log(couponContext.couponList);
    return (
        <div>
            <div className='date-range-container'>
                <h6><b>Create a Coupon Code</b></h6>
                <form className='custon-date-range-form' onSubmit={handleDate}>
                    <div className='coupon-container'>
                        <label>Code:</label>
                        <input type='text' value={code} onChange={e=> setCode(e.target.value)} />
                    </div>
                    <div className='coupon-container'>
                        <label>Percentage Discount:</label>
                        <input type='number' value={discountPercentage} onChange={e=> setDiscountPercentage(e.target.value)} />
                    </div>
                    <div className='coupon-container'>
                        <label>Max Discount:</label>
                        <input type='number' value={max_discount} onChange={e=> setMax_discount(e.target.value)} />
                    </div>
                    <div className="from-date-container">
                        <label>From: </label>
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} showMonthDropdown showYearDropdown dateFormat="dd/MM/yyyy" dateFormat="dd-MM-yyyy"  />
                    </div>
                    <div className="to-date-container">
                        <label>To: </label>
                        <DatePicker selected={endDate} onChange={date => setEndDate(date)} showMonthDropdown showYearDropdown dateFormat="dd/MM/yyyy" dateFormat="dd-MM-yyyy"  />
                    </div>

                    <button className='date-range-btn' disabled={!startDate || !endDate}>Go</button>
                </form>
            </div>
            {couponContext.couponAddErrorMessage && <Alert variant='danger'>{couponContext.couponAddErrorMessage}</Alert>}
            <br />
            <br />
            <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>CODE</th>
              <th>PERCENTAGE</th>
              <th>MAX DISCOUNT</th>
              <th>ISSUE ON</th>
              <th>VALID TILL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {couponContext.couponList && couponContext.couponList.length>0 && couponContext.couponList.map((coupon,index)=>(
                <tr key={index}>
                    <td>{index+1}.</td>
                    <td>{coupon.couponCode}</td>
                    <td>{coupon.discountPercentage}</td>
                    <td>{coupon.max_discount}</td>
                    <td>{coupon.valid_from.substring(0,10)}</td>
                    <td>{coupon.valid_till.substring(0,10)} </td>
                    <td><Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(coupon.couponCode)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button></td>
                </tr>
            ))}
              
              
          </tbody>
          </Table>
        </div>
    )
}

export default CouponCodes
