import { FadeIn } from "@/components/FadeIn";

interface SectionHeaderProps {
    label?: string | React.ReactNode;
    title: string | React.ReactNode;
    labelClassName?: string;
    titleClassName?: string;
}

const DEFAULT_LABEL = "block text-[14px] font-semibold tracking-[3px] uppercase text-[var(--veyla-purple)] mb-6";
const DEFAULT_TITLE = "[font-family:'Instrument_Serif',serif] italic text-[56px] font-normal leading-[1.15] tracking-[-1px] text-[var(--veyla-text-main)] text-center mb-20 max-w-[700px]";

export const SectionHeader = ({
    label,
    title,
    labelClassName = DEFAULT_LABEL,
    titleClassName = DEFAULT_TITLE,
}: SectionHeaderProps) => (
    <>
        {label && (
            <FadeIn>
                <span className={labelClassName}>{label}</span>
            </FadeIn>
        )}
        <FadeIn delay={0.1}>
            <h2 className={titleClassName}>{title}</h2>
        </FadeIn>
    </>
);
