export default function BrowseJobsLoading() {
    return (
        <main
            aria-busy="true"
            aria-label="Loading jobs"
            className="flex-1 bg-[#09090b] pb-10 text-white"
        >
            <div className="mx-auto w-[calc(100%-2rem)] max-w-6xl pt-5 sm:w-[90%] lg:pt-7">
                <p role="status" className="sr-only">
                    Loading jobs…
                </p>
                <div aria-hidden="true" className="motion-safe:animate-pulse">
                    <div className="h-20 rounded-[10px] border border-[#29292e] bg-[#131316]" />
                    <div className="mt-5 grid items-start gap-5 md:grid-cols-[minmax(0,0.31fr)_minmax(0,1fr)] lg:gap-7">
                        <div className="h-60 rounded-[10px] border border-[#29292e] bg-[#131316]" />
                        <div className="space-y-3">
                            <div className="mb-5 h-6 w-2/3 rounded bg-[#1a1a1e]" />
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="h-36 rounded-[10px] border border-[#29292e] bg-[#131316]"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
