import JobCard from '@/components/jobs/JobCard';
import JobFilters from '@/components/jobs/JobFilters';
import { getJobPostList } from '@/lib/api/jobs';
import type { BrowseJobsPageProps } from '@/types/jobs';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';

export const metadata = {
    title: 'Browse Jobs | HireLoop',
    description: 'Find your next role by job title, type, category, and work location.',
};

export default async function BrowseJobs({ searchParams }: BrowseJobsPageProps) {
    const params = await searchParams;

    // Read the search and filter values from the URL.
    const search = typeof params.search === 'string' ? params.search : '';
    const jobType = typeof params.jobType === 'string' ? params.jobType : '';
    const isRemote = params.isRemote === 'true' || params.isRemote === 'false' ? params.isRemote : '';
    const category = typeof params.category === 'string' ? params.category : '';
    const sort = params.sort === 'salary' || params.sort === 'deadline' ? params.sort : 'recent';

    const query = new URLSearchParams();
    if (search) query.set('search', search);
    if (jobType) query.set('jobType', jobType);
    if (isRemote) query.set('isRemote', isRemote);
    if (category) query.set('category', category);

    const allJobs = await getJobPostList();
    const jobs = query.size ? await getJobPostList(query.toString()) : allJobs;

    const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'].map((type) => ({
        label: type,
        value: type,
        count: allJobs.filter((job) => job.jobType === type).length,
    }));
    const categories = [...new Set(allJobs.map((job) => job.category).filter(Boolean))];

    // Sort all matching jobs.
    const salaryMultiplier: Record<string, number> = { hourly: 2080, monthly: 12, yearly: 1 };
    const sortedJobs = [...jobs].sort((a, b) => {
        if (sort === 'salary') {
            const salaryA = Number(a.maxSalary || a.minSalary || 0) * (salaryMultiplier[a.salaryFrequency] || 1);
            const salaryB = Number(b.maxSalary || b.minSalary || 0) * (salaryMultiplier[b.salaryFrequency] || 1);
            return salaryB - salaryA;
        }
        if (sort === 'deadline') {
            const dateA = new Date(a.deadline).getTime() || Infinity;
            const dateB = new Date(b.deadline).getTime() || Infinity;
            return dateA - dateB;
        }
        return (new Date(b.createdAt || '').getTime() || 0) - (new Date(a.createdAt || '').getTime() || 0);
    });

    return (
        <main className="flex-1 bg-[#09090b] pb-8 text-white font-[Arial,Helvetica,sans-serif]">
            <div className="mx-auto w-[calc(100%-2rem)] max-w-6xl pt-5 sm:w-[90%] lg:pt-7">
                <form action="/browse-jobs" method="get" className="flex flex-col gap-3 rounded-[10px] border border-[#29292e] bg-[#131316] p-3.5 sm:flex-row lg:p-5">
                    <input type="hidden" name="jobType" value={jobType} />
                    <input type="hidden" name="isRemote" value={isRemote} />
                    <input type="hidden" name="category" value={category} />
                    <input type="hidden" name="sort" value={sort} />
                    <div className="relative flex min-w-0 flex-1 items-center">
                        <FiSearch aria-hidden="true" className="absolute left-3 size-4 text-[#b5b5be]" />
                        <label htmlFor="job-search" className="sr-only">Search jobs</label>
                        <input key={search} id="job-search" name="search" type="search" defaultValue={search} placeholder="Search by job title, keywords..." className="h-11 w-full rounded-md border border-[#303035] bg-[#1a1a1e] pr-3 pl-9 text-xs text-white placeholder:text-[#a1a1ac]" />
                    </div>
                    <button type="submit" className="h-11 cursor-pointer rounded-md bg-white px-5 text-xs font-medium text-black hover:bg-[#e3e3e8]">Search Jobs</button>
                </form>

                <div className="mt-5 grid items-start gap-5 md:grid-cols-[minmax(0,0.31fr)_minmax(0,1fr)] lg:gap-7">
                    <JobFilters jobType={jobType} isRemote={isRemote} category={category} jobTypes={jobTypes} categories={categories} />

                    <section className="min-w-0" aria-labelledby="results-heading">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <h1 id="results-heading" className="text-base font-medium lg:text-xl">
                                Found {jobs.length} Professional {jobs.length === 1 ? 'Job' : 'Jobs'}
                            </h1>
                            <form action="/browse-jobs" method="get" className="flex items-center gap-2 text-xs">
                                <input type="hidden" name="search" value={search} />
                                <input type="hidden" name="jobType" value={jobType} />
                                <input type="hidden" name="isRemote" value={isRemote} />
                                <input type="hidden" name="category" value={category} />
                                <label htmlFor="job-sort" className="text-[#858590]">Sort by:</label>
                                <select key={sort} id="job-sort" name="sort" defaultValue={sort} className="rounded-md border border-[#29292e] bg-[#131316] p-2 text-xs">
                                    <option value="recent">Most Recent</option>
                                    <option value="salary">Highest Salary</option>
                                    <option value="deadline">Application Deadline</option>
                                </select>
                                <button type="submit" className="cursor-pointer rounded-md border border-[#333338] px-3 py-2 hover:bg-white/5">Sort</button>
                            </form>
                        </div>

                        {sortedJobs.length ? (
                            <div className="space-y-3">
                                {sortedJobs.map((job) => <JobCard key={job._id} job={job} />)}
                            </div>
                        ) : (
                            <div className="rounded-[10px] border border-[#29292e] bg-[#131316] p-10 text-center">
                                <h2 className="text-lg font-medium">No jobs found</h2>
                                <p className="mt-2 text-sm text-[#94949f]">Try a different search or clear your filters.</p>
                                <Link href="/browse-jobs" className="mt-4 inline-block text-sm text-[#a99cff]">View all jobs</Link>
                            </div>
                        )}

                    </section>
                </div>
            </div>
        </main>
    );
}
