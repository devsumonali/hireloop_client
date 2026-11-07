'use client';

import { signIn } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
     const router = useRouter();

     const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
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
               toast.success('User Login successfully ' + ' ' + resData.user.name);
               router.refresh();
               form.reset();
               router.push('/');
          }
     };
     return (
          <main className="relative isolate flex flex-1 items-center justify-center overflow-hidden bg-[#050507] bg-[radial-gradient(ellipse_at_50%_35%,rgba(79,70,229,0.15),transparent_60%)] px-4 py-10 text-white">
               <div className="relative w-full max-w-120 rounded-2xl border border-white/10 bg-[#0b0b0f]/95 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.65)] ring-1 ring-indigo-400/10 sm:p-6">
                    <div className="mb-6 text-center">
                         <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                              Welcome back
                         </h2>
                         <p className="mt-1 text-base leading-5 text-white/50">
                              Sign in to continue to your HireLoop account.
                         </p>
                    </div>

                    <form onSubmit={handleSignIn}>
                         {/* Email Address */}
                         <div className="mb-4">
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
                                   className="w-full rounded-lg border border-white/10 bg-[#17171c] px-3 py-2.5 text-base text-white placeholder-white/35 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                              />
                         </div>

                         {/* Password */}
                         <div className="mb-4">
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
                                   className="w-full rounded-lg border border-white/10 bg-[#17171c] px-3 py-2.5 text-base text-white placeholder-white/35 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                              />
                         </div>

                         {/* Remember Me & Forgot Password */}
                         <div className="mb-5 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                   <input
                                        type="checkbox"
                                        id="rememberMe"
                                        name="rememberMe"
                                        className="h-4 w-4 rounded border-white/20 bg-[#08080b] text-indigo-500 focus:ring-indigo-500"
                                   />
                                   <label
                                        htmlFor="rememberMe"
                                        className="cursor-pointer select-none text-base text-white/60"
                                   >
                                        Remember me
                                   </label>
                              </div>

                              <a
                                   href="#"
                                   className="text-base font-medium text-indigo-300 hover:underline"
                              >
                                   Forgot password?
                              </a>
                         </div>

                         {/* Submit Button */}
                         <button
                              type="submit"
                              className="w-full rounded-lg border border-indigo-400/70 bg-indigo-600 px-4 py-2.5 text-base font-semibold text-white shadow-[0_0_24px_rgba(99,80,255,0.28)] transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                         >
                              Sign In
                         </button>
                    </form>

                    <p className="mt-5 text-center text-base text-white/50">
                         Don&apos;t have an account?{' '}
                         <Link
                              href="/registration"
                              className="font-semibold text-indigo-300 hover:underline"
                         >
                              Register
                         </Link>
                    </p>
               </div>
          </main>
     );
};

export default LoginPage;
