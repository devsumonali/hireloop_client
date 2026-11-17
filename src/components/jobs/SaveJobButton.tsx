'use client';

import type { SaveJobButtonProps } from '@/types/jobs';
import { useSyncExternalStore } from 'react';
import toast from 'react-hot-toast';
import { FiBookmark } from 'react-icons/fi';

const storageKey = 'hireloop:saved-jobs';
const changeEvent = 'hireloop:saved-jobs-change';

function subscribe(callback: () => void) {
    window.addEventListener('storage', callback);
    window.addEventListener(changeEvent, callback);
    return () => {
        window.removeEventListener('storage', callback);
        window.removeEventListener(changeEvent, callback);
    };
}

function getSnapshot() {
    try {
        return localStorage.getItem(storageKey) || '[]';
    } catch {
        return '[]';
    }
}

function getSavedIds(value: string): string[] {
    try {
        const ids: unknown = JSON.parse(value);
        return Array.isArray(ids) ? ids.filter((id) => typeof id === 'string') : [];
    } catch {
        return [];
    }
}

export default function SaveJobButton({ _id, title, company }: SaveJobButtonProps) {
    const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => '[]');
    const saved = getSavedIds(snapshot).includes(_id);

    const toggleSaved = () => {
        const ids = new Set(getSavedIds(getSnapshot()));
        const wasSaved = ids.has(_id);
        if (wasSaved) ids.delete(_id);
        else ids.add(_id);
        try {
            localStorage.setItem(storageKey, JSON.stringify([...ids]));
            window.dispatchEvent(new Event(changeEvent));
            toast.success(wasSaved ? 'Job removed from saved jobs.' : 'Job saved in this browser.');
        } catch {
            toast.error('Unable to save this job. Check your browser storage settings.');
        }
    };

    return (
        <button
            type="button"
            aria-label={`${saved ? 'Unsave' : 'Save'} ${title} at ${company}`}
            aria-pressed={saved}
            title={saved ? 'Remove saved job' : 'Save job in this browser'}
            onClick={toggleSaved}
            className={`-mt-0.5 -mr-1 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded transition hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${saved ? 'text-[#a99cff]' : 'text-[#b5b5bc]'}`}
        >
            <FiBookmark aria-hidden="true" className={`size-4 stroke-[1.5px] lg:size-4.5 ${saved ? 'fill-current' : ''}`} />
        </button>
    );
}
