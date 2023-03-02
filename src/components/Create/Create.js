import React, {useState} from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import "../Create/Create.css"
import countryPhoneCodes from "../../assets/countryPhoneCodes.json"

export default function Create() {

  const [countryCodesSearchFilter, setCountryCodesSearchFilter] = useState("")
  const [countryCode, setCountryCode] = useState("")
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("*Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("*Required"),
    email: Yup.string().email("Invalid Email").required("Required"),
    phoneNumber: Yup.string().required("*Required").matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        "Not Valid Phone Number"
      ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode:countryCode,
      phoneNumber: "",
    },
    validationSchema,
    onSubmit,
  });

  function onSearch (e){
    setCountryCodesSearchFilter(e.target.value)
    setCountryCode(e.target.value)
  }


  function onSubmit(){
    console.log(formik.values)
  }

  return (
    <div className="create">
        
      <form onSubmit={formik.handleSubmit} className="form">
      <h1>Form</h1>
        <div className="form-container">
          <label htmlFor="">First Name</label>
          <input
            type="text"
            placeholder="Enter your First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="form-error-container">
            {formik.touched.firstName&&formik.errors.firstName?<p className="errors">{formik.errors.firstName}</p>:<br />}
        </div>
        <br />
        <div className="form-container">
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            placeholder="Enter your Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="form-error-container">
        {formik.touched.lastName&&formik.errors.lastName?<p className="errors">{formik.errors.lastName}</p>:<br />}
        </div>
        <br />
        <div className="form-container">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="form-error-container">
        {formik.touched.email&&formik.errors.email?<p className="errors">{formik.errors.email}</p>:<br />}
        </div>
        <br />
        <div className="form-container">
          <label htmlFor="">Phone Number</label>
          <div className="country-codes-container">
          <input 
          type="search" 
          placeholder="Choose Country Code"
          className="country-code-input"
          name="countryCode"
          value={countryCode}
          onBlur={formik.onBlur}
          onChange={(e)=>{
            onSearch(e)
          }}
          />
          {
            (countryCodesSearchFilter!="")?
          <div className="dropdowns">
            {countryPhoneCodes.filter((searchResultsFilter)=>{
                const searchTerm = countryCodesSearchFilter.toLowerCase()
                const countryNames = searchResultsFilter.country.toLowerCase()
                const countryCodes = searchResultsFilter.code

                if(searchTerm&&countryNames.startsWith(searchTerm)){
                    return(
                        searchTerm&&countryNames.startsWith(searchTerm)
                    )
                } else if(searchTerm&&countryCodes.startsWith(searchTerm)){
                    return(
                        searchTerm&&countryCodes.startsWith(searchTerm)
                    )
                }  
                    
            }).map((searchResults)=>{
                return(
                    ((searchResults.code&&searchResults.country!=={}))?
                    <div className="search-results-dropdowns">
                         <p onClick={()=>setCountryCode("+"+searchResults.code+"    "+searchResults.country)} className="search-results-countries">{searchResults.country}<span className="search-results-codes"> +{searchResults.code}</span></p>
                    </div>:null
                )
            })}
          </div>:null
          }
          </div>
          
          <input
            type="text"
            placeholder="Enter your Phone Name"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="form-error-container">
        {formik.touched.phoneNumber&&formik.errors.phoneNumber?<p className="errors">{formik.errors.phoneNumber}</p>:<br />}
        </div>
        <button onClick={onSubmit} type="submit">Submit</button>
      </form>
    </div>
  );
}
