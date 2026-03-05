import { FadeIn } from "@/components/FadeIn";

interface SectionHeaderProps {
    label?: string | React.ReactNode;
    title: string | React.ReactNode;
    align?: 'left' | 'center';
    labelClassName?: string;
    titleClassName?: string;
}

export const SectionHeader = ({
    label,
    title,
    align = 'center',
    labelClassName = "section-label",
    titleClassName = "manifesto-heading"
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
