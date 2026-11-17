import JobCard from '@/components/jobs/JobCard';
import type { BrowseJobsPageProps, JobCardProps } from '@/types/jobs';
import {
    FiBox,
    FiCheck,
    FiChevronDown,
    FiChevronLeft,
    FiChevronRight,
    FiCodepen,
    FiCpu,
    FiLayers,
    FiSearch,
} from 'react-icons/fi';

const jobs: JobCardProps[] = [
    {
        title: 'Senior Product Designer',
        company: 'TechFlow Systems',
        location: 'San Francisco, CA (Remote)',
        salary: '$140k - $180k',
        type: 'Full-time',
        logo: FiBox,
        logoColor: 'text-[#527b70]',
        badge: 'Easy Apply',
    },
    {
        title: 'Lead Frontend Engineer',
        company: 'FinGrid Solutions',
        location: 'New York, NY',
        salary: '$165k - $210k',
        type: 'Hybrid',
        logo: FiCodepen,
        logoColor: 'text-[#6a858f]',
    },
    {
        title: 'UX Researcher',
        company: 'CreativeStudio',
        location: 'Austin, TX',
        salary: '$110k - $145k',
        type: 'Contract',
        logo: FiLayers,
        logoColor: 'text-[#738578]',
    },
    {
        title: 'Machine Learning Engineer',
        company: 'HealthAI Corp',
        location: 'Boston, MA (Remote)',
        salary: '$180k - $250k',
        type: 'Senior',
        logo: FiCpu,
        logoColor: 'text-[#268ca3]',
        badge: 'Hot Job',
    },
];

const jobTypes = [
    { label: 'Full-time', count: '1.2k', checked: true },
    { label: 'Contract', count: '432', checked: false },
    { label: 'Freelance', count: '156', checked: false },
];

