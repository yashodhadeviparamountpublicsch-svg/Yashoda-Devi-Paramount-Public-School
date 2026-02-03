import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gallery",
    description: "View the latest photos and events from Yashoda Devi Paramount Public School. Explore our campus life and activities.",
};

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
