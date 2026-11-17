'use client';

import { getBrowseJobsHref } from '@/lib/jobs';
import type { BrowseJobsFilters, JobFiltersProps, JobSortProps } from '@/types/jobs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { FiCheck, FiChevronDown } from 'react-icons/fi';

function useFilterNavigation(filters: BrowseJobsFilters) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const navigate = (changes: Partial<BrowseJobsFilters>) => {
        startTransition(() => {
            router.push(getBrowseJobsHref(filters, { ...changes, page: 1 }), { scroll: false });
        });
    };
    return { isPending, navigate };
}

export function JobFilters({ filters, jobTypes, categories }: JobFiltersProps) {
    const { isPending, navigate } = useFilterNavigation(filters);
    const hasFilters = filters.search || filters.jobType || filters.isRemote || filters.category;
    const selectClass =
        'mt-3 w-full cursor-pointer rounded-md border border-[#333338] bg-[#1a1a1e] p-2.5 text-xs text-[#c3c3cc] outline-none focus-visible:border-white lg:text-sm';

    return (
        <aside
            aria-labelledby="filters-heading"
            aria-busy={isPending}
            className="rounded-[10px] border border-[#29292e] bg-[#131316] p-4 sm:p-3.5 lg:p-5"
        >
            <div className="flex items-center justify-between gap-2">
                <h2
                    id="filters-heading"
                    className="text-base font-medium tracking-[-0.3px] sm:text-sm lg:text-xl"
                >
                    Filters
                </h2>
                {hasFilters && (
                    <Link
                        href="/browse-jobs"
                        className="text-[10px] text-[#a99cff] hover:text-white lg:text-xs"
                    >
                        Clear all
                    </Link>
                )}
            </div>
            <fieldset disabled={isPending} className="mt-5 disabled:opacity-60 lg:mt-6">
                <legend className="text-xs font-medium sm:text-[10px] lg:text-sm">Job Type</legend>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 md:flex-col lg:gap-3">
                    {jobTypes.map(({ label, value, count }) => (
                        <label
                            key={value}
                            className="flex cursor-pointer items-center gap-2 text-xs text-[#c3c3cc] sm:text-[10px] lg:gap-2.5 lg:text-xs"
                        >
                            <span className="relative flex size-3.5 shrink-0 items-center justify-center lg:size-4">
                                <input
                                    type="checkbox"
                                    name="jobType"
                                    value={value}
                                    checked={filters.jobType === value}
                                    onChange={(event) =>
                                        navigate({ jobType: event.target.checked ? value : '' })
                                    }
                                    className="peer size-full cursor-pointer appearance-none rounded-[3px] border border-[#34343a] bg-[#1b1b20] checked:border-white checked:bg-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
                                />
                                <FiCheck
                                    aria-hidden="true"
                                    className="pointer-events-none absolute size-2.5 stroke-3 text-[#121215] opacity-0 peer-checked:opacity-100 lg:size-3"
                                />
                            </span>
                            <span>{label}</span>
                            <span className="ml-auto pl-2 text-[10px] text-[#858590] lg:text-xs">
                                {count}
                            </span>
                        </label>
                    ))}
                </div>
            </fieldset>
            <fieldset
                disabled={isPending}
                className="mt-6 border-t border-[#29292e] pt-5 disabled:opacity-60"
            >
                <legend className="sr-only">Work location and category</legend>
                <label
                    htmlFor="remote-filter"
                    className="block text-xs font-medium sm:text-[10px] lg:text-sm"
                >
                    Work Location
                </label>
                <select
                    id="remote-filter"
                    value={filters.isRemote}
                    onChange={(event) =>
                        navigate({ isRemote: event.target.value as BrowseJobsFilters['isRemote'] })
                    }
                    className={selectClass}
                >
                    <option value="">All locations</option>
                    <option value="true">Remote</option>
                    <option value="false">On-site</option>
                </select>
                <label
                    htmlFor="category-filter"
                    className="mt-5 block text-xs font-medium sm:text-[10px] lg:text-sm"
                >
                    Category
                </label>
                <select
                    id="category-filter"
                    value={filters.category}
                    onChange={(event) => navigate({ category: event.target.value })}
                    className={selectClass}
                >
                    <option value="">All categories</option>
                    {filters.category &&
                        !categories.some(({ value }) => value === filters.category) && (
                            <option value={filters.category}>{filters.category}</option>
                        )}
                    {categories.map(({ value, label, count }) => (
                        <option key={value} value={value}>
                            {label} ({count})
                        </option>
                    ))}
                </select>
            </fieldset>
            <p role="status" className="sr-only">
                {isPending ? 'Updating jobs…' : ''}
            </p>
        </aside>
    );
}

export function JobSort({ filters }: JobSortProps) {
    const { isPending, navigate } = useFilterNavigation(filters);

    return (
        <div className="flex items-center gap-2 text-[10px] lg:gap-3 lg:text-xs">
            <label htmlFor="job-sort" className="text-[#858590]">
                Sort by:
            </label>
            <div className="relative">
                <select
                    id="job-sort"
                    value={filters.sort}
                    disabled={isPending}
                    aria-busy={isPending}
                    onChange={(event) =>
                        navigate({ sort: event.target.value as BrowseJobsFilters['sort'] })
                    }
                    className="cursor-pointer appearance-none rounded-md border border-[#29292e] bg-[#0c0c0f] py-1.5 pr-7 pl-2.5 text-white outline-none focus-visible:border-[#a1a1ac] disabled:opacity-60 sm:text-[9px] lg:py-2 lg:pr-9 lg:pl-3 lg:text-xs"
                >
                    <option value="recent">Most Recent</option>
                    <option value="salary">Highest Salary</option>
                    <option value="deadline">Application Deadline</option>
                </select>
                <FiChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-2 size-3 -translate-y-1/2 text-[#b5b5be] lg:right-3"
                />
            </div>
        </div>
    );
}
