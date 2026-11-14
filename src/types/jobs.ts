export interface IjobPost {
    _id: string;
    title: string;
    company: string;
    category: string;
    jobType: string;
    isRemote: string;
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
