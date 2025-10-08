import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../../Hooks/usePost";
import { 
    FaEnvelope, 
    FaKey, 
    FaLock, 
    FaArrowLeft, 
    FaSpinner 
} from "react-icons/fa";
import mainLogo from '../../assets/Images/mainLogo.png';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    // State for different steps
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    // API hooks
    const { postData: postEmail, loadingPost: loadingEmail, response: responseEmail } = usePost({ url: `${apiUrl}/user/forget_password` });
    const { postData: postCode, loadingPost: loadingCode, response: responseCode } = usePost({ url: `${apiUrl}/user/confirm_code` });
    const { postData: postUpdatedPassword, loadingPost: loadingUpdatedPassword, response: responseUpdatedPassword } = usePost({ url: `${apiUrl}/user/update_password` });

    // Handle responses
    useEffect(() => {
        if (responseEmail && responseEmail.status === 200) {
            setStep(2); // Move to OTP step
            setSuccessMessage('OTP sent to your email successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    }, [responseEmail]);

    useEffect(() => {
        if (responseCode && responseCode.status === 200) {
            setStep(3); // Move to password reset step
            setSuccessMessage('OTP verified successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    }, [responseCode]);

    useEffect(() => {
        if (responseUpdatedPassword && responseUpdatedPassword.status === 200) {
            setSuccessMessage('Password updated successfully! Redirecting to login...');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }, [responseUpdatedPassword]);

    // Validation functions
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6; // Minimum 6 characters
    };

    // Step 1: Send email to get OTP
    const handleSendEmail = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!validateEmail(email)) {
            setErrors({ email: 'Please enter a valid email address' });
            return;
        }

        const emailData = { user: email };
        postEmail(emailData);
    };

    // Step 2: Verify OTP
    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!code || code.length !== 6) {
            setErrors({ code: 'Please enter a valid 6-digit OTP' });
            return;
        }

        const codeData = { user: email, code: code };
        postCode(codeData);
    };

    // Step 3: Reset password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setErrors({});

        const newErrors = {};
        
        if (!validatePassword(newPassword)) {
            newErrors.newPassword = 'Password must be at least 6 characters long';
        }
        
        if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const passwordData = {
            user: email,
            code: code,
            password: newPassword,
        };
        
        postUpdatedPassword(passwordData);
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
            setCode('');
        } else if (step === 3) {
            setStep(2);
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-white md:p-8">
            {/* Logo in top-left corner */}
            <img 
                src={mainLogo} 
                alt="Maths House Logo" 
                className="absolute object-contain h-12 top-4 left-4 md:h-16"
            />
            
            <div className="relative flex w-full overflow-hidden max-w-7xl rounded-3xl">
                {/* Left side - Form */}
                <div className="flex flex-col justify-center w-full p-6 md:w-3/5 md:p-12">
                    {/* Back button */}
                    <button
                        onClick={step === 1 ? handleBackToLogin : handleBack}
                        className="flex items-center mb-6 transition-colors duration-200 text-mainColor hover:text-secondColor"
                    >
                        <FaArrowLeft className="mr-2" />
                        {step === 1 ? 'Back to Login' : 'Back'}
                    </button>

                    <div className="mb-8 text-center">
                        <h1 className="mb-2 text-3xl font-bold md:text-4xl text-mainColor">
                            {step === 1 && 'Reset Password'}
                            {step === 2 && 'Enter OTP'}
                            {step === 3 && 'New Password'}
                        </h1>
                        <p className="text-lg text-mainColor/80">
                            {step === 1 && 'Enter your email to receive OTP'}
                            {step === 2 && 'Enter the 6-digit code sent to your email'}
                            {step === 3 && 'Enter your new password'}
                        </p>
                    </div>

                    {/* Progress indicator */}
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center">
                            {[1, 2, 3].map((stepNumber) => (
                                <React.Fragment key={stepNumber}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        step >= stepNumber 
                                            ? 'bg-mainColor text-white' 
                                            : 'bg-gray-200 text-gray-400'
                                    }`}>
                                        {stepNumber}
                                    </div>
                                    {stepNumber < 3 && (
                                        <div className={`w-12 h-1 mx-2 ${
                                            step > stepNumber 
                                                ? 'bg-mainColor' 
                                                : 'bg-gray-200'
                                        }`} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="p-3 mb-4 text-sm text-green-700 rounded-lg bg-green-50">
                            {successMessage}
                        </div>
                    )}

                    {/* Step 1: Email Input */}
                    {step === 1 && (
                        <form onSubmit={handleSendEmail} className="space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FaEnvelope className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                                            errors.email ? 'border-red-400' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-mainColor/20 focus:border-mainColor outline-none transition duration-300 bg-gray-50 hover:bg-white`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loadingEmail}
                                className="flex items-center justify-center w-full px-4 py-3 font-bold text-white transition duration-300 transform rounded-lg shadow-md bg-mainColor hover:bg-secondColor hover:shadow-xl hover:-translate-y-1 disabled:opacity-70"
                            >
                                {loadingEmail ? (
                                    <>
                                        <FaSpinner className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" />
                                        Sending OTP...
                                    </>
                                ) : 'Send OTP'}
                            </button>
                        </form>
                    )}

                    {/* Step 2: OTP Input */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyCode} className="space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Verification Code
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FaKey className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        placeholder="Enter 6-digit code"
                                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                                            errors.code ? 'border-red-400' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-mainColor/20 focus:border-mainColor outline-none transition duration-300 bg-gray-50 hover:bg-white text-center tracking-widest`}
                                        maxLength={6}
                                    />
                                </div>
                                {errors.code && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.code}
                                    </p>
                                )}
                                <p className="mt-2 text-sm text-gray-500">
                                    Code sent to: {email}
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loadingCode}
                                className="flex items-center justify-center w-full px-4 py-3 font-bold text-white transition duration-300 transform rounded-lg shadow-md bg-mainColor hover:bg-secondColor hover:shadow-xl hover:-translate-y-1 disabled:opacity-70"
                            >
                                {loadingCode ? (
                                    <>
                                        <FaSpinner className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" />
                                        Verifying...
                                    </>
                                ) : 'Verify Code'}
                            </button>
                        </form>
                    )}

                    {/* Step 3: New Password Input */}
                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FaLock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                                            errors.newPassword ? 'border-red-400' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-mainColor/20 focus:border-mainColor outline-none transition duration-300 bg-gray-50 hover:bg-white`}
                                    />
                                </div>
                                {errors.newPassword && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.newPassword}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FaLock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                                            errors.confirmPassword ? 'border-red-400' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-mainColor/20 focus:border-mainColor outline-none transition duration-300 bg-gray-50 hover:bg-white`}
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loadingUpdatedPassword}
                                className="flex items-center justify-center w-full px-4 py-3 font-bold text-white transition duration-300 transform rounded-lg shadow-md bg-mainColor hover:bg-secondColor hover:shadow-xl hover:-translate-y-1 disabled:opacity-70"
                            >
                                {loadingUpdatedPassword ? (
                                    <>
                                        <FaSpinner className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" />
                                        Updating...
                                    </>
                                ) : 'Reset Password'}
                            </button>
                        </form>
                    )}
                </div>

                {/* Right side - Logo (hidden on small screens) */}
                <div className="items-center justify-center hidden w-2/5 md:flex bg-gradient-to-br from-mainColor to-secondColor">
                    <img 
                        src={mainLogo} 
                        alt="Maths House Logo" 
                        className="object-contain w-3/4 max-w-md animate-float"
                    />
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;