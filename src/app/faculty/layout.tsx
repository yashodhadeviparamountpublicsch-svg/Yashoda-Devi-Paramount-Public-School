import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Faculty",
    description: "Meet the dedicated and experienced faculty members of Yashoda Devi Paramount Public School who guide students towards excellence.",
};

export default function FacultyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
