import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admissions",
    description: "Apply for admission at Yashoda Devi Paramount Public School for the academic year 2026-27. Check eligibility criteria and documents required.",
};

export default function AdmissionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
