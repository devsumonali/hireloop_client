import DashboardSidebar from '@/app/(dashboard)/_component/DashboardSidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-dvh flex-1 bg-slate-50 text-slate-900">
            <DashboardSidebar />
            <main className="min-w-0 flex-1 p-8">{children}</main>
        </div>
    );
};

export default DashboardLayout;
