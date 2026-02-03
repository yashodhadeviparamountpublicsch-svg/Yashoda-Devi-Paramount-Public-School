import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Notices",
    description: "Stay updated with the latest news, announcements, and circulars from Yashoda Devi Paramount Public School.",
};

export default function NoticesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
