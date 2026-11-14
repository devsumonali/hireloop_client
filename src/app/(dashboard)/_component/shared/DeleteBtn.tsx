'use client';

import { deleteJob } from '@/lib/actions/jobs';
import { IjobPost } from '@/types/jobs';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiTrash2, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

const DeleteBtn = ({ job }: { job: IjobPost }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const titleId = useId();
    const descriptionId = useId();

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleEscape);
        };
    }, [open]);

    const handleDelete = async () => {
        const res = await deleteJob(job._id);
        if (res.acknowledged && res.deletedCount) {
            router.refresh();
            toast.success(job.title + ' Deleted successfully');
        } else {
            toast.error(job.title + ' Deleted failed');
        }
        setOpen(false);
        console.log(res);
    };

    return (
        <>
            <button
                type="button"
                aria-label="Delete item"
                onClick={() => setOpen(true)}
                className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-white/5 bg-[#222223] text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
                <FiTrash2 aria-hidden="true" className="size-4" />
            </button>

            {open &&
                createPortal(
                    <div
                        className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) {
                                setOpen(false);
                            }
                        }}
                    >
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={titleId}
                            aria-describedby={descriptionId}
                            className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-105 min-w-0 overflow-y-auto rounded-2xl border border-white/10 bg-[#222223] p-5 text-white shadow-2xl sm:p-7"
                        >
                            {/* Close */}
                            <button
                                type="button"
                                aria-label="Close dialog"
                                onClick={() => setOpen(false)}
                                className="absolute right-5 top-5 flex size-8 cursor-pointer items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/5 hover:text-white"
                            >
                                <FiX className="size-5" />
                            </button>

                            {/* Icon */}
                            <div className="mb-5 flex size-12 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-400">
                                <FiTrash2 className="size-5" />
                            </div>

                            {/* Content */}
                            <div className="min-w-0">
                                <h2
                                    id={titleId}
                                    className="mb-2 pr-6 text-lg font-semibold leading-snug tracking-tight text-white"
                                >
                                    Are you sure you want to delete?
                                </h2>

                                <p
                                    id={descriptionId}
                                    className="mb-7 max-w-full text-sm leading-6 wrap-break-word whitespace-normal text-zinc-400"
                                >
                                    This action cannot be undone. Are you sure you want to continue?
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="inline-flex h-10 min-w-22 cursor-pointer items-center justify-center rounded-lg border border-white/15 bg-transparent px-4 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="inline-flex h-10 min-w-22 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700"
                                >
                                    <FiTrash2 className="size-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}
        </>
    );
};

export default DeleteBtn;
