import { Providers } from "@/lib/providers";
import { AppSidebar } from "@/components/app/AppSidebar";
import { AppTopbar } from "@/components/app/AppTopbar";
import { AuthGuard } from "@/components/app/AuthGuard";
import { MobileNav } from "@/components/app/MobileNav";
import { Toaster } from "sonner";
import { Noise } from "@/components/Noise";

export const metadata = {
    title: {
        default: "Dashboard",
        template: "%s | Veyla",
    },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <div className="flex h-screen bg-[var(--veyla-dark)] overflow-hidden">
                <Noise />
                <AppSidebar />

                <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                    <AppTopbar />
                    <main className="flex-1 overflow-y-auto flex flex-col">
                        <AuthGuard>{children}</AuthGuard>
                    </main>
                </div>
            </div>
            <MobileNav />
            <Toaster
                position="bottom-right"
                theme="dark"
                toastOptions={{
                    style: {
                        background: "#0d0d14",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#f0f0f5",
                    },
                }}
            />
        </Providers>
    );
}
