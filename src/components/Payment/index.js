import React, { useState, useEffect } from 'react';
import Input from './Input'
import Row from "./Row";
import Alert from "./Alert"
import { scrolltoTop } from "./utils"
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { useMutation } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartTotal } from "../../lib/redux/selectors"
import { resetCart } from "../../lib/redux/reducers/cart"
import { ADD_ORDER } from '../../lib/queries'
import { nextDaydelivery } from './utils'

const client = {
  sandbox: `${process.env.REACT_APP_SADNBOX}`,
  production: "<ClientID>",
  env: "sandbox"
};

const STATUS = {
  PENDING: "pending",
  COMPLETE: "complete",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  FAILED: "error",
};

function Payment({ history }) {

  const items = useSelector((state) => state.cart.items)
  const total = useSelector(selectCartTotal)
  const { current } = useSelector( state => state.user )
  const dispatch = useDispatch()

  const [ mutation ] = useMutation(ADD_ORDER)

  const [isValid, setIsValid] = useState(false)
  const [status, setStatus] = useState(STATUS.PENDING);

  const processPayment = (payment) => { 
    return new Promise(resolve => {
      const data = {
        cartDetails: items,
        paymentData: payment
      }
      console.log("The payment was succeeded!", payment);
      resolve(data)
    })
  };

  const addOrder = () => { 
    console.log(current)
    return new Promise((resolve) => {
      const newOrder = {
        id: new Date().getMilliseconds(),
        ownerId: current.googleId,
        clientDetails: `${current.familyName}, ${current.givenName}`,
        date: new Date(),
        pickupDate: nextDaydelivery(),
        total: total,
        items: items
      }
      mutation({ variables: newOrder })
      console.log("Order successfull confirmed and added", newOrder);
      resolve();
    });
  };
  
  const confirmOrder = () => {
    return new Promise((resolve) => {
      setStatus(STATUS.CONFIRMED);

      dispatch(resetCart())
      resolve();
    })
  };


  const handleOnSubmit = async (e) => { 
    console.log("handleOnSubmit: ", e)
    e.preventDefault();
    await addOrder();
    await confirmOrder();
    await scrolltoTop();
    setTimeout(() => history.push('/'), 3000)
  };

  const onSuccess = async (payment) => { 
    await processPayment(payment);
    setStatus(STATUS.COMPLETE)
  };
  const onCancel = async (data) => { 
    console.log('The payment was cancelled!', data);
    setStatus(STATUS.CANCELLED);
  };
  const onError = async (err) => { 
    console.log("Error!", err);
  };

  useEffect(() => {
    setIsValid(status === STATUS.COMPLETE)
  }, [status])


  return (
    <section className="pt-5 pb-5">
        <div className="container">
          <Alert.Confirmed status={status === STATUS.COMPLETE} />
          <Alert.Cancelled status={status === STATUS.CANCELLED} />
          <Alert.Error status={status === STATUS.FAILED} />
          <div className="py-5 text-center row justify-content-center">
            <div className="col-md-10">
              <h2>Checkout</h2>
            </div>
          </div>
          <div className="row justify-content-center rounded shadow pt-5 pb-5 bg-white ">
            <div className="col-md-4 offset-1 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <span className="badge badge-secondary badge-pill">3</span>
              </h4>
              <ul className="list-group mb-3">
                {items?.map( item => <Row key={item.id} {...item} />)}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (EUR)</span>
                  <strong>{ total.toFixed(2) }€</strong>
                </li>
              </ul>
              <form className="card p-2">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Promo code" />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-secondary">Redeem</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-6 order-md-1">
            <form onSubmit={handleOnSubmit}>   
                <h4 className="mb-3">Payment</h4>
                <hr className="mb-4" />
                <div className="row">
                  <Input label="Name on the card" className="col-md-6 mb-3" id="cc-name">
                      Name on card is required
                  </Input>
                  <Input label="Credit card number" className="col-md-6 mb-3" id="cc-number">
                      Credit card number is required
                  </Input>                  
                </div>
                <div className="row">
                  <Input className="col-md-3 mb-3" label="Expiration" id="cc-expiration">
                    Expiration date required
                  </Input>
                  <Input className="col-md-3 mb-3" label="CVV" id="cc-cvv">
                  Security code required
                  </Input>
                </div>
                <PaypalExpressBtn env={client.env} client={client} currency="EUR" total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
                <hr className="mb-4" />
                <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={ !isValid }><i className="far fa-credit-card"></i> Confirmer</button>
             </form> 
            </div>
          </div>
        </div>
      </section>
  );
}
export default Payment;
