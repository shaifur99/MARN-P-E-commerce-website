import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import SummaryApi from '../common'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(SummaryApi.forgot_password.url, {
        method: SummaryApi.forgot_password.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()
      if (data.success) {
        setEmailSent(true)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100'>
      {/* Decorative gradient blobs */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute w-72 h-72 bg-red-200/30 rounded-full blur-3xl top-10 left-10 animate-pulse'></div>
        <div className='absolute w-96 h-96 bg-pink-200/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse'></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='w-full max-w-md bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-100'
      >
        <div className='flex justify-center mb-8'>
          <Link to='/' className='text-2xl font-semibold text-gray-900'>
            <span className='text-red-600 font-bold'>E-Commerce</span>
          </Link>
        </div>

        {!emailSent ? (
          <>
            <Link
              to='/login'
              className='inline-flex items-center text-sm font-medium text-gray-600 hover:text-red-600 transition-colors mb-6'
            >
              <FaArrowLeft className='mr-2' /> Back to Login
            </Link>

            <div className='text-center mb-8'>
              <div className='flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mx-auto mb-4'>
                <FaEnvelope className='text-red-600 text-2xl' />
              </div>
              <h1 className='text-2xl font-semibold text-gray-900'>Forgot Password?</h1>
              <p className='text-sm text-gray-500 mt-2'>
                Enter your email address and we'll send you a password reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-5'>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                  Email Address
                </label>
                <input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='example@email.com'
                  className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition'
                  required
                />
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed'
              >
                {isLoading ? (
                  <div className='flex justify-center items-center gap-2'>
                    <div className='h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    Sending...
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>

            <p className='text-center text-sm text-gray-500 mt-6'>
              Remembered your password?{' '}
              <Link to='/login' className='text-red-600 hover:text-red-500 font-medium'>
                Sign in
              </Link>
            </p>
          </>
        ) : (
          <div className='text-center'>
            <div className='flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-5'>
              <FaEnvelope className='text-green-600 text-3xl' />
            </div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>Check Your Email</h2>
            <p className='text-gray-600 mb-6'>
              We’ve sent a password reset link to <br />
              <span className='font-medium text-gray-900'>{email}</span>
            </p>
            <p className='text-sm text-gray-500 mb-6'>
              Click the link in the email to reset your password. The link expires in 1 hour.
            </p>

            <div className='space-y-3'>
              <button
                onClick={() => setEmailSent(false)}
                className='w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition'
              >
                Resend Email
              </button>
              <Link
                to='/login'
                className='block w-full py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 font-medium text-gray-700 transition'
              >
                Back to Login
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default ForgotPassword
