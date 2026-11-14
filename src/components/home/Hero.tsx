import Image from 'next/image';

const stats = [
     { icon: '▱', value: '50K', label: 'Active Jobs' },
     { icon: '▥', value: '12K', label: 'Companies' },
     { icon: '⌕', value: '2M', label: 'Job Seekers' },
     { icon: '☆', value: '97%', label: 'Satisfaction Rate' },
];

const Hero = () => {
     return (
          <main className="relative flex-1 overflow-hidden bg-[#050507] text-white">
               <section className="relative z-10 mx-auto max-w-6xl px-4 pb-0 pt-12 text-center sm:px-6 sm:pt-20 lg:pt-24">
                    <div className="mx-auto inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-white/15 bg-[#111114]/90 px-3 py-2 font-mono text-xs tracking-wide text-white/65 shadow-[0_8px_28px_rgba(0,0,0,0.35)] sm:px-4 sm:text-sm lg:text-base">
                         <span aria-hidden="true">✦</span>
                         <strong className="text-white">50,000+</strong>
                         <span>NEW JOBS THIS MONTH</span>
                    </div>

                    <h1 className="mt-6 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                         Find Your Dream Job Today
                    </h1>
                    <p className="mx-auto mt-3 max-w-2xl text-base leading-6 text-white/60 sm:text-base">
                         HireLoop connects top talent with world-class companies. Browse thousands of
                         curated opportunities and land your next role — faster.
                    </p>

                    <div className="mx-auto mt-7 flex max-w-2xl flex-col gap-2 rounded-xl border border-white/15 bg-[#111114]/90 p-2 text-left shadow-lg sm:flex-row sm:items-center">
                         <div className="flex min-w-0 flex-1 items-center gap-2 px-2 py-2 text-base text-white/55">
                              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6">
                                   <circle cx="11" cy="11" r="7" />
                                   <path d="m16 16 4 4" />
                              </svg>
                              Job title, skill or company
                         </div>
                         <div className="hidden h-6 w-px bg-white/15 sm:block" />
                         <div className="flex min-w-0 flex-1 items-center gap-2 px-2 py-2 text-base text-white/55">
                              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6">
                                   <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                                   <circle cx="12" cy="10" r="2.5" />
                              </svg>
                              Location or Remote
                         </div>
                         <span aria-hidden="true" className="flex h-9 w-full shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-[0_0_18px_rgba(99,80,255,0.35)] sm:w-9">
                              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                                   <circle cx="11" cy="11" r="7" />
                                   <path d="m16 16 4 4" />
                              </svg>
                         </span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-white/55 sm:text-base">
                         <span className="mr-1">Trending Position</span>
                         {['Product Designer', 'AI Engineering', 'Dev-ops Engineer'].map((item) => (
                              <span key={item} className="rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-white/80">
                                   {item}
                              </span>
                         ))}
                    </div>
               </section>

               <section aria-label="HireLoop community statistics" className="relative mx-auto mt-6 min-h-116.25 max-w-6xl px-4 pt-28 pb-8 sm:px-6 sm:pt-48 sm:pb-10">
                    <Image
                         src="/images/globe.png"
                         alt=""
                         width={1440}
                         height={1882}
                         priority
                         className="pointer-events-none absolute left-1/2 -top-136 z-0 h-auto w-[min(1040px,145vw)] max-w-none -translate-x-1/2 opacity-90 sm:-top-148 sm:w-275"
                    />
                    <p className="relative z-10 mx-auto max-w-2xl text-xl font-medium leading-8 tracking-tight text-indigo-50/90 sm:text-2xl sm:leading-9">
                         Assisting over 15,000 job seekers
                         <br />
                         find their dream positions.
                    </p>

                    <div className="relative z-10 mx-auto mt-7 grid max-w-5xl grid-cols-2 gap-3 sm:mt-8 sm:gap-4 md:grid-cols-4">
                         {stats.map((stat) => (
                              <div key={stat.label} className="min-h-32 min-w-0 rounded-xl border border-white/10 bg-[#08080a]/95 p-4 text-left shadow-[0_14px_45px_rgba(0,0,0,0.35)] sm:min-h-36 sm:p-5">
                                   <span aria-hidden="true" className="text-base text-white/90">{stat.icon}</span>
                                   <p className="mt-5 text-3xl font-semibold tracking-tight sm:mt-6 sm:text-4xl">{stat.value}</p>
                                   <p className="mt-1 text-sm text-white/75 lg:text-base">{stat.label}</p>
                              </div>
                         ))}
                    </div>
               </section>
          </main>
     );
};

export default Hero;
