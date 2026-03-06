export default function AppLoading() {
    return (
        <div className="flex flex-col gap-5 p-6 md:p-8 pb-24 lg:pb-8 animate-pulse">
            {/* Page header */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <div className="h-6 w-32 rounded-lg bg-white/[0.06]" />
                    <div className="h-4 w-24 rounded-md bg-white/[0.03]" />
                </div>
                <div className="h-4 w-36 rounded-md bg-white/[0.03]" />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="h-[90px] rounded-2xl bg-white/[0.03] border border-white/[0.04]"
                    />
                ))}
            </div>

            {/* Table + side panel */}
            <div className="grid grid-cols-[1fr_300px] gap-4 max-lg:grid-cols-1">
                <div className="h-[220px] rounded-2xl bg-white/[0.03] border border-white/[0.04]" />
                <div className="h-[220px] rounded-2xl bg-white/[0.03] border border-white/[0.04] max-lg:hidden" />
            </div>

            {/* Activity feed */}
            <div className="h-[180px] rounded-2xl bg-white/[0.03] border border-white/[0.04]" />
        </div>
    );
}
