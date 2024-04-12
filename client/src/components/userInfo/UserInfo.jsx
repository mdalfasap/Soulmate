import React, { useEffect, useState } from "react";
import "../styles/userinfo.css";
import { submitDetails, submitPhotos } from "../../helper/helper";
import UserForms from "./UserForms";
import Icon from '../Icon'
import toast, {Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { fetchUserData } from "../../helper/helper";


function UserInfo() {
  const navigate=useNavigate()
  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] = useState({});
  const [formError, setFormErrors] = useState({});
  const token = localStorage.getItem("token");


  
  
  const handleDateChange = (selectedDate) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      dateOfBirth: selectedDate,
    }));
    
  };
  const handleNext = async (e) => {
    e.preventDefault();
    if (currentStep < 20) {
      try {

        const validationResult = await validateForm(formValues);
        if (validationResult.success) {

          setCurrentStep(currentStep + 1);

          localStorage.setItem('formData', JSON.stringify(formValues));
          console.log(formValues)
        } else {
          if (!formValues.firstName&&currentStep==1) {
            toast.error('First Name is required');
          }
          else if (!formValues.lastName&&currentStep==1) {
            toast.error('Last Name is required');
          }
          if (!formValues.schoolName&&currentStep==14) {
            toast.error('Please enter your school or collage name');
          }
          if (!formValues.describeYourself&&currentStep==12) {
            toast.error('Please select atleast one option');
          } if (!formValues.dateOfBirth&&currentStep==4) {
            toast.error('Please enter your date of birth');
          }
          if (!formValues.city&&currentStep==17) {
            toast.error('Please enter your city');
          }

          if (!formValues.email && currentStep == 2) {
            toast.error('Email is required');
          } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
              formValues.email
            ) && currentStep == 2
          ) {
            toast.error('Invalid Email Address');
          } 
            if (!formValues.gender && currentStep === 5) {
            toast.error('Please select any gender');
            }
            if(!formValues.religion && currentStep===7){
              toast.error('Please select your relegion');
            }
            if(!formValues.smokingHabbit && currentStep===9){
              toast.error('Please select any one option');
            }
            if(!formValues.drinkingHabbit && currentStep===10){
              toast.error('Please select any one option');
            }
        }
      
      } catch (error) {
        toast.error('something not right');
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        if(userData.firstName){
          navigate('/userhome')
        }
      } catch (error) {
        console.error("Error in UserProfile:", error);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {

    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);
      setFormValues(parsedFormData);
    }
    const handleBeforeUnload = (event) => {
      localStorage.removeItem('formData');
      // event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleBack = () => {
    if(currentStep>1){
      // console.log(formValues)
    setCurrentStep((prevStep) => {
      return prevStep - 1;
      
    });
  }
  };

  useEffect(()=>{
    if (!token){
      navigate('/')
    }
  },[token])



  const handleChange = (e,res) => {

    const { name, value, type, checked } = e.target;

    setFormValues((prevFormValues) => {
     if (type === 'checkbox') {
        return {
          ...prevFormValues,
          [name]: checked
            ? [...(prevFormValues[name] || []), value]
            : (prevFormValues[name] || []).filter((item) => item !== value),
        };
      } else {

        return {
          ...prevFormValues,
          [name]: value,
        };
      }
  
    });
   
  };
  const photoUploadInLoc=Array.from(JSON.parse(localStorage.getItem('photoUpload') || '[]'));
  const formDataImages = new FormData();
photoUploadInLoc.forEach((imageUrl, index) => {
  // You need to fetch the image or load it as a blob to append it to FormData
  // Here, I'm using fetch to load it as a blob
  fetch(imageUrl)
    .then(response => response.blob())
    .then(blob => {
      // Append the blob as a file to FormData
      formDataImages.append(`image_${index}`, blob, `image_${index}.png`);
    })
    .catch(error => console.error('Error loading image:', error));
});
 const handleSubmit = async (e) => {
  e.preventDefault()
    try {
     
      submitDetails(formValues)
      .then((data) => {

        const { error } = data;
    
        if (!error) {
          navigate("/userhome");
          console.log(formDataImages,'FKEAJHOIELRUKSJ')
          toast.success('Submit successful');
        } else {
          toast.error('Submit failed');
        }
      })
      .catch((err) => {
        toast.error('something went wrong');
      });
    // await submitPhotos(formDataImages)


    localStorage.removeItem('formData')
    localStorage.removeItem('photoUpload')
    localStorage.removeItem('limit')

    } catch (error) {
      console.error('Error during submit:', error);
      toast.error('Failed to submit. Please try again.');
    } 
  };

  
  const totalSteps = 20;
  const progressWidth = `${(currentStep / totalSteps) * 100}%`;
  
  const validateForm = async (formValues) => {
    try {
      await validationSchema.validateSync(formValues, { abortEarly: false });

      return { success: true, errors: {} };
    } catch (errors) {
      const errorMap = {};
      errors.inner.forEach((error) => {
        errorMap[error.path] = error.message;
      });
      setFormErrors(errorMap);
      return { success: false, errors: errorMap };
    }
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email:
      currentStep === 2
        ? Yup.string()
            .matches(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              "Enter a valid email address"
            )
            .required("Email is required")
        : Yup.string(),
        gender: currentStep === 5
    ? Yup.string().required()
    : Yup.string(),
    dateOfBirth: currentStep === 4
    ? Yup.string().required()
    : Yup.string(),
    schoolName: currentStep===14
    ? Yup.string().required()
    : Yup.string(),
    city: currentStep===17
    ? Yup.string().required()
    : Yup.string(),
    describeYourself: currentStep===12
    ? Yup.array().required()
    : Yup.array(),
  });

  
  return (
    
    <div className="container-fluid bgimg ">

      <Toaster></Toaster>
      <div className=" gradient-overlay"></div>
        <div className="col-12 d-flex justify-content-center">
          <div
            style={{
              position: "absolute",
              width: "90%",
              borderRadius: "20px",
              height: "5px",
              top: "3%",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: "20px",
                width: progressWidth,
                backgroundColor: "#FF0000",
                height: "5px",
                transition: "ease-in-out .3s",
              }}
            ></div>
          </div>

         
        
          <div className=" d-flex justify-content-center">
          <div className="header1"> <Icon user/></div>
            <UserForms
              handleBack={handleBack}
              formError={'error'}
              handleNext={handleNext}
              handleDateChange={handleDateChange}
              handleChange={handleChange}
              currentStep={currentStep}
              formValues={formValues}
              handleSubmit={handleSubmit}
              setFormErrors={setFormErrors} 
            />
          </div>
        </div>
      
    </div>
  );
}

export default UserInfo;
