'use client';

import { signIn } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const LoginPage = () => {
     const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const data = Object.fromEntries(formData.entries());

          const { data: resData, error } = await signIn.email({
               email: data.email as string,
               password: data.password as string,
               // callbackURL: '/',
               rememberMe: true,
          });

          if (error) {
               toast.error(error.message || ' Sign in Failed! Please try again');
          } else {
               toast.success('User Login successfully');
          }
     };
     return (
          <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
               <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md border border-slate-200">
                    <div className="mb-6 text-center">
                         <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                              Welcome Back
                         </h2>
                         <p className="mt-1 text-sm text-slate-500">
                              Sign in to access your account
                         </p>
                    </div>

                    <form onSubmit={handleSignIn}>
                         {/* Email Address */}
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

                         {/* Remember Me & Forgot Password */}
                         <div className="mb-6 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                   <input
                                        type="checkbox"
                                        id="rememberMe"
                                        name="rememberMe"
                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                   />
                                   <label
                                        htmlFor="rememberMe"
                                        className="text-sm text-slate-600 select-none cursor-pointer"
                                   >
                                        Remember me
                                   </label>
                              </div>

                              <a
                                   href="#"
                                   className="text-sm font-medium text-blue-600 hover:underline"
                              >
                                   Forgot password?
                              </a>
                         </div>

                         {/* Submit Button */}
                         <button
                              type="submit"
                              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                         >
                              Sign In
                         </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                         Don&apos;t have an account?{' '}
                         <a href="#" className="font-semibold text-blue-600 hover:underline">
                              Register
                         </a>
                    </p>
               </div>
          </div>
     );
};

export default LoginPage;
