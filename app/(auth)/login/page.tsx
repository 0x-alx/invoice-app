'use client'

import { LoginForm } from '@/components/login/login-form'
import { SignUpForm } from '@/components/login/signup-form'
import Image from 'next/image'
import { useState } from 'react'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex min-h-screen">
      {/* Left side - Illustration */}
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/placeholder.svg?height=1080&width=1080"
          alt="SaaS Illustration"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      
      {/* Right side - Auth Form */}
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? 'Please sign in to your account' : 'Sign up to get started'}
            </p>
          </div>
          {isLogin ? <LoginForm /> : <SignUpForm />}
          <div className="text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

