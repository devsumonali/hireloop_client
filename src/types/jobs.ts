import type { IconType } from 'react-icons';
import type { SearchParams } from '@/types/common';

export interface IjobPost {
    _id: string;
    title: string;
    company: string;
    category: string;
    jobType: string;
    isRemote: boolean;
    location: string;
    deadline: string;
    minSalary: string;
    maxSalary: string;
    salaryFrequency: string;
    responsibilities: string;
    requirements: string;
    createdAt?: string;
    status?: 'active' | 'closed';
    applicantsCount?: number;
}

export interface BrowseJobsPageProps {
    searchParams: Promise<SearchParams>;
}

export interface JobProps {
    job: IjobPost;
}

export interface JobCategoryStyle {
    icon: IconType;
    color: string;
}

export type JobFormData = Record<string, FormDataEntryValue | boolean> &
    Pick<IjobPost, 'isRemote'>;

export type JobSort = 'recent' | 'salary' | 'deadline';

export interface BrowseJobsFilters {
    search: string;
    jobType: string;
    isRemote: '' | 'true' | 'false';
    category: string;
    sort: JobSort;
    page: number;
}

export interface JobFiltersProps {
    filters: BrowseJobsFilters;
    jobTypes: JobFilterOption[];
    categories: JobFilterOption[];
}

export interface JobFilterOption {
    label: string;
    value: string;
    count: number;
}

export interface JobSortProps {
    filters: BrowseJobsFilters;
}

export interface JobPaginationProps {
    filters: BrowseJobsFilters;
    totalPages: number;
}

export type SaveJobButtonProps = Pick<IjobPost, '_id' | 'title' | 'company'>;
