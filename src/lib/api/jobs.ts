import type { IjobPost } from '@/types/jobs';

//job post list api call
export const getJobPostList = async (query: string = ''): Promise<IjobPost[]> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) throw new Error('The jobs API URL is not configured.');

    const res = await fetch(`${baseUrl.replace(/\/$/, '')}/jobs${query ? `?${query}` : ''}`, {
        cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Unable to fetch jobs (${res.status}).`);

    return res.json();
};

// Single Job Details API Call
export const getJobPostById = async (id: string): Promise<IjobPost | null> => {
    if (!/^[a-f0-9]{24}$/i.test(id)) return null;

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) throw new Error('The jobs API URL is not configured.');

    const res = await fetch(`${baseUrl.replace(/\/$/, '')}/jobs/${encodeURIComponent(id)}`, {
        cache: 'no-store',
    });
    if (res.status === 404 || res.status === 204) return null;
    if (!res.ok) throw new Error(`Unable to fetch job (${res.status}).`);

    const body = await res.text();
    if (!body.trim()) return null;

    return JSON.parse(body);
};
