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
    description?: string;
    experience?: string;
    skills?: string[];
    benefits?: string[];
    companySize?: string;
    industry?: string;
    website?: string;
    companyImage?: string;
    isVerifiedEmployer?: boolean;
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

export interface JobDetailsPageProps {
    params: Promise<{ id: string }>;
}

export interface JobCategoryStyle {
    icon: IconType;
    color: string;
}

export type JobFormData = Record<string, FormDataEntryValue | boolean> &
    Pick<IjobPost, 'isRemote'>;

export interface JobFiltersProps {
    jobType: string;
    isRemote: string;
    category: string;
    jobTypes: JobFilterOption[];
    categories: string[];
}

export interface JobFilterOption {
    label: string;
    value: string;
    count: number;
}
