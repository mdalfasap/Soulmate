import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import iconText from '../../../assets/logo.png';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { fetchPremiumPlan } from '../../../helper/helper';
import { subscribePremium } from '../../../helper/helper';
import { FaRupeeSign } from "react-icons/fa";
import StripeCheckout from "react-stripe-checkout";
import dotenv from 'dotenv';



function SubscribeDialogue(props) {
  dotenv.config();

  const [plans, setPlans] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  const fetchData = async () => {
    try {
      const fetchedPlans = await fetchPremiumPlan();
      setPlans(fetchedPlans);
    } catch (error) {
      console.error('Error in Plan:', error);
    }
  };

  useEffect(() => {
    console.log(onToken.body,'sadgdas')
    fetchData();
  }, []);


  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % plans.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + plans.length) % plans.length);
  };

  // stripe
  const publishableKey = process.env.STRIPEAK;
   
  const onToken = async (token) => {
    const body = {
      Type:plans[currentIndex]?.Type,
      features:plans[currentIndex]?.Features,
      amount: plans[currentIndex]?.Price,
      period: plans[currentIndex]?.Period,
      token: token
    };
  

    try {
      await subscribePremium(body);
    } catch (error) {
      console.error("Error subscribing premium:", error);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent
          style={{
            width: '25vw',
            backgroundColor: '#1B223F',
            color: 'white',
            height: 'auto',
          }}
        >
          <p
            className="link"
            style={{
              backgroundColor: '#1B223F',
              color: 'rgba(104, 104, 104)',
              textAlign: 'left',
            }}
            onClick={props.close}
          >
            {'< '}soulamate
          </p>
          <div
            className="w-100 pt-1 text-center"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={iconText} style={{ width: '5vw' }} alt="" />
            <p className="mt-2" style={{ fontSize: '20px' }}>
              Soulmate Premium
            </p>
            <div className="w-100 pt-2" style={{ borderBottom: '1px solid black', borderTop: '1px solid black' }}>
              <p style={{ fontSize: '14px' }}><FaRupeeSign/>{plans[currentIndex] && plans[currentIndex].Price}/{plans[currentIndex] && plans[currentIndex].Period}</p>
              <p style={{ color: 'rgba(104, 104, 104)', fontSize: '14px' }}><del><FaRupeeSign/>{plans[currentIndex] && Math.floor(plans[currentIndex].Price * 1.05)}/{plans[currentIndex] && plans[currentIndex].Period}</del></p>
            </div>x
          </div>
          <table className="mx-auto mt-2">
            <tbody>
              {plans[currentIndex] && plans[currentIndex].Features.map((feature, index) => (
                <tr key={index}>
                  <td className="px-3 pe-4 py-2" style={{ borderRight: '2px solid black' }}>
                   <img src={feature.icon} style={{height:'30px', width:'30px',zIndex:'999'}} alt="" />
                   {console.log(feature.icon)}
                  </td>
                  <td className="px-3 pe-4 py-2" style={{ borderRight: '2px solid black' }}>
                    {feature.title}
                  </td>
                  <td className="px-3 py-2">
                    {feature.limit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="w-100 mt-2"
            style={{
              borderTop: '1px solid black',
              justifyContent: 'space-between',
              display: 'flex',
            }}
          >
            <button
              onClick={handlePrev}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '30px',

              }}
            >
              {'< '}
            </button>
            <button
              onClick={handleNext}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '30px',

              }}
            >
              {'>'}
            </button>
          </div>
          <div className="w-100 mt-2" style={{  justifyContent: 'center', display: 'flex' }}>
            {/* <button onClick={handleBuyNow} className='mt-4' style={{ height: '7vh', width: '8vw', backgroundColor: '#DA2A59', border: 'none', color: 'white', fontSize: '10px', borderRadius: '10px' }} >Buy Now</button>
             */}

<StripeCheckout
      label="Go Premium" //Component button text
      name={`${props.userData?.firstName} ${props.userData?.lastName}`}
      description="Upgrade to a premium account today."
      panelLabel="Go Premium" //Submit button in modal
      amount={plans[currentIndex]?.Price * 100} //Amount in cents $9.99
      token={onToken}
      currency="INR"
      stripeKey={publishableKey}
      image={props.userData?.photoUpload?.[0]} //Pop-in header image
      billingAddress={false}
    />
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default SubscribeDialogue;
