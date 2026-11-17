'use client';

import { useSession, signOut } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const pathname = usePathname();
    const isLoginPage = pathname === '/login';
    const isRegistrationPage = pathname === '/registration';

    const handleSignOut = async () => {
        await signOut();
        router.replace('/login');
        router.refresh();
    };

    if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) return null;

    return (
        <header className="relative z-20 px-4 pt-4 text-white font-[Arial,Helvetica,sans-serif] sm:px-6 sm:pt-6">
            <div className="mx-auto flex min-h-18.5 max-w-330 flex-wrap items-center justify-between gap-x-2 gap-y-3 rounded-2xl border border-white/10 bg-[#141414] px-3 py-3 shadow-[inset_0_1px_0_#ffffff05] sm:px-6 md:flex-nowrap md:gap-3 md:py-0">
                <Link href="/" aria-label="HireLoop home" className="shrink-0">
                    <Image
                        src="/images/logo.png"
                        alt="HireLoop"
                        width={154}
                        height={44}
                        preload
                        className="h-auto w-22 sm:w-33 lg:w-38.5"
                    />
                </Link>

                <nav className="order-last flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/75 sm:text-base md:order-0 md:ml-auto md:mr-3 md:w-auto md:gap-5 md:text-sm lg:mr-5 lg:gap-7 lg:text-base">
                    <Link
                        href="/browse-jobs"
                        aria-current={pathname.startsWith('/browse-jobs') ? 'page' : undefined}
                        className="transition hover:text-white"
                    >
                        Browse Jobs
                    </Link>
                    <span>Company</span>
                    <span>Pricing</span>
                </nav>

                <div className="flex shrink-0 items-center gap-2 whitespace-nowrap sm:gap-4 md:gap-4 md:border-l md:border-white/15 md:pl-4 lg:gap-6 lg:pl-7">
                    {session?.user ? (
                        <>
                            <Link
                                href={`/dashboard/${session?.user?.role}`}
                                className="text-sm font-medium text-indigo-300 transition hover:text-white"
                            >
                                Dashboard
                            </Link>

                            <button
                                onClick={handleSignOut}
                                className="rounded-lg border cursor-pointer border-indigo-400/70 px-3 py-2 text-sm font-medium shadow-[0_0_18px_rgba(99,80,255,0.2)] transition hover:bg-indigo-500 sm:px-4 sm:text-base"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                aria-current={isLoginPage ? 'page' : undefined}
                                className={`rounded-md px-2 py-2 text-sm transition hover:text-white sm:px-3 sm:text-base ${isLoginPage ? 'text-white' : 'text-indigo-300'}`}
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/registration"
                                aria-current={isRegistrationPage ? 'page' : undefined}
                                className="rounded-lg border border-indigo-400/70 bg-linear-to-br from-[#8574ff] to-[#5740ff] px-3 py-2 text-sm font-medium shadow-[0_0_18px_rgba(99,80,255,0.2)] transition hover:bg-indigo-500 sm:px-5 sm:py-3 sm:text-base"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
