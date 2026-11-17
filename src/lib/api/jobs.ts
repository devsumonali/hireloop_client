import type { IjobPost } from '@/types/jobs';

//job post list api call
export const getJobPostList = async (query: string = ''): Promise<IjobPost[]> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) throw new Error('The jobs API URL is not configured.');

    const res = await fetch(`${baseUrl.replace(/\/$/, '')}/jobs${query ? `?${query}` : ''}`, {
        cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Unable to fetch jobs (${res.status}).`);

    const jobs: unknown = await res.json();
    if (!Array.isArray(jobs)) {
        throw new Error('The jobs API returned an invalid response.');
    }
    return jobs;
};
