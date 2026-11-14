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
        <header className="relative z-20 border-b border-white/10 bg-[#09090d] text-white">
            <div className="mx-auto flex min-h-17 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
                <Link href="/" aria-label="HireLoop home" className="shrink-0">
                    <Image
                        src="/images/logo.png"
                        alt="HireLoop"
                        width={154}
                        height={44}
                        priority
                        className="h-auto w-28 sm:w-33"
                    />
                </Link>

                <nav className="hidden items-center gap-7 text-base text-white/75 md:flex">
                    <Link href="/" className="transition hover:text-white">
                        Browse Jobs
                    </Link>
                    <span>Company</span>
                    <span>Pricing</span>
                </nav>

                <div className="flex items-center gap-2 sm:gap-4">
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
                                className="rounded-lg border cursor-pointer border-indigo-400/70 px-3 py-2 text-base font-medium shadow-[0_0_18px_rgba(99,80,255,0.2)] transition hover:bg-indigo-500 sm:px-4"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                aria-current={isLoginPage ? 'page' : undefined}
                                className={`rounded-md px-2 py-2 text-base transition hover:text-white sm:px-3 ${isLoginPage ? 'text-white' : 'text-indigo-300'}`}
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/registration"
                                aria-current={isRegistrationPage ? 'page' : undefined}
                                className={`rounded-lg border border-indigo-400/70 px-3 py-2 text-base font-medium shadow-[0_0_18px_rgba(99,80,255,0.2)] transition hover:bg-indigo-500 sm:px-4 ${isRegistrationPage ? 'bg-indigo-500' : 'bg-indigo-600'}`}
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
