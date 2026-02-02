"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileIcon, Trash, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface FileUploadProps {
    disabled?: boolean;
    onChange: (value: string, fileName?: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        if (result?.info?.secure_url) {
            // Using original_filename as a fallback for display name
            onChange(result.info.secure_url, result.info.original_filename);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => {
                    const isImage = url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
                    return (
                        <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden border bg-slate-50 flex items-center justify-center">
                            <div className="z-10 absolute top-2 right-2">
                                <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            {isImage ? (
                                <Image
                                    fill
                                    className="object-cover"
                                    alt="Uploaded File"
                                    src={url}
                                />
                            ) : (
                                <div className="flex flex-col items-center p-4 text-center">
                                    <FileIcon className="h-10 w-10 text-muted-foreground mb-2" />
                                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline break-all truncate max-w-full px-2">
                                        View File
                                    </a>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <CldUploadWidget
                onSuccess={onUpload}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                options={{
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                    multiple: false,
                    maxFiles: 1,
                    resourceType: "auto", // Allows PDFs and other files
                    clientAllowedFormats: ["png", "jpeg", "jpg", "pdf", "webp"], // Explicitly allow PDFs
                }}
            >
                {({ open }) => {
                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            variant="secondary"
                            onClick={() => open()}
                        >
                            <UploadCloud className="h-4 w-4 mr-2" />
                            Upload File
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}

export default FileUpload;
