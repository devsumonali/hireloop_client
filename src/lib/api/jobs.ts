import { IjobPost } from '@/types/jobs';

//job post list api call
export const getJobPostList = async (): Promise<IjobPost[]> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`);
        return res.json();
    } catch (error) {
        console.error('Error fetching job posts:', error);
        return [];
    }
};
