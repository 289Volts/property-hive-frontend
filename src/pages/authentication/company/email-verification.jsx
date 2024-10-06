import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from './company -signup';

const CompanyEmailVerification = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleBackClick = () => {
    navigate('/company-signin');
  };

  // Email validation function

  const handleSubmit = async (data) => {
    data.preventDefault();

    setIsLoading(true); // Start loading
    
    try {
      const headers  = {
        'Content-Type' : 'application/json'
      }
      const useremail = localStorage.getItem('user-email');
      const code = email;

      const data = {
         email: useremail,
        code : code,
      };
      console.log(data)

      const response = await axios.post(`${baseurl}api/v1/verify-email/` , data, {
        headers: headers
      })
    

      const message = response.data.message;
     
      

      if (message === 'Verification email sent.') {
        localStorage.clear();
        alert('Verification email sent. Please check your email')
        navigate('/company-')
      }
      // const response = await axios.post('/api/verify-email', { email });
      // console.log('Verification response:', response.data);
      // // Handle successful verification (e.g., navigate to another page)
      // navigate('/verification-success'); // Example success page


    } catch (error) {
      console.error('Error verifying email:', error);
      setEmailError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row p-4 lg:p-20 bg-gray-100">
      {/* Left side with image and lock icon */}
      <div className="lg:w-1/2 w-full h-64 lg:h-auto bg-teal-800 flex items-center justify-center relative">
        {/* Background image */}
        <div
          className="absolute inset-0 opacity-60 bg-cover bg-center"
          style={{ backgroundImage: "url('/user-auth-images/Frame 1.png')" }}
        ></div>
      </div>

      {/* Right side with form */}
      <div className="lg:w-1/2 w-full flex flex-col justify-center p-4 lg:p-8 bg-white">
        <button
          className="text-gray-600 text-sm flex items-center mb-4"
          onClick={handleBackClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <h2 className="text-3xl font-bold mb-4 mt-10">User Verification</h2>
        <p className="text-gray-500 mb-6">Please enter your details below</p>

        {/* Email input */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-gray-700"
            >
              Valid ID Number (NIN/Passport/Driver's License)
            </label>
            <input
              type="number"
              id="email"
              placeholder="Enter ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${
                isSubmitted && emailError ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-teal-600 focus:border-teal-600`}
              aria-describedby="email-error"
            />
            {isSubmitted && emailError && (
              <p id="email-error" className="text-red-500 text-sm mt-1" aria-live="assertive">
                {emailError}
              </p>
            )}
          </div>

          {/* Verify button */}
          <button
            type="submit"
            className={`w-full mt-6 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        {/* Resend verification email */}
        <p className="text-sm text-gray-500 mt-4">
          Didn’t receive a code? 
          <span className="text-teal-500 cursor-pointer ml-1" onClick={() => console.log('Resend code functionality')}>
            Resend verification email
          </span>
        </p>
      </div>
    </div>
  );
};

export default CompanyEmailVerification;



// import { useState } from 'react';
// import axios from 'axios';

// const EmailVerification = () => {
//   const [email, setEmail] = useState('');
//   const [verificationStatus, setVerificationStatus] = useState(null);

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handleVerifyClick = async () => {
//     try {
//       const response = await axios.post('/api/send-verification-email', {
//         email,
//       });

//       setVerificationStatus('success');
//       console.log('Email sent successfully!', response.data);
//     } catch (error) {
//       setVerificationStatus('error');
//       console.error('Failed to send email:', error);
//     }
//   };

//   let statusMessage = null;
//   if (verificationStatus === 'success') {
//     statusMessage = <div>Email sent successfully!</div>;
//   } else if (verificationStatus === 'error') {
//     statusMessage = <div>Failed to send email. Please try again.</div>;
//   }

//   return (
//     <div>
//       <input
//         type="email"
//         value={email}
//         onChange={handleEmailChange}
//         placeholder="Enter your email"
//       />
//       <button onClick={handleVerifyClick}>Verify</button>
//       {statusMessage}
//     </div>
//   );
// };

// export default EmailVerification;