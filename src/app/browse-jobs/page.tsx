import React from 'react';

const BrowseJobs = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const search = await searchParams;
    const urlSearch = new URLSearchParams(search as Record<string, string>);
    console.log('search params', urlSearch);
    return <div>browse jobs page</div>;
};

export default BrowseJobs;
