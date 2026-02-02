"use client"

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Image as ImageIcon, Upload } from "lucide-react";
import ImageUpload from "@/components/ui/image-upload";

interface GalleryImage {
    id: string;
    url: string;
    title: string;
    uploadedAt: any;
}

export default function GalleryManagementPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const q = query(collection(db, "gallery"), orderBy("uploadedAt", "desc"));
            const querySnapshot = await getDocs(q);
            const imagesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as GalleryImage[];
            setImages(imagesData);
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!imageUrl) {

            return;
        }

        setUploading(true);
        try {

            await addDoc(collection(db, "gallery"), {
                url: imageUrl,
                title: title || "Untitled",
                uploadedAt: new Date()
            });


            setTitle("");
            setImageUrl("");
            fetchImages();
        } catch (error) {
            console.error("Error saving image:", error);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (image: GalleryImage) => {
        if (confirm("Are you sure you want to delete this image?")) {
            try {
                await deleteDoc(doc(db, "gallery", image.id));
                fetchImages();
            } catch (error) {
                console.error("Error deleting image:", error);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-serif">Gallery Management</h1>
                <p className="text-muted-foreground mt-1">Upload and manage school gallery images</p>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Upload New Image</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Image Title (Optional)</label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Image title"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Select Image</label>
                            <ImageUpload
                                value={imageUrl ? [imageUrl] : []}
                                disabled={uploading}
                                onChange={(url) => {

                                    setImageUrl(url);
                                }}
                                onRemove={() => {

                                    setImageUrl("");
                                }}
                            />
                        </div>

                        <Button type="submit" disabled={uploading || !imageUrl}>
                            <Upload className="h-4 w-4 mr-2" />
                            {uploading ? "Saving..." : "Save to Gallery"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.length === 0 ? (
                    <Card className="col-span-full">
                        <CardContent className="py-12 text-center">
                            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">No images yet. Upload your first image!</p>
                        </CardContent>
                    </Card>
                ) : (
                    images.map((image) => (
                        <Card key={image.id} className="overflow-hidden group">
                            <div className="aspect-square relative">
                                <img
                                    src={image.url}
                                    alt={image.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(image)}
                                        className="bg-white"
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            </div>
                            <CardContent className="p-3">
                                <p className="text-sm font-medium truncate">{image.title}</p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
