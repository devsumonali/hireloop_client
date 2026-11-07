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
          const role = formData.get('role') as 'seeker' | 'recruiter';

          if (password !== confirmPassword) {
               toast.error('Passwords do not match');
               return;
          }

          const { data: resData, error } = await signUp.email({
               name: fullName,
               email: email,
               password: password,
               role: role,

               //optional data
               phone: phone,
          });

          if (error) {
               toast.error(error.message || 'Sign up failed! Please try again.');
          } else {
               toast.success('User registration successfull');
          }

          console.log(resData);
     };

     return (
          <main className="relative isolate flex flex-1 items-center justify-center overflow-hidden bg-[#050507] bg-[radial-gradient(ellipse_at_50%_35%,rgba(79,70,229,0.15),transparent_60%)] px-4 py-10 text-white">
               <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0b0b0f]/95 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.65)] ring-1 ring-indigo-400/10 sm:p-6">
                    <div className="mb-5 text-center">
                         <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                              Create your account
                         </h2>
                         <p className="mt-1 text-xs leading-5 text-white/50">
                              Three minutes to set up. Matches start arriving today.
                         </p>
                    </div>

                    <form onSubmit={handleRegistration}>
                         {/* Full Name */}
                         <div className="mb-3">
                              <label
                                   htmlFor="fullName"
                                   className="mb-1.5 block text-xs font-medium text-white/75"
                              >
                                   Full Name
                              </label>
                              <input
                                   type="text"
                                   id="fullName"
                                   name="fullName"
                                   placeholder="John Doe"
                                   className="w-full rounded-lg border border-white/10 bg-[#17171c] px-3 py-2.5 text-xs text-white placeholder-white/35 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                              />
                         </div>

                         {/* Email */}
                         <div className="mb-3">
                              <label
                                   htmlFor="email"
                                   className="mb-1.5 block text-xs font-medium text-white/75"
                              >
                                   Email Address
                              </label>
                              <input
                                   type="email"
                                   id="email"
                                   name="email"
                                   placeholder="you@example.com"
                                   className="w-full rounded-lg border border-white/10 bg-[#17171c] px-3 py-2.5 text-xs text-white placeholder-white/35 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                              />
                         </div>

                         {/* Phone Number */}
                         <div className="mb-3">
                              <label
                                   htmlFor="phone"
                                   className="mb-1.5 block text-xs font-medium text-white/75"
                              >
                                   Phone Number
                              </label>
                              <input
                                   type="tel"
                                   id="phone"
                                   name="phone"
                                   placeholder="+8801XXXXXXXXX"
                                   className="w-full rounded-lg border border-white/10 bg-[#17171c] px-3 py-2.5 text-xs text-white placeholder-white/35 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                              />
                         </div>

                         {/* Account Type */}
                         <fieldset className="mb-3">
                              <legend className="mb-1.5 block text-xs font-medium text-white/75">
                                   Joining HireLoop as
                              </legend>
                              <div className="grid grid-cols-2 gap-2">
                                   <label className="cursor-pointer">
                                        <input
                                             type="radio"
                                             name="role"
                                             value="seeker"
                                             defaultChecked
                                             required
                                             className="peer sr-only"
                                        />
                                        <span className="flex h-full flex-col rounded-lg border border-white/10 bg-[#17171c] p-3 transition hover:border-indigo-400/60 peer-checked:border-indigo-400 peer-checked:bg-indigo-500/10 peer-checked:ring-1 peer-checked:ring-indigo-400 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo-400">
                                             <span className="text-xs font-semibold text-white">
                                                  Job seeker
                                             </span>
                                             <span className="mt-1 text-xs leading-5 text-white/50">
                                                  I’m looking for my next opportunity
                                             </span>
                                        </span>
                                   </label>
                                   <label className="cursor-pointer">
                                        <input
                                             type="radio"
                                             name="role"
                                             value="recruiter"
                                             className="peer sr-only"
                                        />
                                        <span className="flex h-full flex-col rounded-lg border border-white/10 bg-[#17171c] p-3 transition hover:border-indigo-400/60 peer-checked:border-indigo-400 peer-checked:bg-indigo-500/10 peer-checked:ring-1 peer-checked:ring-indigo-400 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo-400">
                                             <span className="text-xs font-semibold text-white">
                                                  Recruiter
                                             </span>
                                             <span className="mt-1 text-xs leading-5 text-white/50">
                                                  I’m hiring for my team
                                             </span>
                                        </span>
                                   </label>
                              </div>
                         </fieldset>

                         {/* Password */}
                         <div className="mb-3">
                              <label
                                   htmlFor="password"
                                   className="mb-1.5 block text-xs font-medium text-white/75"
                              >
                                   Password
                              </label>
                              <input
                                   type="password"
                                   id="password"
                                   name="password"
                                   placeholder="••••••••"
                                   className="w-full rounded-lg border border-white/10 bg-[#17171c] px-3 py-2.5 text-xs text-white placeholder-white/35 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                              />
                         </div>

                         {/* Confirm Password */}
                         <div className="mb-4">
                              <label
                                   htmlFor="confirmPassword"
                                   className="mb-1.5 block text-xs font-medium text-white/75"
                              >
                                   Confirm Password
                              </label>
                              <input
                                   type="password"
                                   id="confirmPassword"
                                   name="confirmPassword"
                                   placeholder="••••••••"
                                   className="w-full rounded-lg border border-white/10 bg-[#17171c] px-3 py-2.5 text-xs text-white placeholder-white/35 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                              />
                         </div>

                         {/* Terms & Conditions Checkbox */}
                         <div className="mb-4 flex items-center gap-2">
                              <input
                                   type="checkbox"
                                   id="terms"
                                   name="terms"
                                   className="h-4 w-4 rounded border-white/20 bg-[#08080b] text-indigo-500 focus:ring-indigo-500"
                              />
                              <label
                                   htmlFor="terms"
                                   className="cursor-pointer select-none text-xs text-white/60"
                              >
                                   I agree to the{' '}
                                   <a
                                        href="#"
                                        className="font-medium text-indigo-300 hover:underline"
                                   >
                                        Terms and Conditions
                                   </a>
                              </label>
                         </div>

                         {/* Submit Button */}
                         <button
                              type="submit"
                             className="w-full rounded-lg border border-indigo-400/70 bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(99,80,255,0.28)] transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                         >
                              Sign Up
                         </button>
                    </form>

                    <p className="mt-4 text-center text-xs text-white/50">
                         Already have an account?{' '}
                         <a href="#" className="font-semibold text-indigo-300 hover:underline">
                              Log in
                         </a>
                    </p>
               </div>
          </main>
     );
};

export default RegistrationPage;
