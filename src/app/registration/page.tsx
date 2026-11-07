'use client';

import { signUp } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const RegistrationPage = () => {
     const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);

          const fullName = formData.get('fullName') as string;
          const email = formData.get('email') as string;
          const password = formData.get('password') as string;
          const confirmPassword = formData.get('confirmPassword') as string;
          const phone = formData.get('phone') as string;

          if (password !== confirmPassword) {
               toast.error('Passwords do not match');
               return;
          }

          const { data: resData, error } = await signUp.email({
               name: fullName,
               email: email,
               password: password,

               //optional data
               phone: phone,
          });

          if (error) {
               toast.error(error.message || 'Sign up failed! Please try again.');
          } else {
               toast.success('User registration successfull');
          }
     };

     return (
          <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
               <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md border border-slate-200">
                    <div className="mb-6 text-center">
                         <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                              Create an Account
                         </h2>
                         <p className="mt-1 text-sm text-slate-500">Sign up to get started</p>
                    </div>

                    <form onSubmit={handleRegistration}>
                         {/* Full Name */}
                         <div className="mb-4">
                              <label
                                   htmlFor="fullName"
                                   className="block text-sm font-medium text-slate-700 mb-1"
                              >
                                   Full Name
                              </label>
                              <input
                                   type="text"
                                   id="fullName"
                                   name="fullName"
                                   placeholder="John Doe"
                                   className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                              />
                         </div>

                         {/* Email */}
                         <div className="mb-4">
                              <label
                                   htmlFor="email"
                                   className="block text-sm font-medium text-slate-700 mb-1"
                              >
                                   Email Address
                              </label>
                              <input
                                   type="email"
                                   id="email"
                                   name="email"
                                   placeholder="you@example.com"
                                   className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                              />
                         </div>

                         {/* Phone Number */}
                         <div className="mb-4">
                              <label
                                   htmlFor="phone"
                                   className="block text-sm font-medium text-slate-700 mb-1"
                              >
                                   Phone Number
                              </label>
                              <input
                                   type="tel"
                                   id="phone"
                                   name="phone"
                                   placeholder="+8801XXXXXXXXX"
                                   className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                              />
                         </div>

                         {/* Password */}
                         <div className="mb-4">
                              <label
                                   htmlFor="password"
                                   className="block text-sm font-medium text-slate-700 mb-1"
                              >
                                   Password
                              </label>
                              <input
                                   type="password"
                                   id="password"
                                   name="password"
                                   placeholder="••••••••"
                                   className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                              />
                         </div>

                         {/* Confirm Password */}
                         <div className="mb-5">
                              <label
                                   htmlFor="confirmPassword"
                                   className="block text-sm font-medium text-slate-700 mb-1"
                              >
                                   Confirm Password
                              </label>
                              <input
                                   type="password"
                                   id="confirmPassword"
                                   name="confirmPassword"
                                   placeholder="••••••••"
                                   className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                              />
                         </div>

                         {/* Terms & Conditions Checkbox */}
                         <div className="mb-6 flex items-center gap-2">
                              <input
                                   type="checkbox"
                                   id="terms"
                                   name="terms"
                                   className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                              />
                              <label
                                   htmlFor="terms"
                                   className="text-sm text-slate-600 select-none cursor-pointer"
                              >
                                   I agree to the{' '}
                                   <a
                                        href="#"
                                        className="font-medium text-blue-600 hover:underline"
                                   >
                                        Terms and Conditions
                                   </a>
                              </label>
                         </div>

                         {/* Submit Button */}
                         <button
                              type="submit"
                              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                         >
                              Create Account
                         </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                         Already have an account?{' '}
                         <a href="#" className="font-semibold text-blue-600 hover:underline">
                              Log in
                         </a>
                    </p>
               </div>
          </div>
     );
};

export default RegistrationPage;
