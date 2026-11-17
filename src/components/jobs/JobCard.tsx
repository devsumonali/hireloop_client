import SaveJobButton from '@/components/jobs/SaveJobButton';
import { formatJobSalary } from '@/lib/jobs';
import type { JobCategoryStyle, JobProps } from '@/types/jobs';
import { FiBriefcase, FiClock, FiCode, FiCpu, FiGlobe, FiMapPin, FiPenTool, FiTrendingUp } from 'react-icons/fi';
import { LuBanknote } from 'react-icons/lu';

const categoryStyles: Record<string, JobCategoryStyle> = {
    engineering: { icon: FiCode, color: 'text-[#6aabbc]' },
    design: { icon: FiPenTool, color: 'text-[#97b6a1]' },
    infrastructure: { icon: FiCpu, color: 'text-[#268ca3]' },
    marketing: { icon: FiTrendingUp, color: 'text-[#af99d0]' },
    business: { icon: FiBriefcase, color: 'text-[#c5aa7b]' },
    finance: { icon: LuBanknote, color: 'text-[#72b593]' },
};

export default function JobCard({ job }: JobProps) {
    const { icon: Logo, color } = categoryStyles[job.category?.toLowerCase()] || {
        icon: FiBriefcase,
        color: 'text-[#6a858f]',
    };
    const isRemote = job.isRemote === true;
    const LocationIcon = isRemote ? FiGlobe : FiMapPin;
    const badgeClass = 'inline-flex items-center gap-1.5 rounded-[5px] border border-[#333338] bg-[#1a1a1e] px-2 py-1 shadow-[0_1px_2px_#0004] lg:px-2.5 lg:py-1.5';

    return (
        <article className="flex min-h-28 items-start gap-3 rounded-[10px] border border-[#29292e] bg-[#131316] p-4 transition-colors hover:border-[#414148] sm:min-h-26 sm:p-3.5 lg:min-h-36 lg:gap-4 lg:p-5">
            <div aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-md border border-[#35353b] bg-[#242429] shadow-[0_1px_2px_#0006] sm:size-9 lg:size-13">
                <div className={`flex size-7 items-center justify-center bg-[radial-gradient(ellipse_at_top,#1d3437,#080b0d_75%)] shadow-[inset_0_0_0_1px_#ffffff05] sm:size-6 lg:size-9 ${color}`}>
                    <Logo className="size-4 stroke-[1.5px] lg:size-5" />
                </div>
            </div>
            <div className="min-w-0 flex-1">
                <h2 className="pr-1 text-[15px] leading-5 font-medium tracking-[-0.3px] wrap-break-word text-[#f5f5f6] sm:text-sm lg:text-xl lg:leading-7">
                    {job.title || 'Untitled position'}
                </h2>
                <p className="mt-1.5 text-xs leading-5 tracking-[0.1px] wrap-break-word text-[#94949f] sm:text-[10px] sm:leading-4 lg:text-sm lg:leading-5">
                    {job.company || 'Company not specified'} <span aria-hidden="true">&bull;</span>{' '}
                    {job.location || (isRemote ? 'Worldwide' : 'Location not specified')}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] leading-none text-[#f1f1f3] sm:mt-3.5 sm:gap-1.5 sm:text-[9px] lg:mt-5 lg:gap-2 lg:text-xs">
                    <span className={badgeClass}>
                        <LuBanknote aria-hidden="true" className="size-3 shrink-0 lg:size-3.5" />
                        <span className="sr-only">Salary: </span>
                        {formatJobSalary(job)}
                    </span>
                    {job.jobType && (
                        <span className={badgeClass}>
                            <FiClock aria-hidden="true" className="size-3 lg:size-3.5" />
                            {job.jobType}
                        </span>
                    )}
                    <span className={`${badgeClass} ${isRemote ? 'border-[#254a36] bg-[#14271d] text-[#4cdd8b]' : ''}`}>
                        <LocationIcon aria-hidden="true" className="size-3 lg:size-3.5" />
                        {isRemote ? 'Remote' : 'On-site'}
                    </span>
                    {job.status === 'closed' && <span className={`${badgeClass} text-[#a1a1ac]`}>Closed</span>}
                </div>
            </div>
            <SaveJobButton _id={job._id} title={job.title} company={job.company} />
        </article>
    );
}
