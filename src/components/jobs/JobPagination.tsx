import { getBrowseJobsHref, getPaginationPages } from '@/lib/jobs';
import type { JobPaginationProps } from '@/types/jobs';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const controlClass = 'flex size-8 items-center justify-center rounded-md border border-[#29292e] transition hover:border-[#66666f] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white';

export default function JobPagination({ filters, totalPages }: JobPaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <nav aria-label="Job results pagination" className="mt-7 flex flex-wrap items-center justify-center gap-1.5 text-xs text-[#a1a1ac] lg:mt-9 lg:gap-2">
            {filters.page > 1 ? (
                <Link href={getBrowseJobsHref(filters, { page: filters.page - 1 })} aria-label="Previous page" className={controlClass}>
                    <FiChevronLeft aria-hidden="true" className="size-4" />
                </Link>
            ) : (
                <span aria-label="Previous page" aria-disabled="true" className={`${controlClass} opacity-40`}>
                    <FiChevronLeft aria-hidden="true" className="size-4" />
                </span>
            )}
            {getPaginationPages(filters.page, totalPages).map((page, index) => (
                page === 'ellipsis' ? (
                    <span key={`ellipsis-${index}`} aria-hidden="true" className="px-1.5">…</span>
                ) : (
                    <Link
                        key={page}
                        href={getBrowseJobsHref(filters, { page })}
                        aria-label={`Page ${page}`}
                        aria-current={page === filters.page ? 'page' : undefined}
                        className={`${controlClass} ${page === filters.page ? 'border-white bg-white font-medium text-black hover:text-black' : ''}`}
                    >
                        {page}
                    </Link>
                )
            ))}
            {filters.page < totalPages ? (
                <Link href={getBrowseJobsHref(filters, { page: filters.page + 1 })} aria-label="Next page" className={controlClass}>
                    <FiChevronRight aria-hidden="true" className="size-4" />
                </Link>
            ) : (
                <span aria-label="Next page" aria-disabled="true" className={`${controlClass} opacity-40`}>
                    <FiChevronRight aria-hidden="true" className="size-4" />
                </span>
            )}
        </nav>
    );
}
