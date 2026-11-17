import Image from 'next/image';
import {
    FiBarChart2,
    FiBriefcase,
    FiMapPin,
    FiSearch,
    FiStar,
    FiUserCheck,
    FiUsers,
} from 'react-icons/fi';

const stats = [
    { icon: FiUserCheck, value: '50K', label: 'Active Jobs' },
    { icon: FiBarChart2, value: '12K', label: 'Companies' },
    { icon: FiUsers, value: '2M', label: 'Job Seekers' },
    { icon: FiStar, value: '97%', label: 'Satisfaction Rate' },
];

const Hero = () => {
    return (
        <main className="relative isolate flex-1 overflow-hidden bg-black text-white font-[Arial,Helvetica,sans-serif] before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:bg-[radial-gradient(ellipse_100%_540px_at_50%_0,#292929,transparent_85%)] before:content-['']">
            <section className="relative z-1 mx-auto max-w-330 px-4 pt-20 text-center md:px-6 md:pt-28 lg:pt-45">
                <div className="flex items-center justify-center before:hidden before:h-px before:w-16 before:bg-[linear-gradient(90deg,transparent,#fff2)] before:content-[''] after:hidden after:h-px after:w-16 after:rotate-180 after:bg-[linear-gradient(90deg,transparent,#fff2)] after:content-[''] md:before:block md:after:block">
                    <div className="inline-flex min-h-9 max-w-full items-center justify-center gap-2 rounded-full border border-[#ffffff26] bg-[linear-gradient(#1b1b1b,#080808)] px-3 py-2 text-[11px] leading-4.5 tracking-normal text-[#999] shadow-[inset_0_1px_#ffffff0d,0_8px_24px_#0006] font-['Courier_New',monospace] md:min-h-11 md:gap-3 md:px-5.5 md:py-2.5 md:text-lg md:leading-5.5 md:tracking-[0.5px]">
                        <FiBriefcase
                            aria-hidden="true"
                            className="size-4.5 shrink-0 text-[#ffac5c] md:size-5.5"
                        />
                        <strong className="shrink-0 font-bold text-white">50,000+</strong>
                        <span>NEW JOBS THIS MONTH</span>
                    </div>
                </div>

                <h1 className="mt-7 text-[36px] leading-[1.16] font-semibold tracking-[-1.4px] text-balance md:mt-10 md:text-[44px] md:tracking-[-1.6px] lg:text-[56px] lg:tracking-[-2.3px]">
                    Find Your Dream Job Today
                </h1>
                <p className="mx-auto mt-4 max-w-130 text-base leading-6.5 text-pretty text-[#999] md:max-w-175 md:text-lg md:leading-7 lg:max-w-190 lg:text-xl lg:leading-7.5">
                    HireLoop connects top talent with world-class companies. Browse thousands of
                    curated opportunities and land your next role — faster.
                </p>

                <div className="mx-auto mt-8 flex min-h-16 max-w-130 flex-col items-center gap-0 rounded-[14px] border border-[#ffffff30] bg-[#101010] p-2 text-left shadow-[inset_0_1px_#ffffff08,0_8px_24px_#0004] md:mt-12 md:max-w-196 md:flex-row md:gap-4 md:rounded-2xl">
                    <div className="flex min-h-12 w-full min-w-0 flex-1 items-center gap-2.5 px-3 text-sm leading-6 text-[#aaa] md:min-h-auto md:w-auto md:pr-0 md:text-base">
                        <FiSearch
                            aria-hidden="true"
                            className="size-5 shrink-0 stroke-[1.5px] text-[#ddd] md:size-6"
                        />
                        <span>Job title, skill or company</span>
                    </div>
                    <div
                        aria-hidden="true"
                        className="h-px w-[calc(100%-24px)] shrink-0 bg-[#ffffff26] md:h-6 md:w-px"
                    />
                    <div className="flex min-h-12 w-full min-w-0 flex-1 items-center gap-2.5 px-3 text-sm leading-6 text-[#aaa] md:min-h-auto md:w-auto md:pr-0 md:text-base">
                        <FiMapPin
                            aria-hidden="true"
                            className="size-5 shrink-0 stroke-[1.5px] text-[#ddd] md:size-6"
                        />
                        <span>Location or Remote</span>
                    </div>
                    <span
                        aria-hidden="true"
                        className="mt-2 flex h-11 w-full shrink-0 items-center justify-center rounded-[9px] border border-[#b9adff] bg-[linear-gradient(135deg,#8371ff,#5740ff)] shadow-[inset_0_0_10px_#ffffff26,0_0_16px_#6251ff33] md:mt-0 md:size-12 md:rounded-xl"
                    >
                        <FiSearch className="size-6 stroke-[1.5px] md:size-7" />
                    </span>
                </div>

                <div className="mx-auto mt-4.5 flex max-w-130 flex-wrap items-center justify-center gap-1.5 text-xs leading-4.5 text-[#999] md:mx-0 md:mt-6 md:max-w-none md:gap-2 md:text-sm md:leading-5">
                    <span className="mb-0.5 w-full md:mr-2 md:mb-0 md:w-auto">
                        Trending Position
                    </span>
                    {['Product Designer', 'AI Engineering', 'Dev-ops Engineer'].map((item) => (
                        <span
                            key={item}
                            className="rounded-full border border-[#ffffff1a] bg-[#ffffff08] px-2.5 py-1 text-[#ddd] md:px-3"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </section>

            <section
                aria-label="HireLoop community statistics"
                className="relative px-4 pt-45 pb-6 [--globe-width:864px] md:px-6 md:pt-70 md:pb-7 md:[--globe-width:clamp(1100px,100vw,1440px)] lg:pt-92"
            >
                <Image
                    src="/images/globe.png"
                    alt=""
                    width={1440}
                    height={1882}
                    sizes="(max-width: 767px) 864px, (max-width: 1100px) 1100px, (max-width: 1440px) 100vw, 1440px"
                    preload
                    className="pointer-events-none absolute top-[calc(40px-var(--globe-width)*0.5875)] left-1/2 z-0 h-auto w-(--globe-width) max-w-none -translate-x-1/2 [clip-path:polygon(0_43%,12%_36%,32%_29%,50%_27%,68%_29%,88%_36%,100%_43%,100%_100%,0_100%)] mask-[linear-gradient(to_bottom,transparent_26%,#000_43%)] md:top-[calc(140px-var(--globe-width)*0.5875)] lg:top-[calc(184px-var(--globe-width)*0.5875)]"
                />
                <p className="relative z-1 mx-auto max-w-130 text-center text-[clamp(20px,5.6vw,26px)] leading-[1.4] font-normal tracking-[-0.8px] text-[#ddd9ff] md:max-w-196 md:text-[34px] md:leading-11 md:tracking-[-1.2px] lg:text-[40px] lg:leading-12.5">
                    Assisting over{' '}
                    <strong className="font-medium text-white">15,000 job seekers</strong>
                    <br />
                    find their dream positions.
                </p>

                <div className="relative z-1 mx-auto mt-8 grid max-w-130 grid-cols-2 gap-3 md:mt-12 md:max-w-330 md:grid-cols-4 md:gap-4 lg:gap-6">
                    {stats.map(({ icon: Icon, value, label }) => (
                        <div
                            key={label}
                            className="flex min-h-45 min-w-0 flex-col justify-between rounded-xl border border-[#ffffff1a] bg-[linear-gradient(145deg,#020202_25%,#080808_55%,#1a1a1a)] p-4.5 shadow-[0_16px_40px_#0004] md:min-h-53 md:rounded-[14px] md:p-5 lg:min-h-63 lg:p-6"
                        >
                            <Icon
                                aria-hidden="true"
                                className="size-5 shrink-0 stroke-[1.6px] md:size-6"
                            />
                            <div>
                                <p className="text-[40px] leading-[1.2] font-medium tracking-[-2px] md:text-[44px] lg:text-[56px]">
                                    {value}
                                </p>
                                <p className="mt-2 text-[13px] leading-5 text-[#e0e0e0] md:mt-3 md:text-sm md:leading-6 lg:text-base">
                                    {label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Hero;
