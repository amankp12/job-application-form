import React from 'react';
import useFormValidation from '../hooks/useFormValidation';

const initialFormState = {
  fullName: '',
  email: '',
  phoneNumber: '',
  position: '',
  relevantExperience: '',
  portfolioURL: '',
  managementExperience: '',
  additionalSkills: {
    javascript: false,
    css: false,
    python: false,
  },
  preferredInterviewTime: '',
};

const validate = (values) => {
  const errors = {};

  if (!values.fullName) errors.fullName = 'Full Name is required';
  if (!values.email) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Email is invalid';
  if (!values.phoneNumber) errors.phoneNumber = 'Phone Number is required';
  if (!values.position) errors.position = 'Applying for Position is required';
  if ((values.position === 'Developer' || values.position === 'Designer') && !values.relevantExperience) {
    errors.relevantExperience = 'Relevant Experience is required';
  } else if (values.relevantExperience && isNaN(values.relevantExperience)) {
    errors.relevantExperience = 'Relevant Experience must be a number';
  }
  if (values.position === 'Designer' && !values.portfolioURL) errors.portfolioURL = 'Portfolio URL is required';
  else if (values.portfolioURL && !/^https?:\/\/.+\..+$/.test(values.portfolioURL)) errors.portfolioURL = 'Portfolio URL is invalid';
  if (values.position === 'Manager' && !values.managementExperience) errors.managementExperience = 'Management Experience is required';
  if (!values.preferredInterviewTime) errors.preferredInterviewTime = 'Preferred Interview Time is required';
  if (!Object.values(values.additionalSkills).some(skill => skill)) errors.additionalSkills = 'At least one skill must be selected';

  return errors;
};

const JobApplicationForm = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormValidation(initialFormState, validate);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Job Application Form</h1>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.fullName && errors.fullName && <span>{errors.fullName}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="number"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.phoneNumber && errors.phoneNumber && <span>{errors.phoneNumber}</span>}
      </div>
      <div>
        <label>Applying for Position:</label>
        <select
          name="position"
          value={values.position}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="">Select</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
        {touched.position && errors.position && <span>{errors.position}</span>}
      </div>
      {(values.position === 'Developer' || values.position === 'Designer') && (
        <div>
          <label>Relevant Experience (years):</label>
          <input
            type="number"
            name="relevantExperience"
            value={values.relevantExperience}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.relevantExperience && errors.relevantExperience && <span>{errors.relevantExperience}</span>}
        </div>
      )}
      {values.position === 'Designer' && (
        <div>
          <label>Portfolio URL:</label>
          <input
            type="text"
            name="portfolioURL"
            value={values.portfolioURL}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.portfolioURL && errors.portfolioURL && <span>{errors.portfolioURL}</span>}
        </div>
      )}
      {values.position === 'Manager' && (
        <div>
          <label>Management Experience:</label>
          <input
            type="text"
            name="managementExperience"
            value={values.managementExperience}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.managementExperience && errors.managementExperience && <span>{errors.managementExperience}</span>}
        </div>
      )}
      <div>
        <label>Additional Skills:</label>
        <div className="skills">
          <label>
            <input
              type="checkbox"
              name="javascript"
              checked={values.additionalSkills.javascript}
              onChange={handleChange}
            />
            JavaScript
          </label>
          <label>
            <input
              type="checkbox"
              name="css"
              checked={values.additionalSkills.css}
              onChange={handleChange}
            />
            CSS
          </label>
          <label>
            <input
              type="checkbox"
              name="python"
              checked={values.additionalSkills.python}
              onChange={handleChange}
            />
            Python
          </label>
        </div>
        {touched.additionalSkills && errors.additionalSkills && <span>{errors.additionalSkills}</span>}
      </div>
      <div>
        <label>Preferred Interview Time:</label>
        <input
          type="datetime-local"
          name="preferredInterviewTime"
          value={values.preferredInterviewTime}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.preferredInterviewTime && errors.preferredInterviewTime && <span>{errors.preferredInterviewTime}</span>}
      </div>
      <button type="submit">Submit</button>
      {Object.keys(errors).length === 0 && Object.keys(touched).length > 0 && (
        <div>
          <h2>Form Summary</h2>
          <p>Full Name: {values.fullName}</p>
          <p>Email: {values.email}</p>
          <p>Phone Number: {values.phoneNumber}</p>
          <p>Applying for Position: {values.position}</p>
          {values.position === 'Developer' || values.position === 'Designer' ? (
            <p>Relevant Experience: {values.relevantExperience} years</p>
          ) : null}
          {values.position === 'Designer' ? <p>Portfolio URL: {values.portfolioURL}</p> : null}
          {values.position === 'Manager' ? <p>Management Experience: {values.managementExperience}</p> : null}
          <p>Additional Skills: {Object.keys(values.additionalSkills).filter(skill => values.additionalSkills[skill]).join(', ')}</p>
          <p>Preferred Interview Time: {values.preferredInterviewTime}</p>
        </div>
      )}
    </form>
  );
};

export default JobApplicationForm;