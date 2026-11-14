import DeleteBtn from '@/app/(dashboard)/_component/shared/DeleteBtn';
import { getJobPostList } from '@/lib/api/jobs';
import type { IjobPost } from '@/types/jobs';
import { connection } from 'next/server';
import type { IconType } from 'react-icons';
import {
    FiBriefcase,
    FiChevronRight,
    FiCode,
    FiCpu,
    FiEdit2,
    FiGlobe,
    FiMapPin,
    FiMoreVertical,
    FiPenTool,
    FiPlus,
    FiSettings,
    FiUsers,
    FiVolume2,
} from 'react-icons/fi';

const salaryUnits: Record<string, string> = {
    hourly: 'hr',
    monthly: 'mo',
    yearly: 'yr',
};

const categoryStyles: Record<string, { icon: IconType; color: string }> = {
    engineering: { icon: FiCode, color: 'text-violet-400' },
    design: { icon: FiPenTool, color: 'text-orange-400' },
    infrastructure: { icon: FiCpu, color: 'text-cyan-400' },
    marketing: { icon: FiVolume2, color: 'text-violet-200' },
    quality: { icon: FiSettings, color: 'text-indigo-300' },
};

function getPostedTime(createdAt: string | undefined, now: number) {
    const created = createdAt ? new Date(createdAt).getTime() : NaN;
    if (!Number.isFinite(created)) return 'Date unavailable';

    const minutes = Math.max(0, Math.floor((now - created) / 60_000));
    if (minutes < 1) return 'Posted just now';
    if (minutes < 60) return `Posted ${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Posted ${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `Posted ${days}d ago`;
    if (days < 30) return `Posted ${Math.floor(days / 7)}w ago`;
    if (days < 365) return `Posted ${Math.floor(days / 30)}mo ago`;
    return `Posted ${Math.floor(days / 365)}y ago`;
}

const ManageJobPage = async () => {
    // Keep deadlines and posted times current on each page request.
    await connection();
    const jobs: IjobPost[] = await getJobPostList();
    // eslint-disable-next-line react-hooks/purity
    const now = Date.now();
    const today = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Dhaka',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(now);

    return (
        <div className="-m-4 min-h-dvh bg-[#111112] px-4 py-8 text-sm text-zinc-100 sm:-m-6 sm:px-6 sm:py-10 lg:-m-8 lg:px-8 lg:py-12">
            <div className="mx-auto min-w-0 max-w-7xl">
                <header className="mb-7">
                    <p className="mb-3 flex flex-wrap items-center gap-1.5 text-sm text-zinc-400">
                        Manage Jobs
                        <FiChevronRight aria-hidden="true" className="size-4" />
                        <span className="text-violet-200">Job Listings &amp; Postings</span>
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-5">
                        <div className="min-w-0">
                            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Manage Job Posts
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                                Review live listings, monitor applicants, and update job details
                                across your organization.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="inline-flex h-11 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-violet-400/40 bg-[#6251ff] px-4 text-sm font-medium text-white shadow-[0_4px_16px_rgba(98,81,255,0.15)] transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 sm:w-auto"
                        >
                            <FiPlus aria-hidden="true" className="size-5" />
                            New Job Post
                        </button>
                    </div>
                </header>

                <div className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-white/10">
                    <div
                        role="region"
                        aria-label="Job listings"
                        tabIndex={0}
                        className="max-w-full overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-400"
                    >
                        <table className="w-full min-w-310 border-collapse whitespace-nowrap text-left text-sm">
                            <caption className="sr-only">
                                Your job posts, applicants, status, and application deadlines
                            </caption>
                            <thead className="border-b border-white/10 bg-[#0b0b0c]">
                                <tr>
                                    {[
                                        'Job Title & Category',
                                        'Company & Location',
                                        'Type',
                                        'Compensation',
                                        'Applicants',
                                        'Status',
                                        'Deadline',
                                        'Actions',
                                    ].map((heading) => (
                                        <th
                                            key={heading}
                                            scope="col"
                                            className="px-4 py-4 text-sm font-medium tracking-wide text-zinc-400 uppercase last:text-right"
                                        >
                                            {heading}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.07] bg-[#141415]">
                                {jobs.map((job) => {
                                    const categoryStyle = categoryStyles[
                                        job.category.toLowerCase()
                                    ] || {
                                        icon: FiBriefcase,
                                        color: 'text-sky-400',
                                    };
                                    const JobIcon = categoryStyle.icon;
                                    const isRemote =
                                        job.isRemote === 'on' || job.isRemote === 'true';
                                    const LocationIcon = isRemote ? FiGlobe : FiMapPin;
                                    const salaryUnit =
                                        salaryUnits[job.salaryFrequency] || job.salaryFrequency;
                                    const deadline = new Date(job.deadline);
                                    const hasDeadline = Number.isFinite(deadline.getTime());
                                    const isExpired =
                                        hasDeadline && deadline.toISOString().slice(0, 10) < today;
                                    const status =
                                        job.status === 'closed'
                                            ? 'Closed'
                                            : isExpired
                                              ? 'Expired'
                                              : 'Active';
                                    const isActive = status === 'Active';

                                    return (
                                        <tr key={job._id} className="transition hover:bg-white/2">
                                            <th scope="row" className="px-4 py-5 font-normal">
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={`flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/5 bg-[#232326] ${categoryStyle.color}`}
                                                    >
                                                        <JobIcon
                                                            aria-hidden="true"
                                                            className="size-5"
                                                        />
                                                    </span>
                                                    <div>
                                                        <p className="text-sm font-medium text-white">
                                                            {job.title}
                                                        </p>
                                                        <p
                                                            className={`mt-1 text-sm capitalize ${categoryStyle.color}`}
                                                        >
                                                            {job.category.replace(/-/g, ' ')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </th>
                                            <td className="px-4 py-5">
                                                <p className="text-sm text-zinc-100">
                                                    {job.company}
                                                </p>
                                                <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-400">
                                                    <LocationIcon
                                                        aria-hidden="true"
                                                        className="size-4 shrink-0"
                                                    />
                                                    {isRemote && <span>Remote ·</span>}
                                                    {job.location ||
                                                        (isRemote ? 'Worldwide' : 'Not specified')}
                                                </p>
                                            </td>
                                            <td className="px-4 py-5">
                                                <span className="inline-flex rounded-full border border-white/5 bg-[#222223] px-2.5 py-1 text-sm text-zinc-300">
                                                    {job.jobType}
                                                </span>
                                            </td>
                                            <td className="px-4 py-5 text-sm text-zinc-100">
                                                {job.minSalary || job.maxSalary ? (
                                                    <>
                                                        €{job.minSalary || '—'} – €
                                                        {job.maxSalary || '—'}
                                                        {salaryUnit && ` / ${salaryUnit}`}
                                                    </>
                                                ) : (
                                                    'Not specified'
                                                )}
                                            </td>
                                            <td className="px-4 py-5">
                                                <span className="inline-flex items-center gap-1.5 text-sm text-violet-200">
                                                    <FiUsers
                                                        aria-hidden="true"
                                                        className="size-5 shrink-0"
                                                    />
                                                    {job.applicantsCount ?? 0} Candidates
                                                </span>
                                            </td>
                                            <td className="px-4 py-5">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm ${isActive ? 'border-emerald-400/10 bg-emerald-500/10 text-emerald-300' : 'border-white/5 bg-zinc-800/70 text-zinc-400'}`}
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className={`size-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-zinc-500'}`}
                                                    />
                                                    {status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-5">
                                                <p
                                                    className={`text-sm ${isActive ? 'text-zinc-100' : 'text-zinc-400'}`}
                                                >
                                                    {hasDeadline
                                                        ? deadline.toLocaleDateString('en-US', {
                                                              month: 'short',
                                                              day: '2-digit',
                                                              year: 'numeric',
                                                              timeZone: 'UTC',
                                                          })
                                                        : 'No deadline'}
                                                </p>
                                                <p className="mt-1 text-sm text-zinc-500">
                                                    {isActive
                                                        ? getPostedTime(job.createdAt, now)
                                                        : 'Closed'}
                                                </p>
                                            </td>
                                            <td className="px-4 py-5">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        aria-label={`Update ${job.title}`}
                                                        className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-violet-400/15 bg-violet-500/15 px-2.5 text-sm text-violet-200 transition hover:bg-violet-500/25 focus-visible:outline-2 focus-visible:outline-violet-400"
                                                    >
                                                        <FiEdit2
                                                            aria-hidden="true"
                                                            className="size-4"
                                                        />
                                                        Update
                                                    </button>
                                                    <DeleteBtn job={job} />
                                                    <button
                                                        type="button"
                                                        aria-label={`More options for ${job.title}`}
                                                        className="flex h-9 w-6 cursor-pointer items-center justify-center rounded text-zinc-400 transition hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
                                                    >
                                                        <FiMoreVertical
                                                            aria-hidden="true"
                                                            className="size-5"
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {jobs.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="px-4 py-12 text-center text-sm text-zinc-400"
                                        >
                                            No job posts yet. Your posted jobs will appear here.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageJobPage;