const BrowseJobs = async ({ searchParams }: BrowseJobsPageProps) => {
    const search = await searchParams;
    const urlSearch = new URLSearchParams(search as Record<string, string>);
    const query = urlSearch.toString();
    console.log(query, 'form serch browse page');

    return (
        <main className="flex-1 bg-[#09090b] pb-6 text-white font-[Arial,Helvetica,sans-serif] lg:pb-10">
            <div className="mx-auto w-[calc(100%-2rem)] max-w-6xl pt-5 sm:w-[90%] lg:pt-7">
                <section
                    aria-label="Search jobs"
                    className="flex flex-col gap-3 rounded-[10px] border border-[#29292e] bg-[#131316] p-3.5 sm:flex-row lg:gap-5 lg:p-5"
                >
                    <div className="relative flex min-w-0 flex-1 items-center">
                        <FiSearch
                            aria-hidden="true"
                            className="pointer-events-none absolute left-3 size-4 stroke-[1.5px] text-[#b5b5be] lg:left-4 lg:size-5"
                        />
                        <label htmlFor="job-search" className="sr-only">
                            Search by job title or keywords
                        </label>
                        <input
                            id="job-search"
                            name="search"
                            type="search"
                            placeholder="Search by job title, keywords..."
                            className="h-11 w-full min-w-0 rounded-md border border-[#303035] bg-[#1a1a1e] pr-3 pl-9 text-xs text-white outline-none placeholder:text-[#a1a1ac] focus-visible:border-[#a1a1ac] sm:h-9 sm:text-[10px] lg:h-12 lg:pl-11 lg:text-sm"
                        />
                    </div>
                    <button
                        type="button"
                        className="h-11 shrink-0 cursor-pointer rounded-md border border-white bg-white px-5 text-xs font-medium text-black transition hover:bg-[#e3e3e8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-9 sm:text-[10px] lg:h-12 lg:px-6 lg:text-sm"
                    >
                        Search Jobs
                    </button>
                </section>

                <div className="mt-4 grid items-start gap-5 md:grid-cols-[minmax(0,0.31fr)_minmax(0,1fr)] lg:mt-5 lg:gap-7">
                    <aside
                        aria-labelledby="filters-heading"
                        className="rounded-[10px] border border-[#29292e] bg-[#131316] p-4 sm:p-3.5 lg:p-5"
                    >
                        <h2
                            id="filters-heading"
                            className="text-base leading-5 font-medium tracking-[-0.3px] sm:text-sm lg:text-xl lg:leading-7"
                        >
                            Filters
                        </h2>
                        <fieldset className="mt-5 lg:mt-6">
                            <legend className="text-xs font-medium sm:text-[10px] lg:text-sm">
                                Job Type
                            </legend>
                            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 md:flex-col md:gap-2 lg:mt-5 lg:gap-3">
                                {jobTypes.map(({ label, count, checked }) => (
                                    <label
                                        key={label}
                                        className="flex cursor-pointer items-center gap-2 text-xs text-[#c3c3cc] sm:text-[9px] lg:gap-2.5 lg:text-xs"
                                    >
                                        <span className="relative flex size-3.5 shrink-0 items-center justify-center lg:size-4">
                                            <input
                                                type="checkbox"
                                                name="jobType"
                                                value={label}
                                                defaultChecked={checked}
                                                className="peer size-full cursor-pointer appearance-none rounded-[3px] border border-[#34343a] bg-[#1b1b20] checked:border-white checked:bg-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
                                            />
                                            <FiCheck
                                                aria-hidden="true"
                                                className="pointer-events-none absolute size-2.5 stroke-3 text-[#121215] opacity-0 peer-checked:opacity-100 lg:size-3"
                                            />
                                        </span>
                                        <span>{label}</span>
                                        <span className="ml-auto pl-5 text-[10px] text-[#858590] sm:text-[8px] lg:text-xs">
                                            {count}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                    </aside>

                    <section aria-labelledby="job-results-heading" className="min-w-0">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-3.5 lg:mb-5">
                            <h1
                                id="job-results-heading"
                                className="text-base leading-6 font-medium tracking-[-0.3px] sm:text-sm lg:text-xl lg:leading-7"
                            >
                                Found 1,248 Professional Jobs
                            </h1>
                            <div className="flex items-center gap-2 text-[10px] lg:gap-3 lg:text-xs">
                                <label htmlFor="job-sort" className="text-[#858590]">
                                    Sort by:
                                </label>
                                <div className="relative">
                                    <select
                                        id="job-sort"
                                        name="sort"
                                        defaultValue="recent"
                                        className="cursor-pointer appearance-none rounded-md border border-[#29292e] bg-[#0c0c0f] py-1.5 pr-7 pl-2.5 text-white outline-none focus-visible:border-[#a1a1ac] sm:text-[9px] lg:py-2 lg:pr-9 lg:pl-3 lg:text-xs"
                                    >
                                        <option value="recent">Most Recent</option>
                                        <option value="salary">Highest Salary</option>
                                        <option value="relevant">Most Relevant</option>
                                    </select>
                                    <FiChevronDown
                                        aria-hidden="true"
                                        className="pointer-events-none absolute top-1/2 right-2 size-3 -translate-y-1/2 text-[#b5b5be] lg:right-3"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 lg:space-y-3">
                            {jobs.map((job) => (
                                <JobCard key={job.title} {...job} />
                            ))}
                        </div>

                        <nav
                            aria-label="Job results pagination"
                            className="mt-7 flex items-center justify-center gap-1.5 text-[10px] text-[#a1a1ac] lg:mt-9 lg:gap-2 lg:text-xs"
                        >
                            <button
                                type="button"
                                aria-label="Previous page"
                                disabled
                                className="flex size-7 items-center justify-center rounded-md border border-[#29292e] disabled:cursor-default disabled:text-[#66666f] sm:size-5 lg:size-8"
                            >
                                <FiChevronLeft aria-hidden="true" className="size-3.5 lg:size-4" />
                            </button>
                            {[1, 2, 3].map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    aria-label={`Page ${page}`}
                                    aria-current={page === 1 ? 'page' : undefined}
                                    className={`flex size-7 cursor-pointer items-center justify-center rounded-md border transition focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white sm:size-5 lg:size-8 ${
                                        page === 1
                                            ? 'border-white bg-white font-medium text-black'
                                            : 'border-[#29292e] hover:border-[#66666f] hover:text-white'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <span aria-hidden="true" className="px-1.5">
                                ...
                            </span>
                            <button
                                type="button"
                                aria-label="Page 42"
                                className="flex size-7 cursor-pointer items-center justify-center rounded-md border border-[#29292e] transition hover:border-[#66666f] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white sm:size-5 lg:size-8"
                            >
                                42
                            </button>
                            <button
                                type="button"
                                aria-label="Next page"
                                className="flex size-7 cursor-pointer items-center justify-center rounded-md border border-[#29292e] transition hover:border-[#66666f] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white sm:size-5 lg:size-8"
                            >
                                <FiChevronRight aria-hidden="true" className="size-3.5 lg:size-4" />
                            </button>
                        </nav>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default BrowseJobs;
