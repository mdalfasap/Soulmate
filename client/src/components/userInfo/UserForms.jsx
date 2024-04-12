import React from "react";
import InputFields from "./InputFields";
import DateCalendarFormProps from "./DateCalendarFormProp";
import Title from "./Title";
import Gender from "./Gender";
import {
  relationshipIcons,
  relationshipStatuses,
  religions,
  smokingIcons,
  smokingOptions,
  drinkOptions,
  drinkIcons,
  describeOptions,
  yourInterestOptions,
} from "../../helper/listItems";
import SliderHeight from "./SliderHeight";
import Showinprofile from "./Showinprofile";
import RadioButton from "./RadioButton";
import EducationSelector from "./Education";
import CheckBox from "./CheckBox";
import languages from "../../helper/language";
import DropDown from "./DropDown";
import countries from "../../helper/country";
import PhotoUpload from "./PhotoUpload";

function UserForms(props) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form
              style={{ paddingTop: "20px" }}
              onSubmit={
                props.currentStep <20 ? props.handleNext : props.handleSubmit
              }
              onChange={props.handleChange}
            >
              {props.currentStep === 1 && (
                <>
                  <Title title="Enter Your full name" two></Title>
                  <div>
                    <InputFields
                      name={"firstName"}
                      type={"text"}
                      value={
                        props.formValues.firstName && props.formValues.firstName
                      }
                      label={"First Name"}
                      error={props.formError.firstName}
                      width="500px"
                    />

                    <br />
                    <InputFields
                      name={"lastName"}
                      type={"text"}
                      value={
                        props.formValues.lastName && props.formValues.lastName
                      }
                      label={"Last Name"}
                      error={
                        props.formError.lastName && props.formError.lastName
                      }
                      width="500px"
                    />
                  </div>
                </>
              )}

              {props.currentStep === 3 && (
                <>
                  <Title title="What do your friends call you?" two></Title>
                  <div>
                    <InputFields
                      name={"nickName"}
                      type={"text"}
                      value={
                        props.formValues.nickName && props.formValues.nickName
                      }
                      label={"Nick Name"}
                      error={
                        props.formError.nickName && props.formError.nickName
                      }
                      width="550px"
                    />
                  </div>
                </>
              )}
              {props.currentStep === 2 && (
                <>
                  <Title title="Enter Your Email Address " one />
                  <div>
                    <InputFields
                      name={"email"}
                      type={"text"}
                      value={props.formValues.email && props.formValues.email}
                      label={"Email Address"}
                      error={props.formError.email && props.formError.email}
                      width="500px"
                    />
                  </div>
                </>
              )}
              {props.currentStep === 4 && (
                <>
                  <Title title="When were You born ?" one />
                  <DateCalendarFormProps
        name="dateOfBirth"
        value={props.formValues.dateOfBirth&& props.formValues.dateOfBirth}
        handleDateChange={props.handleDateChange}
      />
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "5%" }}
                  >
                    <Showinprofile />
                  </div>
                </>
              )}
              {props.currentStep === 5 && (
                <>
                  <Title title="Choose Your Gender" />
                  <Gender
                    name={"gender"}
                    // handleGenderChange={props.handleChange}
                    value={props.formValues.gender}
                  />
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "5%" }}
                  >
                    <Showinprofile />
                  </div>
                </>
              )}
              {props.currentStep === 6 && (
                <>
                  <Title title="How tall Are you ?" two />
                  <SliderHeight name="height" value={props.formValues.height} handleChange={props.handleChange}/>
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "5%" }}
                  >
                    <Showinprofile />
                  </div>
                </>
              )}
              {props.currentStep === 7 && (
                <>
                  <Title title="You Believe In ?" />
                  <RadioButton
                    itemsPerRow="3"
                    options={religions}
                    name="religion"
                    value={props.formValues.religion}
                    handleChange={props.handleChange}
                  />
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "5%" }}
                  >
                    <Showinprofile />
                  </div>
                </> 
              )}
              {props.currentStep === 8 && (
                <>
                  <Title title="Relationship Status" />
                  <RadioButton
                    iconUrls={relationshipIcons}
                    itemsPerRow="4"
                    options={relationshipStatuses}
                    name="relationshipStatus"
                    value={props.formValues.relationshipStatus}
                    handleChange={props.handleChange}
                  />
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "5%" }}
                  >
                    <Showinprofile />
                  </div>
                </>
              )}
              {props.currentStep === 9 && (
                <>
                  <Title title="Smoking Preference" />
                  <RadioButton
                    iconUrls={smokingIcons}
                    itemsPerRow="3"
                    options={smokingOptions}
                    name="smokingHabbit"
                    value={props.formValues.smokingHabbit}
                    handleChange={props.handleChange}
                  />
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "5%" }}
                  >
                    <Showinprofile />
                  </div>
                </>
              )}
              {props.currentStep === 10 && (
                <>
                  <Title title="Drinking Habits" />
                  <RadioButton
                    drink
                    iconUrls={drinkIcons}
                    itemsPerRow="3"
                    options={drinkOptions}
                    name="drinkingHabbit"
                    value={props.formValues.drinkingHabbit}
                    handleChange={props.handleChange}
                  />
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "5%" }}
                  >
                    <Showinprofile />
                  </div>
                </>
              )}
              {props.currentStep === 11 && (
                <>
                  <Title title="What is your Educational Qualification ?" />
                  <div style={{ position: "absolute", left: "38%" }}>
                    <EducationSelector name='education'  value={props.formValues.education&&props.formValues.education}  handleChange={props.handleChange} />
                  </div>
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "5%" }}
                  >
                    <Showinprofile />
                  </div>
                </>
              )}
              {props.currentStep === 12 && (
                <>
                  <Title title="Describe yourself" />
                  <CheckBox name='describeYourself' options={describeOptions} value={props.formValues.describeYourself} handleChange={props.handleChange}/>
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "5%" }}
                  >
                    <Showinprofile />
                  </div>
                </>
              )}
              {props.currentStep === 13 && (
                <>
                  <Title title="Whats your Native language" />
                  <div style={{ width: "100vw" }}>
                    <DropDown name="language" value={props.formValues.language} defaultvalue="Select your native language" list={languages} black />
                  </div>
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "5%" }}
                  >
                    <Showinprofile />
                  </div>
                </>
              )}
              {props.currentStep === 14 && (
                <>
                  <Title title="Are you Studying" />
                  <div>
                    <InputFields
                      name={"schoolName"}
                      type={"text"}
                      value={
                        props.formValues.schoolName &&
                        props.formValues.schoolName
                      }
                      label={"Enter Your school or university name"}
                      error={
                        props.formError.schoolName && props.formError.schoolName
                      }
                      width="300px"
                      margin="20px"
                      top="40px"
                    />
                    <InputFields
                      name={"graduationYear"}
                      type={"text"}
                      value={
                        props.formValues.graduationYear &&
                        props.formValues.graduationYear
                      }
                      label={"Enter your graduation year"}
                      error={
                        props.formError.graduationYear &&
                        props.formError.graduationYear
                      }
                      width="300px"
                      top="40px"
                    />
                    <br />
                    <InputFields
                      name={"courseName"}
                      type={"text"}
                      value={
                        props.formValues.courseName &&
                        props.formValues.courseName
                      }
                      label={"Enter Your course"}
                      error={props.formError.firstName}
                      width="300px"
                      margin="20px"
                    />
                    <InputFields
                      name={"fieldOfStudy"}
                      type={"text"}
                      value={
                        props.formValues.fieldOfStudy &&
                        props.formValues.fieldOfStudy
                      }
                      label={"Enter Your field of study"}
                      error={
                        props.formError.fieldOfStudy &&
                        props.formError.fieldOfStudy
                      }
                      width="300px"
                    />
                  </div>
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "5%" }}
                  >
                    <Showinprofile />
                  </div>
                </>
              )}
              {props.currentStep === 15 && (
                <>
                  <Title title="Where do you Working" />
                  <div>
                    <InputFields
                      name={"companyName"}
                      type={"text"}
                      value={
                        props.formValues.companyName &&
                        props.formValues.companyName
                      }
                      label={"Enter Your Company name"}
                      error={
                        props.formError.companyName &&
                        props.formError.companyName
                      }
                      width="300px"
                      margin="20px"
                      top="40px"
                    />
                    <InputFields
                      name={"jobTitle"}
                      type={"text"}
                      value={
                        props.formValues.jobTitle && props.formValues.jobTitle
                      }
                      label={"Enter yourJob Title"}
                      error={
                        props.formError.jobTitle && props.formError.jobTitle
                      }
                      width="300px"
                      top="40px"
                    />
                    <br />
                    <InputFields
                      name={"workEmail"}
                      type={"text"}
                      value={
                        props.formValues.workEmail && props.formValues.workEmail
                      }
                      label={"Enter Your work email"}
                      error={
                        props.formError.workEmail && props.formError.workEmail
                      }
                      width="300px"
                      margin="20px"
                    />
                    <InputFields
                      name={"workAddress"}
                      type={"text"}
                      value={
                        props.formValues.workAddress &&
                        props.formValues.workAddress
                      }
                      label={"Enter your work address"}
                      error={
                        props.formError.workAddress &&
                        props.formError.workAddress
                      }
                      width="300px"
                    />
                  </div>
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "5%" }}
                  >
                    <Showinprofile />
                  </div>
                </>
              )}
              {props.currentStep === 16 && (
                <>
                  <Title title="Pick your Interests" />
                  <CheckBox name='yourInterest' options={yourInterestOptions} value={props.formValues.yourInterest} handleChange={props.handleChange}/>
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "5%" }}
                  >
                    <Showinprofile />
                  </div>
                </>
              )}
              {props.currentStep === 17 && (
                <>
                  <Title title="Where is Your home" />
                  <div>
                    <InputFields
                      name={"houseNo"}
                      type={"text"}
                      value={
                        props.formValues.houseNo && props.formValues.houseNo
                      }
                      label={"Enter House No."}
                      error={props.formError.houseNo && props.formError.houseNo}
                      width="300px"
                      margin="20px"
                      top="40px"
                    />
                    <InputFields
                      name={"streetName"}
                      type={"text"}
                      value={
                        props.formValues.streetName &&
                        props.formValues.streetName
                      }
                      label={"Enter your Street address"}
                      error={
                        props.formError.streetName && props.formError.streetName
                      }
                      width="300px"
                      top="40px"
                    />
                    <br />
                    <InputFields
                      name={"city"}
                      type={"text"}
                      value={props.formValues.city && props.formValues.city}
                      label={"Enter Your city"}
                      error={props.formError.city && props.formError.city}
                      width="300px"
                      margin="20px"
                    />
                    <InputFields
                      name={"state"}
                      type={"text"}
                      value={props.formValues.state && props.formValues.state}
                      label={"Enter your State or province"}
                      error={props.formError.state && props.formError.state}
                      width="300px"
                    />
                    <br />
                    <InputFields
                      name={"postalCode"}
                      type={"text"}
                      value={
                        props.formValues.postalCode &&
                        props.formValues.postalCode
                      }
                      label={"Enter your ZIP or postal code"}
                      error={
                        props.formError.postalCode && props.formError.postalCode
                      }
                      width="300px"
                      margin="20px"
                    />
                    <DropDown 
                    name="country"
                    value={props.formValues.country}
                      defaultvalue="India"
                      list={countries}
                      width="300px"
                    />
                  </div>
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "5%" }}
                  >
                    <Showinprofile />
                  </div>
                </>
              )}
              {props.currentStep === 19 && (
                <>
                  <Title title="You are Interested in" />
                  <div style={{ width: "100vw" }}>
                    <DropDown
                    name="interestedIn"
                      defaultvalue="Male"
                      value={props.formValues.interestedIn}
                      list={["Male", "Female", "Transgender"]}
                      black
                    />
                  </div>
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "5%" }}
                  >
                    <Showinprofile />
                  </div>
                </>
              )}
              {props.currentStep === 18 && (
                <>
                  <Title title="Your Experience" />
                  <RadioButton
                    drink
                    itemsPerRow="3"
                    options={[
                      "1",
                      "1.5",
                      "2",
                      "2.5",
                      "3",
                      "3.5",
                      "4",
                      "4.5",
                      "5+",
                    ]}
                    name="experience"
                    value={props.formValues.experience}
                    handleChange={props.handleChange}
                  />
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "5%" }}
                  >
                    <Showinprofile />
                  </div>
                </>
              )}
              {props.currentStep === 20 && (
                <>
                  <Title title="Upload your Photo or Video" />
                <PhotoUpload name='photoUpload'  />
                  <div
                    style={{ position: "absolute", bottom: "10%", left: "5%" }}
                  ></div>
                </>
              )}

              {props.currentStep >= 2 && (
                <button
                  className="position-absolute backbtn"
                  type="button"
                  onClick={() => {
                    props.handleBack();
                  }}
                >
                  Back
                </button>
              )}
              <button
                className="nextbtn3 align-self-end"
                // onClick={props.handleNext}
                type="submit"
              >
                {props.currentStep < 20 ? "next" : "finish"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserForms;
