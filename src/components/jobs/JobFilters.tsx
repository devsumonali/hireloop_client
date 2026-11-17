'use client';

import type { JobFiltersProps } from '@/types/jobs';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiCheck } from 'react-icons/fi';

export default function JobFilters({
    jobType,
    isRemote,
    category,
    jobTypes,
    categories,
}: JobFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    function updateFilter(name: string, value: string) {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set(name, value);
        else params.delete(name);
        params.delete('page');

        const query = params.toString();
        router.push(query ? `/browse-jobs?${query}` : '/browse-jobs', { scroll: false });
    }

    return (
        <aside className="rounded-[10px] border border-[#29292e] bg-[#131316] p-4 lg:p-5">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-medium lg:text-xl">Filters</h2>
                <Link href="/browse-jobs" className="text-xs text-[#a99cff] hover:text-white">
                    Clear all
                </Link>
            </div>

            <div className="mt-5 space-y-5">
                <fieldset>
                    <legend className="mb-4 text-xs font-medium lg:text-sm">Job Type</legend>
                    <div className="space-y-3">
                        {jobTypes.map(({ label, value, count }) => (
                            <label
                                key={value}
                                className="flex cursor-pointer items-center gap-2 text-xs text-[#c3c3cc]"
                            >
                                <span className="relative flex size-4 shrink-0 items-center justify-center">
                                    <input
                                        type="checkbox"
                                        name="jobType"
                                        value={value}
                                        checked={jobType === value}
                                        onChange={(event) =>
                                            updateFilter('jobType', event.target.checked ? value : '')
                                        }
                                        className="peer size-full cursor-pointer appearance-none rounded-[3px] border border-[#34343a] bg-[#1b1b20] checked:border-white checked:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                    />
                                    <FiCheck
                                        aria-hidden="true"
                                        className="pointer-events-none absolute size-3 text-black opacity-0 peer-checked:opacity-100"
                                    />
                                </span>
                                <span>{label}</span>
                                <span className="ml-auto text-[#858590]">{count}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                <div>
                    <label htmlFor="remote-filter" className="block text-xs font-medium lg:text-sm">
                        Work Location
                    </label>
                    <select
                        id="remote-filter"
                        name="isRemote"
                        value={isRemote}
                        onChange={(event) => updateFilter('isRemote', event.target.value)}
                        className="mt-3 w-full rounded-md border border-[#333338] bg-[#1a1a1e] p-2.5 text-xs"
                    >
                        <option value="">All locations</option>
                        <option value="true">Remote</option>
                        <option value="false">On-site</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="category-filter"
                        className="block text-xs font-medium lg:text-sm"
                    >
                        Category
                    </label>
                    <select
                        id="category-filter"
                        name="category"
                        value={category}
                        onChange={(event) => updateFilter('category', event.target.value)}
                        className="mt-3 w-full rounded-md border border-[#333338] bg-[#1a1a1e] p-2.5 text-xs capitalize"
                    >
                        <option value="">All categories</option>
                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
        </aside>
    );
}
