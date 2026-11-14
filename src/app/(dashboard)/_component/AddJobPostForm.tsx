'use client';
import { getJobPost } from '@/lib/actions/jobs';
import { FiArrowRight, FiChevronDown, FiGlobe, FiMapPin } from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { TbCurrencyEuro } from 'react-icons/tb';
import toast from 'react-hot-toast';

const inputClass =
    'h-11 w-full min-w-0 max-w-full rounded-lg border border-white/5 bg-[#202023] px-3 text-base text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10 sm:text-sm';
const labelClass = 'mb-2 block text-sm font-medium text-zinc-200';
const sectionClass = 'min-w-0 rounded-xl border border-white/[0.025] bg-[#151516] p-4 sm:p-6';

const AddJobPostForm = () => {
    const handleSubmitFrom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        //job post api call
        try {
            const result = await getJobPost(data);

            if (result.acknowledged && result.insertedId) {
                form.reset();
                toast.success('Job posted successfully!');
            } else {
                toast.error('Job post failed. Please try again.');
            }
        } catch {
            toast.error('Something went wrong. Please try again.');
        }
    };
    return (
        <>
            <form onSubmit={handleSubmitFrom} className="min-w-0 space-y-5">
                <section aria-labelledby="basic-information" className={sectionClass}>
                    <h2
                        id="basic-information"
                        className="mb-5 flex items-center gap-2 text-sm font-medium"
                    >
                        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-violet-500" />
                        1. Basic Information
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="job-title" className={labelClass}>
                                Job Title <span className="text-violet-400">*</span>
                            </label>
                            <input
                                id="job-title"
                                name="title"
                                type="text"
                                placeholder="Frontend Developer"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label htmlFor="company-name" className={labelClass}>
                                    Company Name <span className="text-violet-400">*</span>
                                </label>
                                <div className="relative">
                                    <HiOutlineOfficeBuilding
                                        aria-hidden="true"
                                        className="pointer-events-none absolute top-3 left-3 size-5 text-zinc-400"
                                    />
                                    <input
                                        id="company-name"
                                        name="company"
                                        type="text"
                                        placeholder="HirePulse Network"
                                        required
                                        className={`${inputClass} pl-10`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="job-category" className={labelClass}>
                                    Job Category <span className="text-violet-400">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        id="job-category"
                                        name="category"
                                        defaultValue="engineering"
                                        required
                                        className={`${inputClass} appearance-none pr-10`}
                                    >
                                        <option value="engineering">Engineering &amp; Tech</option>
                                        <option value="design">Design &amp; Creative</option>
                                        <option value="marketing">Marketing &amp; Sales</option>
                                        <option value="business">Business &amp; Operations</option>
                                        <option value="finance">Finance &amp; Accounting</option>
                                    </select>
                                    <FiChevronDown
                                        aria-hidden="true"
                                        className="pointer-events-none absolute top-3.5 right-3 size-4 text-zinc-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <fieldset className="min-w-0">
                            <legend className={labelClass}>
                                Job Type <span className="text-violet-400">*</span>
                            </legend>
                            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                                {['Full-time', 'Part-time', 'Contract', 'Internship'].map(
                                    (type) => (
                                        <label key={type} className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name="jobType"
                                                value={type}
                                                defaultChecked={type === 'Full-time'}
                                                className="peer sr-only"
                                            />
                                            <span className="flex h-11 items-center justify-center rounded-lg border border-white/5 bg-[#202023] text-sm text-zinc-400 transition peer-checked:border-violet-400/70 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-violet-400/50 hover:border-white/15">
                                                {type}
                                            </span>
                                        </label>
                                    ),
                                )}
                            </div>
                        </fieldset>
                    </div>
                </section>

                <section aria-labelledby="location-compensation" className={sectionClass}>
                    <h2
                        id="location-compensation"
                        className="mb-5 flex items-center gap-2 text-sm font-medium"
                    >
                        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-violet-500" />
                        2. Location, Compensation &amp; Timeline
                    </h2>

                    <div className="space-y-4">
                        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/5 bg-[#202023] px-4 py-3">
                            <FiGlobe
                                aria-hidden="true"
                                className="size-5 shrink-0 text-violet-200"
                            />
                            <span className="min-w-0 flex-1">
                                <span className="block text-sm font-medium text-zinc-100">
                                    Remote Work Allowed
                                </span>
                                <span className="mt-1 block text-sm leading-5 text-zinc-400">
                                    Enable worldwide or distributed candidate applications
                                </span>
                            </span>
                            <input
                                type="checkbox"
                                role="switch"
                                name="isRemote"
                                aria-label="Allow remote work"
                                defaultChecked
                                className="peer sr-only"
                            />
                            <span
                                aria-hidden="true"
                                className="relative h-5 w-9 shrink-0 rounded-full bg-zinc-700 transition after:absolute after:top-0.5 after:left-0.5 after:size-4 after:rounded-full after:bg-white after:transition-transform peer-checked:bg-violet-600 peer-checked:after:translate-x-4 peer-focus-visible:ring-2 peer-focus-visible:ring-violet-400 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#202023]"
                            />
                        </label>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="job-location"
                                    className={`${labelClass} flex justify-between gap-2`}
                                >
                                    <span>Job Location</span>
                                    <span className="text-sm font-normal text-zinc-500">
                                        Required
                                    </span>
                                </label>
                                <div className="relative">
                                    <FiMapPin
                                        aria-hidden="true"
                                        className="pointer-events-none absolute top-3 left-3 size-5 text-zinc-400"
                                    />
                                    <input
                                        id="job-location"
                                        name="location"
                                        type="text"
                                        placeholder="New York, USA"
                                        required
                                        className={`${inputClass} pl-10`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="application-deadline" className={labelClass}>
                                    Application Deadline
                                </label>
                                <input
                                    id="application-deadline"
                                    name="deadline"
                                    type="date"
                                    className={`${inputClass} scheme-dark`}
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <div>
                                <label htmlFor="min-salary" className={labelClass}>
                                    Min Salary / Rate
                                </label>
                                <div className="relative">
                                    <TbCurrencyEuro
                                        aria-hidden="true"
                                        className="pointer-events-none absolute top-3 left-3 size-5 text-zinc-400"
                                    />
                                    <input
                                        id="min-salary"
                                        name="minSalary"
                                        type="number"
                                        placeholder="25"
                                        min="0"
                                        className={`${inputClass} pl-9`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="max-salary" className={labelClass}>
                                    Max Salary / Rate
                                </label>
                                <div className="relative">
                                    <TbCurrencyEuro
                                        aria-hidden="true"
                                        className="pointer-events-none absolute top-3 left-3 size-5 text-zinc-400"
                                    />
                                    <input
                                        id="max-salary"
                                        name="maxSalary"
                                        type="number"
                                        placeholder="40"
                                        min="0"
                                        className={`${inputClass} pl-9`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="salary-frequency" className={labelClass}>
                                    Frequency
                                </label>
                                <div className="relative">
                                    <select
                                        id="salary-frequency"
                                        name="salaryFrequency"
                                        defaultValue="hourly"
                                        className={`${inputClass} appearance-none pr-10`}
                                    >
                                        <option value="hourly">per hour</option>
                                        <option value="monthly">per month</option>
                                        <option value="yearly">per year</option>
                                    </select>
                                    <FiChevronDown
                                        aria-hidden="true"
                                        className="pointer-events-none absolute top-3.5 right-3 size-4 text-zinc-400"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="responsibilities-requirements" className={sectionClass}>
                    <h2
                        id="responsibilities-requirements"
                        className="mb-5 flex items-center gap-2 text-sm font-medium"
                    >
                        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-violet-500" />
                        3. Responsibilities &amp; Requirements
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="responsibilities" className={labelClass}>
                                Key Responsibilities <span className="text-violet-400">*</span>
                            </label>
                            <textarea
                                id="responsibilities"
                                name="responsibilities"
                                rows={4}
                                required
                                placeholder="Describe the day-to-day responsibilities, projects, and impact of this role."
                                className={`${inputClass} h-auto min-h-28 resize-y py-3 leading-6`}
                            />
                        </div>
                        <div>
                            <label htmlFor="requirements" className={labelClass}>
                                Qualifications &amp; Requirements{' '}
                                <span className="text-violet-400">*</span>
                            </label>
                            <textarea
                                id="requirements"
                                name="requirements"
                                rows={4}
                                required
                                placeholder={
                                    '• Relevant experience and technical skills\n• Education, certifications, or qualifications\n• Communication and collaboration skills'
                                }
                                className={`${inputClass} h-auto min-h-28 resize-y py-3 leading-6`}
                            />
                        </div>
                    </div>
                </section>
                <button
                    type="submit"
                    className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-violet-400/40 bg-[#6251ff] px-5 text-sm font-medium text-white shadow-[0_4px_16px_rgba(98,81,255,0.2)] transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 sm:h-10 sm:w-auto"
                >
                    Publish Job
                    <FiArrowRight aria-hidden="true" className="size-4" />
                </button>
            </form>
        </>
    );
};

export default AddJobPostForm;
