import React, { useState } from "react";
import "./styles/userinfo.css";
import * as Yup from 'yup';
import InputFields from "./InputFields";
import { Formik, Form } from 'formik';

function Details() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = (values) => {
    console.log("Form Values:", values);
    setCurrentStep(currentStep + 1);
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: currentStep === 2 ? Yup.string().email('Invalid email address').required('Email is required for the second step') : Yup.string(),
  });

  return (
    <div className="container-fluid bgimg">
      <div className="row gradient-overlay">
        <button
          className="backbtn mt-4 ms-4"
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
        >
          Back
        </button>
        <div className="col-12 d-flex m-0 justify-content-center">
          <img className="icon" src="src\assets\group-14-5qN.png" alt="Icon" />
          <p className="header1">SOULMATE</p>
        </div>
        <div className="row mb-5">
          <div className="col-12 d-flex mb-5 justify-content-center formitems">
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleNext}
            >
              <Form>
                {currentStep === 1 && (
                  <>
                    <InputFields name="firstName" label="First Name" className='mb-4' />
                    <InputFields name="lastName" label="Last Name" />
                  </>
                )}
                {currentStep === 2 && (
                  <InputFields name="email" label="Email" />
                )}
                <button className="next-button" type="submit">
                  Next
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
