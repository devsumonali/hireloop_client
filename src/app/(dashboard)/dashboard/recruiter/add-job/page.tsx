import AddJobPostForm from '@/app/(dashboard)/_component/AddJobPostForm';
import { FiChevronRight } from 'react-icons/fi';

const AddJobPage = () => {
    return (
        <div className="-m-4 min-h-dvh bg-[#111112] px-4 py-8 text-zinc-100 sm:-m-6 sm:px-6 sm:py-10 lg:-m-8 lg:px-10 lg:py-16">
            <div className="mx-auto min-w-0 max-w-6xl">
                <header className="mb-6 border-b border-white/5 pb-6">
                    <p className="mb-2 flex flex-wrap items-center gap-1 text-sm text-zinc-400">
                        Manage Jobs
                        <FiChevronRight aria-hidden="true" className="size-3" />
                        <span className="text-violet-200">Create New Listing</span>
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-5">
                        <div className="min-w-0">
                            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Post a New Job
                            </h1>
                            <p className="mt-2 text-sm leading-5 text-zinc-400">
                                Fill in the position specifications to attract qualified talent
                                across our network.
                            </p>
                        </div>
                    </div>
                </header>
                <AddJobPostForm />
            </div>
        </div>
    );
};

export default AddJobPage;
