import { RouteMap } from "@/components/app/routes/RouteMap";
import { ApyTable } from "@/components/app/routes/ApyTable";

export default function RoutesPage() {
    return (
        <div className="flex flex-col gap-5 p-6 md:p-8 pb-24 lg:pb-8">
            <div>
                <h1 className="text-[20px] font-semibold text-[var(--veyla-text-main)] tracking-[-0.3px]">
                    Routes
                </h1>
                <p className="text-[13px] text-[var(--veyla-text-dim)] mt-0.5">
                    Live XCM routing across Polkadot parachains
                </p>
            </div>

            <RouteMap />
            <ApyTable />
        </div>
    );
}
