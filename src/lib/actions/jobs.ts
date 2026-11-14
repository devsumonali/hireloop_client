//new job post api call
export const getJobPost = async (data: Record<string, FormDataEntryValue>) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const deleteJob = async (jobId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs/${jobId}`, {
        method: 'DELETE',
    });
    return res.json();
};
