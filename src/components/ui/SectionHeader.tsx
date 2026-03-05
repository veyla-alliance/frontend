import { FadeIn } from "@/components/FadeIn";

interface SectionHeaderProps {
    label?: string | React.ReactNode;
    title: string | React.ReactNode;
    labelClassName?: string;
    titleClassName?: string;
}

export const SectionHeader = ({
    label,
    title,
    labelClassName = "block text-[12px] font-semibold tracking-[3px] uppercase text-[var(--veyla-purple)] mb-6",
    titleClassName = "[font-family:'Instrument_Serif',serif] italic text-[56px] font-normal leading-[1.15] tracking-[-1px] text-[var(--veyla-text-main)] text-center mb-20 max-w-[700px]"
}: SectionHeaderProps) => {
    return (
        <>
            {label && (
                <FadeIn>
                    <span className={labelClassName}>{label}</span>
                </FadeIn>
            )}
            <FadeIn delay={0.1}>
                {/* if align is center, maybe wrap in a div? The original didn't, they just styled the heading as text-center via CSS like .flow-section-heading */}
                <h2 className={titleClassName}>
                    {title}
                </h2>
            </FadeIn>
        </>
    );
};
