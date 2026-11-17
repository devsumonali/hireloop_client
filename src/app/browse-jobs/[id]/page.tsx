import { getJobPostById } from '@/lib/api/jobs';
import type { JobDetailsPageProps } from '@/types/jobs';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
    FiActivity,
    FiBarChart2,
    FiCheck,
    FiClock,
    FiCode,
    FiCommand,
    FiDollarSign,
    FiLayers,
    FiMapPin,
    FiMonitor,
    FiShield,
    FiSun,
} from 'react-icons/fi';
import { LuBanknote } from 'react-icons/lu';

const benefitCategories = [
    { icon: FiShield, label: 'Health & wellness' },
    { icon: FiDollarSign, label: 'Retirement benefits' },
    { icon: FiMonitor, label: 'Equipment support' },
    { icon: FiSun, label: 'Paid time off' },
];

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
    const { id } = await params;
    const job = await getJobPostById(id);

    if (!job) notFound();

    // Prepare the values displayed in the job details.
    const salary = job.minSalary || job.maxSalary
        ? `€${job.minSalary || '—'} – €${job.maxSalary || '—'} / ${job.salaryFrequency.replace(/ly$/, '')}`
        : 'Salary not specified';
    const isRemote = job.isRemote === true;
    const website = job.website?.startsWith('https://') || job.website?.startsWith('http://')
        ? job.website : undefined;
    const companyImage = job.companyImage || '/images/company-office.jpg';
    const requirements = (job.requirements || '').split('\n').filter((line) => line.trim());
    const responsibilities = (job.responsibilities || '').split('\n').filter((line) => line.trim());
    const skills = job.skills?.filter((skill) => skill.trim()) || [];
    const tags = skills.length
        ? skills
        : [
              job.category && job.category.replace(/[-_]/g, ' '),
              job.jobType,
              isRemote ? 'Remote' : 'On-site',
          ].filter(Boolean);
    const tagIcons = [FiCode, FiLayers, FiActivity, FiMonitor];
    const benefits = job.benefits?.filter((benefit) => benefit.trim()) || [];
    const description =
        job.description?.trim() ||
        `${job.company} is looking for a ${job.title}${job.location ? ` in ${job.location}` : ''}. Explore this ${job.jobType?.toLowerCase() || 'career'} opportunity${isRemote ? ' with remote work available' : ''} and review the responsibilities and requirements below to learn more about the role.`;
    const summary = [
        { label: 'Salary Range', value: salary, icon: LuBanknote },
        {
            label: 'Location',
            value: isRemote
                ? `Remote${job.location ? ` (${job.location})` : ''}`
                : job.location || 'Not specified',
            icon: FiMapPin,
        },
        { label: 'Job Type', value: job.jobType || 'Not specified', icon: FiClock },
        { label: 'Experience', value: job.experience || 'Not specified', icon: FiBarChart2 },
    ];

    return (
        <main className="flex-1 bg-[#09090b] pb-8 text-white font-[Arial,Helvetica,sans-serif] lg:pb-12">
            <div className="mx-auto w-[calc(100%-2rem)] max-w-6xl pt-5 sm:w-[90%] lg:pt-7">
                <header className="flex flex-wrap items-center gap-4 rounded-[10px] border border-[#29292e] bg-[linear-gradient(115deg,#141417_60%,#1a1a1d)] p-5 sm:flex-nowrap sm:gap-3 sm:p-5 lg:gap-5 lg:px-7 lg:py-7">
                    <div
                        aria-hidden="true"
                        className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-[#34343b] bg-[#101014] p-1.5 sm:size-12 lg:size-17"
                    >
                        <div className="flex size-full items-center justify-center rounded bg-[radial-gradient(ellipse_at_50%_40%,#343c3c,#0a0c0e_75%)] shadow-[inset_0_0_0_1px_#ffffff04]">
                            <FiCommand className="size-4.5 rotate-[-35deg] text-[#ddd] lg:size-6" />
                        </div>
                    </div>
                    <div className="min-w-0 flex-1">
                        <h1 className="text-xl leading-tight font-semibold tracking-[-0.5px] wrap-break-word sm:text-lg lg:text-[28px]">
                            {job.title}
                        </h1>
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#c3c3cc] sm:text-[11px] lg:mt-3 lg:gap-x-4 lg:text-base">
                            <span>{job.company}</span>
                            <span aria-hidden="true" className="text-[#6b6b74]">
                                &bull;
                            </span>
                            <span
                                className={`inline-flex items-center gap-1.5 text-[10px] lg:text-xs ${job.status === 'closed' ? 'text-[#94949f]' : 'text-[#42d78b]'}`}
                            >
                                <span className="flex size-3 items-center justify-center rounded-full border border-current lg:size-3.5">
                                    <FiCheck
                                        aria-hidden="true"
                                        className="size-2 stroke-[2.5px] lg:size-2.5"
                                    />
                                </span>
                                {job.status === 'closed'
                                    ? 'Applications closed'
                                    : job.isVerifiedEmployer
                                      ? 'Verified Employer'
                                      : 'Open position'}
                            </span>
                        </div>
                    </div>
                    <div className="ml-auto flex w-full items-center justify-end gap-2 border-t border-[#ffffff0a] pt-4 sm:w-auto sm:shrink-0 sm:border-0 sm:pt-0 lg:gap-3">
                        <Link
                            href="/checkout"
                            className="inline-flex h-10 items-center justify-center rounded-md bg-white px-4 text-xs font-medium text-black hover:bg-[#e3e3e8] lg:h-11 lg:px-5 lg:text-sm"
                        >
                            Apply Now
                        </Link>
                    </div>
                </header>

                <div className="mt-4 grid items-start gap-4 sm:grid-cols-[minmax(0,2.06fr)_minmax(0,1fr)] lg:mt-5 lg:gap-5">
                    <div className="min-w-0">
                        <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:gap-3">
                            {summary.map(({ label, value, icon: Icon }) => (
                                <div
                                    key={label}
                                    className="min-w-0 rounded-lg border border-[#29292e] bg-[#131316] p-3 sm:p-2.5 lg:p-4"
                                >
                                    <Icon
                                        aria-hidden="true"
                                        className="mb-1.5 size-4 stroke-[1.5px] sm:size-3.5 lg:mb-2 lg:size-5"
                                    />
                                    <dt className="text-[9px] leading-4 tracking-[0.25px] text-[#9b9ba5] uppercase sm:text-[8px] lg:text-[10px]">
                                        {label}
                                    </dt>
                                    <dd className="mt-0.5 text-xs leading-5 wrap-break-word sm:text-[10px] sm:leading-4 lg:text-sm lg:leading-5">
                                        {value}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <article className="mt-4 rounded-[10px] border border-[#29292e] bg-[#131316] px-5 py-6 sm:px-5 sm:py-5 lg:mt-5 lg:px-7 lg:py-7">
                            <section aria-labelledby="description-heading">
                                <h2
                                    id="description-heading"
                                    className="text-base font-medium tracking-[-0.2px] sm:text-sm lg:text-lg"
                                >
                                    Job Description
                                </h2>
                                <p className="mt-4 text-xs leading-[1.8] whitespace-pre-line wrap-break-word text-[#a1a1ac] sm:mt-3 sm:text-[10px] lg:mt-4 lg:text-[13px]">
                                    {description}
                                </p>
                            </section>

                            <section
                                aria-labelledby="responsibilities-heading"
                                className="mt-5 border-t border-[#303035] pt-5 lg:mt-6 lg:pt-6"
                            >
                                <h2
                                    id="responsibilities-heading"
                                    className="text-base font-medium tracking-[-0.2px] sm:text-sm lg:text-lg"
                                >
                                    Responsibilities
                                </h2>
                                {responsibilities.length ? (
                                    <ul className="mt-4 space-y-2.5 pl-4 text-xs leading-[1.8] text-[#a1a1ac] marker:text-[#e5e5eb] sm:mt-3 sm:space-y-2 sm:text-[10px] lg:mt-4 lg:space-y-3 lg:text-[13px]">
                                        {responsibilities.map((item, index) => (
                                            <li
                                                key={index}
                                                className="list-disc pl-1.5 wrap-break-word"
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="mt-3 text-xs text-[#a1a1ac] lg:text-sm">
                                        No responsibilities provided.
                                    </p>
                                )}
                            </section>

                            <section
                                aria-labelledby="requirements-heading"
                                className="mt-5 border-t border-[#303035] pt-5 lg:mt-6 lg:pt-6"
                            >
                                <h2
                                    id="requirements-heading"
                                    className="text-base font-medium tracking-[-0.2px] sm:text-sm lg:text-lg"
                                >
                                    Requirements
                                </h2>
                                <div
                                    aria-label={skills.length ? 'Required skills' : 'Role details'}
                                    className="mt-4 flex flex-wrap gap-1.5 sm:mt-3 lg:mt-4 lg:gap-2"
                                >
                                    {tags.map((tag, index) => {
                                        const Icon = tagIcons[index % tagIcons.length];
                                        return (
                                            <span
                                                key={`${tag}-${index}`}
                                                className="inline-flex items-center gap-1.5 rounded-md border border-[#35353c] bg-[#1b1b20] px-2.5 py-1.5 text-[10px] capitalize text-[#e0e0e6] shadow-[0_1px_2px_#0003] sm:px-2 sm:py-1 sm:text-[8px] lg:px-3 lg:py-1.5 lg:text-[11px]"
                                            >
                                                <Icon
                                                    aria-hidden="true"
                                                    className="size-3 stroke-[1.5px]"
                                                />
                                                {tag}
                                            </span>
                                        );
                                    })}
                                </div>
                                {requirements.length ? (
                                    <ul className="mt-4 space-y-2.5 pl-4 text-xs leading-[1.8] text-[#a1a1ac] marker:text-[#e5e5eb] sm:space-y-2 sm:text-[10px] lg:space-y-3 lg:text-[13px]">
                                        {requirements.map((item, index) => (
                                            <li
                                                key={index}
                                                className="list-disc pl-1.5 wrap-break-word"
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="mt-3 text-xs text-[#a1a1ac] lg:text-sm">
                                        No requirements provided.
                                    </p>
                                )}
                            </section>

                            <section
                                aria-labelledby="benefits-heading"
                                className="mt-5 border-t border-[#303035] pt-5 lg:mt-6 lg:pt-6"
                            >
                                <h2
                                    id="benefits-heading"
                                    className="text-base font-medium tracking-[-0.2px] sm:text-sm lg:text-lg"
                                >
                                    Benefits
                                </h2>
                                <div className="mt-5 grid gap-x-5 gap-y-5 min-[380px]:grid-cols-2 sm:mt-5 lg:mt-7 lg:gap-y-7">
                                    {benefits.length
                                        ? benefits.map((benefit, index) => {
                                              const Icon =
                                                  benefitCategories[
                                                      index % benefitCategories.length
                                                  ].icon;
                                              return (
                                                  <div
                                                      key={index}
                                                      className="flex min-w-0 items-center gap-3 lg:gap-4"
                                                  >
                                                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#ffffff06] bg-[#2a2a2f] lg:size-10">
                                                          <Icon
                                                              aria-hidden="true"
                                                              className="size-4 stroke-[1.5px] lg:size-5"
                                                          />
                                                      </span>
                                                      <span className="text-xs leading-5 wrap-break-word sm:text-[10px] lg:text-sm">
                                                          {benefit}
                                                      </span>
                                                  </div>
                                              );
                                          })
                                        : benefitCategories.map(({ icon: Icon, label }) => (
                                              <div
                                                  key={label}
                                                  className="flex min-w-0 items-center gap-3 lg:gap-4"
                                              >
                                                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#ffffff06] bg-[#2a2a2f] lg:size-10">
                                                      <Icon
                                                          aria-hidden="true"
                                                          className="size-4 stroke-[1.5px] lg:size-5"
                                                      />
                                                  </span>
                                                  <div className="min-w-0 text-xs leading-5 sm:text-[10px] lg:text-sm">
                                                      <p>{label}</p>
                                                      <p className="text-[10px] text-[#858590] sm:text-[8px] lg:text-[11px]">
                                                          Not specified
                                                      </p>
                                                  </div>
                                              </div>
                                          ))}
                                </div>
                            </section>
                        </article>
                    </div>

                    <aside
                        aria-labelledby="company-heading"
                        className="min-w-0 rounded-[10px] border border-[#29292e] bg-[#131316] p-5 sm:p-3.5 lg:p-5"
                    >
                        <h2
                            id="company-heading"
                            className="text-base font-medium tracking-[-0.2px] sm:text-sm lg:text-lg"
                        >
                            Company Overview
                        </h2>
                        <div className="relative mt-4 aspect-[1.7] overflow-hidden rounded-lg border border-[#252b2b] bg-[radial-gradient(ellipse_at_50%_65%,#1c2e2e,#060c0c_75%)] sm:mt-3 lg:mt-5">
                            <div className="absolute inset-x-[14%] top-[8%] bottom-[19%] overflow-hidden rounded-sm border-[3px] border-[#1a2427] bg-[#101718] shadow-[0_7px_20px_#0009] lg:border-4">
                                {/* Illustrative office photo: images.unsplash.com/photo-1497366754035-f200968a6e72 */}
                                <Image
                                    src={companyImage}
                                    alt={
                                        job.companyImage
                                            ? `${job.company} workplace`
                                            : 'Illustrative modern office interior'
                                    }
                                    fill
                                    sizes="(max-width: 639px) 80vw, (max-width: 1023px) 25vw, 360px"
                                    unoptimized={Boolean(job.companyImage)}
                                    className="object-cover brightness-[0.42] saturate-[0.35]"
                                />
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-[#123c3b]/20"
                                />
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-x-0 bottom-0 h-[13%] bg-[linear-gradient(#263134,#151c1e)]"
                                />
                            </div>
                            <div
                                aria-hidden="true"
                                className="absolute bottom-[10%] left-1/2 h-[10%] w-[7%] -translate-x-1/2 bg-[linear-gradient(#101819,#374345)]"
                            />
                            <div
                                aria-hidden="true"
                                className="absolute bottom-[8%] left-1/2 h-[3%] w-[28%] -translate-x-1/2 rounded-t-sm bg-[#263234] shadow-[0_2px_5px_#0008]"
                            />
                        </div>
                        <dl className="mt-4 text-xs sm:mt-3 sm:text-[10px] lg:mt-5 lg:text-sm">
                            <div className="flex items-start justify-between gap-3 border-b border-[#2a2a30] py-4 lg:py-5">
                                <dt className="pt-0.5 text-[9px] tracking-[0.3px] text-[#94949f] uppercase sm:text-[8px] lg:text-[10px]">
                                    Size
                                </dt>
                                <dd className="max-w-[72%] text-right leading-5 text-[#dedee5]">
                                    {job.companySize || 'Not specified'}
                                </dd>
                            </div>
                            <div className="flex items-start justify-between gap-3 border-b border-[#2a2a30] py-4 lg:py-5">
                                <dt className="pt-0.5 text-[9px] tracking-[0.3px] text-[#94949f] uppercase sm:text-[8px] lg:text-[10px]">
                                    Industry
                                </dt>
                                <dd className="max-w-[72%] text-right leading-5 text-[#dedee5]">
                                    {job.industry || 'Not specified'}
                                </dd>
                            </div>
                        </dl>
                        {website ? (
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 flex min-h-10 w-full items-center justify-center rounded-md border border-[#38383e] bg-[#202024] px-3 text-xs transition hover:bg-[#2a2a30] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white sm:min-h-8 sm:text-[9px] lg:mt-5 lg:min-h-11 lg:text-xs"
                            >
                                Visit Website
                            </a>
                        ) : (
                            <button
                                type="button"
                                disabled
                                title="The employer has not provided a website."
                                className="mt-4 flex min-h-10 w-full items-center justify-center rounded-md border border-[#38383e] bg-[#202024] px-3 text-xs text-[#858590] sm:min-h-8 sm:text-[9px] lg:mt-5 lg:min-h-11 lg:text-xs"
                            >
                                Visit Website
                            </button>
                        )}
                    </aside>
                </div>
            </div>
        </main>
    );
}
