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
    FiPlusCircle,
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
        { id: 'jobs', name: 'Jobs', icon: FiBriefcase, url: '/dashboard/seeker/jobs' },
        {
            id: 'saved-jobs',
            name: 'Saved Jobs',
            icon: FiBookmark,
            url: '/dashboard/seeker/saved-jobs',
        },
        {
            id: 'applications',
            name: 'Applications',
            icon: FiFileText,
            url: '/dashboard/seeker/applications',
        },
        { id: 'billing', name: 'Billing', icon: FiDollarSign, url: '/dashboard/seeker/billing' },
        { id: 'settings', name: 'Settings', icon: FiSettings, url: '/dashboard/seeker/settings' },
    ],
    recruiter: [
        { id: 'dashboard', name: 'Dashboard', icon: FiGrid, url: '/dashboard/recruiter' },
        {
            id: 'manage-jobs',
            name: 'Manage Jobs',
            icon: FiBriefcase,
            url: '/dashboard/recruiter/manage-jobs',
        },
        { id: 'add-job', name: 'Add Job', icon: FiPlusCircle, url: '/dashboard/recruiter/add-job' },
        {
            id: 'applications',
            name: 'Applications',
            icon: FiFileText,
            url: '/dashboard/recruiter/applications',
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
        <aside className="flex w-full min-w-0 shrink-0 flex-col border-b border-white/5 bg-[#09090b] text-white lg:sticky lg:top-0 lg:h-dvh lg:w-60 lg:overflow-y-auto lg:border-r lg:border-b-0 xl:w-70">
            <div className="shrink-0 px-4 pt-4 pb-3 sm:px-6 lg:px-5 lg:pt-6 lg:pb-4">
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

            <nav aria-label="Dashboard navigation" className="flex min-w-0 flex-wrap gap-1 px-3 sm:px-5 lg:block lg:flex-1 lg:space-y-0.5 lg:px-2.5">
                {menus.map(({ id, name, icon: Icon, url }) => {
                    const isActive =
                        pathname === url || (id === 'dashboard' && pathname === '/dashboard');

                    return (
                        <Link
                            key={id}
                            href={url}
                            prefetch={false}
                            aria-current={isActive ? 'page' : undefined}
                            className={`relative flex min-h-10 items-center gap-2 rounded-md px-2 text-sm lg:min-h-8 lg:text-base focus-visible:outline-2 focus-visible:outline-violet-400 ${isActive ? 'border border-white/5 bg-[#232327] font-medium text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
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

            <div className="mx-4 mt-3 mb-4 flex min-w-0 shrink-0 items-center gap-2.5 rounded-lg border border-white/10 bg-[#141416] p-2.5 sm:mx-6 lg:mx-2.5 lg:mt-6 lg:mb-3">
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
                <div className="min-w-0 flex-1">
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
