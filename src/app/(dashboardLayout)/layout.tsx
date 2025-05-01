export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {children}
        </div>
    );
}
