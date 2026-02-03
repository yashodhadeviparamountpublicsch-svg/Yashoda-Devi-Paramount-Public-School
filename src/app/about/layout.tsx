import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about the history, vision, and mission of Yashoda Devi Paramount Public School. Meet our leadership and discover our facilities.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
