import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateUserProfile } from "../../lib/redux/reducers/user"

const styles =  {
  valid : {
    display: 'none'
  }, 
  errors: {
    color: 'crimson',
    display: 'block'
  } 
}
function Checkout({history}) {

  const { current } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [clientDetails, setClientDetails] = useState({
    givenName: current.profileObj.givenName,
    familyName: current.profileObj.familyName,
    email: current.profileObj.email
  })

  const [required, setRequired] = useState({
    givenName: false,
    familyName: false,
    email: false
  })

  useEffect(() => {

    setClientDetails({
      givenName: current.profileObj?.givenName,
      familyName: current.profileObj?.familyName,
      email: current.profileObj?.email
    })
  }, [current])

  useEffect(() => {
    
    setRequired({
      givenName: !!clientDetails?.givenName.length,
      familyName: !!clientDetails?.familyName.length,
      email: !!clientDetails?.email.length
    })
    // setRequired({
    //   givenName: clientDetails?.givenName,
    //   familyName: clientDetails?.familyName,
    //   email: clientDetails?.email
    // })
  
    // Object.entries(clientDetails).map(([key, value]) => {
    //   setRequired({...required, [key]: value})
    // })
    
  },[ clientDetails ])



  const isValid = useMemo(() => {
    let errors =[]
    Object.values(required).map((value) => {
      if(!value) {
        errors.push(value);
      }
    })
    return !errors.length
  }, [required])
  
  const handleOnChange = e => {
    setClientDetails(prevState => ({...prevState, [e.target.name]: e.target.value }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUserProfile(clientDetails))
    history.push("/payment")
  }
  return (
    <section className="pt-5 pb-5">
        <div className="container">
          <div className="py-5 text-center row justify-content-center">
            <div className="col-md-10">
              <h2>Client Details :</h2>
            </div>
          </div>
          <div className="row justify-content-center rounded shadow pt-5 pb-5 bg-white ">
          
            <div className="col-md-8 ">
              <form className="needs-validation" onSubmit={handleOnSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label for="firstName">First name</label>
                    <input 
                      className="form-control"
                      type="text" 
                      name="givenName" 
                      id="firstName" 
                      placeholder="please enter first name"
                      value={ clientDetails.givenName}
                      onChange={handleOnChange}
                      />
                    <small style={ clientDetails.givenName ? styles.valid : styles.errors } >
                      Valid first name is required error.
                    </small>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label for="lastName">Last name</label>
                    <input 
                      className="form-control"
                      type="text" 
                      name="familyName"  
                      id="lastName"  
                      placeholder="please enter last name"
                      value={ clientDetails.familyName}
                      onChange={handleOnChange}
                    />
                    <small style={ clientDetails.familyName ? styles.valid : styles.errors }>
                      Valid last name is required.
                    </small>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label for="email">Email <span className="text-muted">(Optional)</span></label>
                  <input 
                    className="form-control"
                    type="email" 
                    name="email"   
                    id="email" 
                    placeholder="you@example.com" 
                    value={ clientDetails.email}
                    onChange={handleOnChange}
                  />
                  <div style={ clientDetails.email ? styles.valid : styles.errors}>
                    Please enter a valid email address for order updates
                  </div>
                </div>
               
                <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={!isValid}>
                    Continue to checkout 
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
}
export default Checkout;
