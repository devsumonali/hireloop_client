'use client';

import type { RouteErrorProps } from '@/types/common';
import { FiAlertCircle } from 'react-icons/fi';

export default function BrowseJobsError({ retry }: RouteErrorProps) {
    return (
        <main className="flex flex-1 items-center justify-center bg-[#09090b] px-4 py-20 text-center text-white font-[Arial,Helvetica,sans-serif]">
            <div className="w-full max-w-lg rounded-xl border border-[#29292e] bg-[#131316] px-6 py-12">
                <FiAlertCircle aria-hidden="true" className="mx-auto mb-4 size-8 text-[#94949f]" />
                <h1 className="text-xl font-medium">We couldn’t load the jobs</h1>
                <p className="mt-3 text-sm leading-6 text-[#94949f]">
                    Please try again in a moment.
                </p>
                <button
                    type="button"
                    onClick={() => retry()}
                    className="mt-6 cursor-pointer rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-[#e3e3e8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                    Try again
                </button>
            </div>
        </main>
    );
}
