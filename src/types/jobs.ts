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

export type JobCardProps = {
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    logo: IconType;
    logoColor: string;
    badge?: 'Easy Apply' | 'Hot Job';
};

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
