import DashboardSidebar from '@/app/(dashboard)/_component/DashboardSidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-dvh min-w-0 flex-1 flex-col bg-slate-50 text-slate-900 lg:flex-row">
            <DashboardSidebar />
            <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
    );
};

export default DashboardLayout;
