'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FiBookmark,
    FiBriefcase,
    FiDollarSign,
    FiFileText,
    FiGrid,
    FiSettings,
    FiUsers,
} from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { useSession } from '@/lib/auth-client';

// Change each url when its page is ready.
const menuItems = {
    admin: [
        { id: 'dashboard', name: 'Dashboard', icon: FiGrid, url: '/dashboard/admin' },
        { id: 'users', name: 'Users', icon: FiUsers, url: '/dashboard/admin/users' },
        {
            id: 'companies',
            name: 'Companies',
            icon: HiOutlineOfficeBuilding,
            url: '/dashboard/admin/companies',
        },
        { id: 'jobs', name: 'Jobs', icon: FiBriefcase, url: '/dashboard/admin/jobs' },
        { id: 'payments', name: 'Payments', icon: FiDollarSign, url: '/dashboard/admin/payments' },
        { id: 'settings', name: 'Settings', icon: FiSettings, url: '/dashboard/admin/settings' },
    ],
    seeker: [
        { id: 'dashboard', name: 'Dashboard', icon: FiGrid, url: '/dashboard/seeker' },
        {
            id: 'applications',
            name: 'My applications',
            icon: FiBriefcase,
            url: '/dashboard/seeker/applications',
        },
        {
            id: 'saved-jobs',
            name: 'Saved jobs',
            icon: FiBookmark,
            url: '/dashboard/seeker/saved-jobs',
        },
        { id: 'resume', name: 'My resume', icon: FiFileText, url: '/dashboard/seeker/resume' },
        { id: 'settings', name: 'Settings', icon: FiSettings, url: '/dashboard/seeker/settings' },
    ],
    recruiter: [
        { id: 'dashboard', name: 'Dashboard', icon: FiGrid, url: '/dashboard/recruiter' },
        { id: 'jobs', name: 'Jobs', icon: FiBriefcase, url: '/dashboard/recruiter/jobs' },
        {
            id: 'candidates',
            name: 'Candidates',
            icon: FiUsers,
            url: '/dashboard/recruiter/candidates',
        },
        {
            id: 'company',
            name: 'Company',
            icon: HiOutlineOfficeBuilding,
            url: '/dashboard/recruiter/company',
        },
        {
            id: 'settings',
            name: 'Settings',
            icon: FiSettings,
            url: '/dashboard/recruiter/settings',
        },
    ],
};

const roleNames = { admin: 'Admin', recruiter: 'Recruiter', seeker: 'Job Seeker' };

export default function DashboardSidebar() {
    const { data: session, isPending } = useSession();
    const pathname = usePathname();
    const user = session?.user;
    const role = user?.role ?? 'seeker';
    const roleName = roleNames[role] ?? roleNames.seeker;
    const menus = menuItems[role];

    return (
        <aside className="sticky top-0 flex h-dvh w-70 shrink-0 flex-col overflow-y-auto border-r border-white/5 bg-[#09090b] text-white">
            <div className="shrink-0 px-5 pt-6 pb-4">
                <Link
                    href="/"
                    aria-label="HireLoop home"
                    className="inline-block rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
                >
                    <Image
                        src="/images/logo.png"
                        alt="HireLoop"
                        width={154}
                        height={44}
                        className="h-auto w-26"
                        priority
                    />
                </Link>
                <p className="mt-1 text-[14px] text-zinc-500">
                    {isPending ? 'Loading…' : `${roleName} Console`}
                </p>
            </div>

            <nav aria-label="Dashboard navigation" className="flex-1 space-y-0.5 px-2.5">
                {menus.map(({ id, name, icon: Icon, url }) => {
                    const isActive =
                        pathname === url || (id === 'dashboard' && pathname === '/dashboard');

                    return (
                        <Link
                            key={id}
                            href={url}
                            prefetch={false}
                            aria-current={isActive ? 'page' : undefined}
                            className={`relative flex h-8 items-center gap-2 rounded-md px-2 text-md focus-visible:outline-2 focus-visible:outline-violet-400 ${isActive ? 'border border-white/5 bg-[#232327] font-medium text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            {isActive && (
                                <span
                                    aria-hidden="true"
                                    className="absolute top-1.5 bottom-1.5 left-0 w-0.5 rounded-full bg-violet-500"
                                />
                            )}
                            <Icon aria-hidden="true" className="size-5 shrink-0 text-zinc-400" />
                            {name}
                        </Link>
                    );
                })}
            </nav>

            <div className="mx-2.5 mt-6 mb-3 flex shrink-0 items-center gap-2.5 rounded-lg border border-white/10 bg-[#141416] p-2.5">
                {user?.image ? (
                    <Image
                        src={user.image}
                        alt=""
                        width={32}
                        height={32}
                        unoptimized
                        className="size-8 shrink-0 rounded-full border border-white/10 object-cover"
                    />
                ) : (
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-zinc-800 text-xs font-medium text-zinc-300">
                        {user?.name.charAt(0).toUpperCase() || 'U'}
                    </span>
                )}
                <div className="min-w-0">
                    <p className="truncate text-md font-medium">
                        {isPending ? 'Loading…' : user?.name || 'Guest'}
                    </p>
                    <p className="mt-0.5 truncate text-[14px] text-zinc-500">
                        {user ? roleName : 'Not signed in'}
                    </p>
                </div>
            </div>
        </aside>
    );
}
