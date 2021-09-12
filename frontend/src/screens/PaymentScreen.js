import React, {  useContext, useEffect, useState } from 'react'
import { Button, Form,  Col } from 'react-bootstrap'
import CheckoutSteps from '../Components/CheckoutSteps'
import FormContainer from '../Components/FormContainer'
import OrderContext from '../context/Orders/OrderContext'
const PaymentScreen = ({history}) => {
    // const cart = useSelector(state => state.cart)
    // const {shippingAddress} = cart
    const orderContext = useContext(OrderContext)
    const shippingAddress= true
    if(!shippingAddress){
        // history.push('/shipping')
    }
    const [paymentMethod, setpaymentMethod] = useState('')
    const [paymentComplete, setPaymentComplete] = useState(false)
    

    
    // const dispatch = useDispatch()

    // const submitHandler =(e) => {
    //     e.preventDefault();
    //     // dispatch(savePaymentMethod(paymentMethod))
    //     history.push('/placeorder')
    // }


    useEffect(()=>{
        paymentComplete && history.push('/placeorder')
         // eslint-disable-next-line
    },[paymentComplete])


    const loadScript = (src) => {
        console.log('hi',src);
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
                console.log('onload true');
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }
    
    // const __DEV__ = document.domain === 'localhost'


    useEffect(()=>{
        if(paymentMethod){
            displayRazorpay()
        }
         // eslint-disable-next-line
    },[orderContext.razorPayDetails])

    const startPaymentHandler = (e) =>{
        e.preventDefault()
        orderContext.setPaymentMethod(paymentMethod)
        orderContext.getRazorpayDetails()
    }

    const displayRazorpay = async () => {
        const details = orderContext.razorPayDetails
        console.log('hey');
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        console.log(res);
		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		// const data = await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
		// 	t.json()
		// )

		// console.log(data)
        const user = JSON.parse(atob(localStorage.getItem('userDetails')))

        var options = {
            "key": "rzp_test_3wqvQeZBiVLMAt", // Enter the Key ID generated from the Dashboard
            "amount": details.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": details.currency,
            "name": "ProlificTech",
            "description": "Test Transaction",
            "image": "http://localhost:3000/static/media/logo.ddf69b92.png",
            "order_id": details.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                orderContext.setPaymentStatus(response)
                console.log(response);
                setPaymentComplete(true)
            },
            "prefill": {
                "name": user.name,
                "email": user.email,
                "contact": "9999999999"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        // var rzp1 = new Razorpay(options);
        // rzp1.on('payment.failed', function (response){
        //         alert(response.error.code);
        //         alert(response.error.description);
        //         alert(response.error.source);
        //         alert(response.error.step);
        //         alert(response.error.reason);
        //         alert(response.error.metadata.order_id);
        //         alert(response.error.metadata.payment_id);
        // });
		// const options = {
		// 	key: __DEV__ ? 'rzp_test_3wqvQeZBiVLMAt' : 'PRODUCTION_KEY',
		// 	currency: data.currency ? data.currency : 'INR',
		// 	amount:  data.amount.toString() ? data.amount.toString() : (orderContext.cartTotal*100).toString(),
		// 	order_id: 6474836465,
		// 	name: 'Donation',
		// 	description: 'Thank you for nothing. Please give us some money',
		// 	image: 'http://localhost:3000/static/media/logo.ddf69b92.png',
		// 	handler: function (response) {
		// 		alert(response.razorpay_payment_id)
		// 		alert(response.razorpay_order_id)
		// 		alert(response.razorpay_signature)
		// 	},
		// 	prefill: {
		// 		name: 'asdfg',
		// 		email: 'sdfdsjfh2@ndsfdf.com',
		// 		phone_number: '9899999999'
		// 	}
		// }
        
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}













    return (
        <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={startPaymentHandler}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label as='legend'>Select Method to pay {orderContext.cartTotal.totalPayable}</Form.Label>
            
                <Col>
                    <Form.Check type='radio' label='Debit/Credit/UPI' id='razorpay' name='paymentMethod' value='razorPay'  onChange={e => setpaymentMethod(e.target.value)}></Form.Check>
                </Col>
                <Col>
                    <Form.Check disabled type='radio' label='Cash on Delivery' id='COD' name='paymentMethod' value='COD'  onChange={e => setpaymentMethod(e.target.value)}></Form.Check>
                </Col>
                {/* <Col>
                    <Form.Check type='radio' label='Paytm' id='Paytm' name='paymentMethod' value='Paytm'  onChange={e => setpaymentMethod(e.target.value)}></Form.Check>
                </Col> */}
            </Form.Group>
            {paymentMethod ? <Button type='submit' variant='primary' > Continue </Button> : <Button disabled type='submit' variant='primary' > Continue </Button>}
        </Form>

    </FormContainer>
    )
}

export default PaymentScreen
