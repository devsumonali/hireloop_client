'use client';

import { signUp } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegistrationPage = () => {
     const router = useRouter();
     const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);

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
               toast.success('User registration successfull' + resData.user.name);
               router.refresh();
               form.reset();
               router.push('/');
          }
     };

     return (
          <main className="relative isolate flex flex-1 items-center justify-center overflow-hidden bg-[#050507] bg-[radial-gradient(ellipse_at_50%_35%,rgba(79,70,229,0.15),transparent_60%)] px-4 py-10 text-white">
               <div className="relative w-full max-w-140 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0f]/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.65)] ring-1 ring-indigo-400/10 before:absolute before:left-1/2 before:top-0 before:h-px before:w-2/3 before:-translate-x-1/2 before:bg-linear-to-r before:from-transparent before:via-indigo-400 before:to-transparent sm:p-6">
                    <div className="mb-4 text-center">
                         <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 shadow-[0_0_20px_rgba(99,80,255,0.15)]">
                              <svg
                                   aria-hidden="true"
                                   viewBox="0 0 24 24"
                                   className="h-4 w-4"
                                   fill="none"
                                   stroke="currentColor"
                                   strokeWidth="1.6"
                              >
                                   <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                   <circle cx="10" cy="7" r="4" />
                                   <path d="M20 8v6m3-3h-6" />
                              </svg>
                         </div>
                         <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                              Create your account
                         </h2>
                         <p className="mt-1 text-base leading-5 text-white/50">
                              Three minutes to set up. Matches start arriving today.
                         </p>
                    </div>

                    <form
                         onSubmit={handleRegistration}
                         className="grid grid-cols-1 gap-x-3 gap-y-2.5 sm:grid-cols-2"
                    >
                         {/* Full Name */}
                         <div>
                              <label
                                   htmlFor="fullName"
                                   className="mb-1.5 block text-base font-medium text-white/75"
                              >
                                   Full Name
                              </label>
                              <input
                                   type="text"
                                   id="fullName"
                                   name="fullName"
                                   placeholder="John Doe"
                                   className="w-full rounded-lg border border-white/10 bg-[#15151a] px-3 py-2.5 text-base text-white placeholder-white/30 outline-none transition duration-200 hover:border-white/20 focus:border-indigo-400 focus:bg-[#18171f] focus:ring-4 focus:ring-indigo-500/10"
                              />
                         </div>

                         {/* Email */}
                         <div>
                              <label
                                   htmlFor="email"
                                   className="mb-1.5 block text-base font-medium text-white/75"
                              >
                                   Email Address
                              </label>
                              <input
                                   type="email"
                                   id="email"
                                   name="email"
                                   placeholder="you@example.com"
                                   className="w-full rounded-lg border border-white/10 bg-[#15151a] px-3 py-2.5 text-base text-white placeholder-white/30 outline-none transition duration-200 hover:border-white/20 focus:border-indigo-400 focus:bg-[#18171f] focus:ring-4 focus:ring-indigo-500/10"
                              />
                         </div>

                         {/* Phone Number */}
                         <div className="sm:col-span-2">
                              <label
                                   htmlFor="phone"
                                   className="mb-1.5 block text-base font-medium text-white/75"
                              >
                                   Phone Number
                              </label>
                              <input
                                   type="tel"
                                   id="phone"
                                   name="phone"
                                   placeholder="+8801XXXXXXXXX"
                                   className="w-full rounded-lg border border-white/10 bg-[#15151a] px-3 py-2.5 text-base text-white placeholder-white/30 outline-none transition duration-200 hover:border-white/20 focus:border-indigo-400 focus:bg-[#18171f] focus:ring-4 focus:ring-indigo-500/10"
                              />
                         </div>

                         {/* Account Type */}
                         <fieldset className="order-first sm:col-span-2">
                              <legend className="mb-1 block text-base font-medium tracking-wide text-white/60">
                                   Joining HireLoop as
                              </legend>
                              <div className="grid grid-cols-3 gap-2">
                                   <label className="cursor-pointer">
                                        <input
                                             type="radio"
                                             name="role"
                                             value="seeker"
                                             defaultChecked
                                             required
                                             className="peer sr-only"
                                        />
                                        <span className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-[#15151a] px-2 py-1.5 text-center transition duration-200 hover:border-indigo-400/50 hover:bg-[#191820] peer-checked:border-indigo-300/80 peer-checked:bg-linear-to-br peer-checked:from-indigo-500/15 peer-checked:to-violet-500/5 peer-checked:shadow-[0_0_18px_rgba(99,80,255,0.12)] peer-checked:ring-1 peer-checked:ring-indigo-400/60 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo-400">
                                             <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/6 text-indigo-200">
                                                  <svg
                                                       aria-hidden="true"
                                                       viewBox="0 0 24 24"
                                                       className="h-3 w-3"
                                                       fill="none"
                                                       stroke="currentColor"
                                                       strokeWidth="1.6"
                                                  >
                                                       <circle cx="12" cy="8" r="4" />
                                                       <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                                                  </svg>
                                             </span>
                                             <span className="min-w-0 text-base font-semibold text-white">
                                                  Job seeker
                                             </span>
                                             <span className="sr-only">
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
                                        <span className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-[#15151a] px-2 py-1.5 text-center transition duration-200 hover:border-indigo-400/50 hover:bg-[#191820] peer-checked:border-indigo-300/80 peer-checked:bg-linear-to-br peer-checked:from-indigo-500/15 peer-checked:to-violet-500/5 peer-checked:shadow-[0_0_18px_rgba(99,80,255,0.12)] peer-checked:ring-1 peer-checked:ring-indigo-400/60 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo-400">
                                             <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/6 text-indigo-200">
                                                  <svg
                                                       aria-hidden="true"
                                                       viewBox="0 0 24 24"
                                                       className="h-3 w-3"
                                                       fill="none"
                                                       stroke="currentColor"
                                                       strokeWidth="1.6"
                                                  >
                                                       <rect
                                                            x="3"
                                                            y="7"
                                                            width="18"
                                                            height="14"
                                                            rx="2"
                                                       />
                                                       <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18m-11 0v2h4v-2" />
                                                  </svg>
                                             </span>
                                             <span className="min-w-0 text-base font-semibold text-white">
                                                  Recruiter
                                             </span>
                                             <span className="sr-only">I’m hiring for my team</span>
                                        </span>
                                   </label>
                                   <label className="cursor-pointer">
                                        <input
                                             type="radio"
                                             name="role"
                                             value="admin"
                                             required
                                             className="peer sr-only"
                                        />
                                        <span className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-[#15151a] px-2 py-1.5 text-center transition duration-200 hover:border-indigo-400/50 hover:bg-[#191820] peer-checked:border-indigo-300/80 peer-checked:bg-linear-to-br peer-checked:from-indigo-500/15 peer-checked:to-violet-500/5 peer-checked:shadow-[0_0_18px_rgba(99,80,255,0.12)] peer-checked:ring-1 peer-checked:ring-indigo-400/60 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo-400">
                                             <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/6 text-indigo-200">
                                                  <svg
                                                       aria-hidden="true"
                                                       viewBox="0 0 24 24"
                                                       className="h-3 w-3"
                                                       fill="none"
                                                       stroke="currentColor"
                                                       strokeWidth="1.6"
                                                  >
                                                       <circle cx="12" cy="8" r="4" />
                                                       <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                                                  </svg>
                                             </span>
                                             <span className="min-w-0 text-base font-semibold text-white">
                                                  Admin
                                             </span>
                                             <span className="sr-only">
                                                  I’m looking for manage all
                                             </span>
                                        </span>
                                   </label>
                              </div>
                         </fieldset>

                         {/* Password */}
                         <div>
                              <label
                                   htmlFor="password"
                                   className="mb-1.5 block text-base font-medium text-white/75"
                              >
                                   Password
                              </label>
                              <input
                                   type="password"
                                   id="password"
                                   name="password"
                                   placeholder="••••••••"
                                   className="w-full rounded-lg border border-white/10 bg-[#15151a] px-3 py-2.5 text-base text-white placeholder-white/30 outline-none transition duration-200 hover:border-white/20 focus:border-indigo-400 focus:bg-[#18171f] focus:ring-4 focus:ring-indigo-500/10"
                              />
                         </div>

                         {/* Confirm Password */}
                         <div>
                              <label
                                   htmlFor="confirmPassword"
                                   className="mb-1.5 block text-base font-medium text-white/75"
                              >
                                   Confirm Password
                              </label>
                              <input
                                   type="password"
                                   id="confirmPassword"
                                   name="confirmPassword"
                                   placeholder="••••••••"
                                   className="w-full rounded-lg border border-white/10 bg-[#15151a] px-3 py-2.5 text-base text-white placeholder-white/30 outline-none transition duration-200 hover:border-white/20 focus:border-indigo-400 focus:bg-[#18171f] focus:ring-4 focus:ring-indigo-500/10"
                              />
                         </div>

                         {/* Terms & Conditions Checkbox */}
                         <div className="flex items-center gap-2 sm:col-span-2">
                              <input
                                   type="checkbox"
                                   id="terms"
                                   name="terms"
                                   className="h-4 w-4 rounded border-white/20 bg-[#08080b] text-indigo-500 focus:ring-indigo-500"
                              />
                              <label
                                   htmlFor="terms"
                                   className="cursor-pointer select-none text-base text-white/60"
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
                              className="w-full rounded-lg border border-indigo-300/70 bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-base font-semibold text-white shadow-[0_6px_22px_rgba(99,80,255,0.24)] transition duration-200 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 focus:outline-none focus:ring-4 focus:ring-indigo-400/25 sm:col-span-2"
                         >
                              Sign Up
                         </button>
                    </form>

                    <p className="mt-4 text-center text-base text-white/50">
                         Already have an account?{' '}
                         <Link
                              href="/login"
                              className="font-semibold text-indigo-300 hover:underline"
                         >
                              Log in
                         </Link>
                    </p>
               </div>
          </main>
     );
};

export default RegistrationPage;
