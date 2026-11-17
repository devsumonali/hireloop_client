import { JobFilters, JobSort } from '@/components/jobs/BrowseJobsControls';
import JobCard from '@/components/jobs/JobCard';
import JobPagination from '@/components/jobs/JobPagination';
import { getJobPostList } from '@/lib/api/jobs';
import { getBrowseJobsFilters, getJobFilterOptions, getJobsApiQuery, JOBS_PER_PAGE, sortJobs } from '@/lib/jobs';
import type { BrowseJobsPageProps } from '@/types/jobs';
import type { Metadata } from 'next';
import Form from 'next/form';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';

export const metadata: Metadata = {
    title: 'Browse Jobs | HireLoop',
    description: 'Find your next role. Browse jobs by title, job type, category, and work location.',
};

export default async function BrowseJobs({ searchParams }: BrowseJobsPageProps) {
    const filters = getBrowseJobsFilters(await searchParams);
    const query = getJobsApiQuery(filters);
    const jobsRequest = getJobPostList(query);
    const [jobs, allJobs] = await Promise.all([
        jobsRequest,
        query ? getJobPostList() : jobsRequest,
    ]);
    const options = getJobFilterOptions(allJobs);
    const sortedJobs = sortJobs(jobs, filters.sort);
    const totalPages = Math.max(1, Math.ceil(jobs.length / JOBS_PER_PAGE));
    filters.page = Math.min(filters.page, totalPages);
    const firstResult = (filters.page - 1) * JOBS_PER_PAGE;
    const visibleJobs = sortedJobs.slice(firstResult, firstResult + JOBS_PER_PAGE);

    return (
        <main className="flex-1 bg-[#09090b] pb-6 text-white font-[Arial,Helvetica,sans-serif] lg:pb-10">
            <div className="mx-auto w-[calc(100%-2rem)] max-w-6xl pt-5 sm:w-[90%] lg:pt-7">
                <Form
                    action="/browse-jobs"
                    aria-label="Search jobs"
                    className="flex flex-col gap-3 rounded-[10px] border border-[#29292e] bg-[#131316] p-3.5 sm:flex-row lg:gap-5 lg:p-5"
                >
                    {filters.jobType && <input type="hidden" name="jobType" value={filters.jobType} />}
                    {filters.isRemote && <input type="hidden" name="isRemote" value={filters.isRemote} />}
                    {filters.category && <input type="hidden" name="category" value={filters.category} />}
                    {filters.sort !== 'recent' && <input type="hidden" name="sort" value={filters.sort} />}
                    <div className="relative flex min-w-0 flex-1 items-center">
                        <FiSearch aria-hidden="true" className="pointer-events-none absolute left-3 size-4 stroke-[1.5px] text-[#b5b5be] lg:left-4 lg:size-5" />
                        <label htmlFor="job-search" className="sr-only">Search by job title or keywords</label>
                        <input
                            key={filters.search}
                            id="job-search"
                            name="search"
                            type="search"
                            defaultValue={filters.search}
                            placeholder="Search by job title, keywords..."
                            className="h-11 w-full min-w-0 rounded-md border border-[#303035] bg-[#1a1a1e] pr-3 pl-9 text-xs text-white outline-none placeholder:text-[#a1a1ac] focus-visible:border-[#a1a1ac] sm:h-9 sm:text-[10px] lg:h-12 lg:pl-11 lg:text-sm"
                        />
                    </div>
                    <button type="submit" className="h-11 shrink-0 cursor-pointer rounded-md border border-white bg-white px-5 text-xs font-medium text-black transition hover:bg-[#e3e3e8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-9 sm:text-[10px] lg:h-12 lg:px-6 lg:text-sm">
                        Search Jobs
                    </button>
                </Form>

                <div className="mt-4 grid items-start gap-5 md:grid-cols-[minmax(0,0.31fr)_minmax(0,1fr)] lg:mt-5 lg:gap-7">
                    <JobFilters filters={filters} {...options} />
                    <section aria-labelledby="job-results-heading" className="min-w-0">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-3.5 lg:mb-5">
                            <h1 id="job-results-heading" className="text-base leading-6 font-medium tracking-[-0.3px] sm:text-sm lg:text-xl lg:leading-7">
                                Found {jobs.length.toLocaleString('en-US')} Professional {jobs.length === 1 ? 'Job' : 'Jobs'}
                            </h1>
                            <JobSort filters={filters} />
                        </div>
                        {visibleJobs.length ? (
                            <>
                                <div className="space-y-2 lg:space-y-3">
                                    {visibleJobs.map((job) => <JobCard key={job._id} job={job} />)}
                                </div>
                                <p className="mt-4 text-center text-[10px] text-[#858590] lg:text-xs">
                                    Showing {firstResult + 1}–{firstResult + visibleJobs.length} of {jobs.length} jobs
                                </p>
                                <JobPagination filters={filters} totalPages={totalPages} />
                            </>
                        ) : (
                            <div className="flex min-h-64 flex-col items-center justify-center rounded-[10px] border border-[#29292e] bg-[#131316] px-6 py-12 text-center">
                                <FiSearch aria-hidden="true" className="mb-4 size-7 text-[#858590]" />
                                <h2 className="text-lg font-medium">No jobs found</h2>
                                <p className="mt-2 max-w-sm text-sm leading-6 text-[#94949f]">
                                    Try another keyword or clear your filters to see more opportunities.
                                </p>
                                <Link href="/browse-jobs" className="mt-5 rounded-md border border-[#414148] px-4 py-2 text-sm transition hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white">
                                    View all jobs
                                </Link>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}
