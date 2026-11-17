import type { JobCardProps } from '@/types/jobs';
import { FiBookmark, FiClock, FiLayers, FiStar, FiZap } from 'react-icons/fi';
import { LuBanknote, LuFlame } from 'react-icons/lu';

const JobCard = ({
    title,
    company,
    location,
    salary,
    type,
    logo: Logo,
    logoColor,
    badge,
}: JobCardProps) => {
    const TypeIcon = type === 'Hybrid' ? FiLayers : type === 'Senior' ? FiStar : FiClock;

    return (
        <article className="flex min-h-28 items-start gap-3 rounded-[10px] border border-[#29292e] bg-[#131316] p-4 transition-colors hover:border-[#414148] sm:min-h-26 sm:p-3.5 lg:min-h-36 lg:gap-4 lg:p-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-[#35353b] bg-[#242429] shadow-[0_1px_2px_#0006] sm:size-9 lg:size-13">
                <div
                    className={`flex size-7 items-center justify-center bg-[radial-gradient(ellipse_at_top,#1d3437,#080b0d_75%)] shadow-[inset_0_0_0_1px_#ffffff05] sm:size-6 lg:size-9 ${logoColor}`}
                >
                    <Logo aria-hidden="true" className="size-4 stroke-1 lg:size-5" />
                </div>
            </div>

            <div className="min-w-0 flex-1">
                <h2 className="pr-1 text-[15px] leading-5 font-medium tracking-[-0.3px] text-[#f5f5f6] sm:text-sm lg:text-xl lg:leading-7">
                    {title}
                </h2>
                <p className="mt-1.5 text-xs leading-5 tracking-[0.1px] text-[#94949f] sm:text-[10px] sm:leading-4 lg:text-sm lg:leading-5">
                    {company} <span aria-hidden="true">&bull;</span> {location}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] leading-none text-[#f1f1f3] sm:mt-3.5 sm:gap-1.5 sm:text-[8px] lg:mt-5 lg:gap-2 lg:text-xs">
                    <span className="inline-flex items-center gap-1.5 rounded-[5px] border border-[#333338] bg-[#1a1a1e] px-2 py-1 shadow-[0_1px_2px_#0004] lg:px-2.5 lg:py-1.5">
                        <LuBanknote aria-hidden="true" className="size-3 lg:size-3.5" />
                        <span className="sr-only">Salary: </span>
                        {salary}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-[5px] border border-[#333338] bg-[#1a1a1e] px-2 py-1 shadow-[0_1px_2px_#0004] lg:px-2.5 lg:py-1.5">
                        <TypeIcon aria-hidden="true" className="size-3 lg:size-3.5" />
                        {type}
                    </span>
                    {badge && (
                        <span
                            className={`inline-flex items-center gap-1.5 rounded-[5px] border px-2 py-1 shadow-[0_1px_2px_#0004] lg:px-2.5 lg:py-1.5 ${
                                badge === 'Easy Apply'
                                    ? 'border-[#254a36] bg-[#14271d] text-[#4cdd8b]'
                                    : 'border-[#594216] bg-[#30230c] text-[#f1b626]'
                            }`}
                        >
                            {badge === 'Easy Apply' ? (
                                <FiZap aria-hidden="true" className="size-3 lg:size-3.5" />
                            ) : (
                                <LuFlame aria-hidden="true" className="size-3 lg:size-3.5" />
                            )}
                            {badge}
                        </span>
                    )}
                </div>
            </div>

            <button
                type="button"
                aria-label={`Save ${title} at ${company}`}
                className="-mt-0.5 -mr-1 flex size-7 shrink-0 cursor-pointer items-center justify-center rounded text-[#b5b5bc] transition hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:size-8"
            >
                <FiBookmark aria-hidden="true" className="size-3.5 stroke-[1.5px] lg:size-4.5" />
            </button>
        </article>
    );
};

export default JobCard;
