import type { SearchParams } from '@/types/common';
import type { BrowseJobsFilters, IjobPost, JobSort } from '@/types/jobs';

export const JOBS_PER_PAGE = 4;

const salaryFrequencyLabels: Record<string, string> = {
    hourly: 'hour',
    monthly: 'month',
    yearly: 'year',
};

export function getJobFilterOptions(jobs: IjobPost[]) {
    const jobTypes = [...new Set([
        'Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance',
        ...jobs.map((job) => job.jobType).filter(Boolean),
    ])].map((value) => ({
        label: value,
        value,
        count: jobs.filter((job) => job.jobType === value).length,
    }));
    const categories = [...new Set(jobs.map((job) => job.category).filter(Boolean))]
        .sort()
        .map((value) => ({
            value,
            label: value.charAt(0).toUpperCase() + value.slice(1).replace(/[-_]/g, ' '),
            count: jobs.filter((job) => job.category === value).length,
        }));
    return { jobTypes, categories };
}

function firstParam(value: SearchParams[string]) {
    return (Array.isArray(value) ? value[0] : value)?.trim() || '';
}

export function getBrowseJobsFilters(params: SearchParams): BrowseJobsFilters {
    const remote = firstParam(params.isRemote);
    const sort = firstParam(params.sort);
    const page = Number(firstParam(params.page));

    return {
        search: firstParam(params.search),
        jobType: firstParam(params.jobType),
        isRemote: remote === 'true' || remote === 'false' ? remote : '',
        category: firstParam(params.category),
        sort: sort === 'salary' || sort === 'deadline' ? sort : 'recent',
        page: Number.isSafeInteger(page) && page > 0 ? page : 1,
    };
}

export function getJobsApiQuery(filters: BrowseJobsFilters) {
    const params = new URLSearchParams();
    for (const key of ['search', 'jobType', 'isRemote', 'category'] as const) {
        if (filters[key]) params.set(key, filters[key]);
    }
    return params.toString();
}

export function getBrowseJobsHref(
    filters: BrowseJobsFilters,
    changes: Partial<BrowseJobsFilters> = {},
) {
    const next = { ...filters, ...changes };
    const params = new URLSearchParams(getJobsApiQuery(next));
    if (next.sort !== 'recent') params.set('sort', next.sort);
    if (next.page > 1) params.set('page', String(next.page));
    const query = params.toString();
    return `/browse-jobs${query ? `?${query}` : ''}`;
}

function getSalary(value: string) {
    if (!value?.trim()) return null;
    const salary = Number(value);
    return Number.isFinite(salary) && salary >= 0 ? salary : null;
}

export function formatJobSalary(job: IjobPost) {
    const minimum = getSalary(job.minSalary);
    const maximum = getSalary(job.maxSalary);
    const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
    const format = (value: number) => `€${formatter.format(value)}`;
    const frequency = salaryFrequencyLabels[job.salaryFrequency];

    if (minimum === null && maximum === null) return 'Salary not specified';
    let salary;
    if (minimum !== null && maximum !== null) {
        salary = minimum === maximum ? format(minimum) : `${format(minimum)} – ${format(maximum)}`;
    } else {
        salary = minimum !== null ? `From ${format(minimum)}` : `Up to ${format(maximum!)}`;
    }
    return frequency ? `${salary} / ${frequency}` : salary;
}

function annualSalary(job: IjobPost) {
    const salary = getSalary(job.maxSalary) ?? getSalary(job.minSalary) ?? -1;
    const multiplier = job.salaryFrequency === 'hourly' ? 2080 : job.salaryFrequency === 'monthly' ? 12 : 1;
    return salary < 0 ? -1 : salary * multiplier;
}

function timestamp(value: string | undefined, fallback: number) {
    const time = value ? new Date(value).getTime() : NaN;
    return Number.isFinite(time) ? time : fallback;
}

export function sortJobs(jobs: IjobPost[], sort: JobSort) {
    return [...jobs].sort((a, b) => {
        if (sort === 'salary') return annualSalary(b) - annualSalary(a);
        if (sort === 'deadline') {
            return timestamp(a.deadline, Infinity) - timestamp(b.deadline, Infinity);
        }
        return timestamp(b.createdAt, 0) - timestamp(a.createdAt, 0);
    });
}

export function getPaginationPages(current: number, total: number) {
    const pages: (number | 'ellipsis')[] = [];
    for (let page = 1; page <= total; page++) {
        if (page === 1 || page === total || Math.abs(page - current) <= 1) {
            if (typeof pages.at(-1) === 'number' && page - (pages.at(-1) as number) > 1) {
                pages.push('ellipsis');
            }
            pages.push(page);
        }
    }
    return pages;
}
