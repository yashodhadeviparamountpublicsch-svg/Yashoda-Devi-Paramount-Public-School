"use client"

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, FileText, Loader2, Download, Paperclip } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import FileUpload from "@/components/ui/file-upload";

interface Notice {
    id: string;
    title: string;
    content: string;
    category: string;
    date: string;
    fileUrl?: string;
    fileName?: string;
    createdAt: any;
}

// Helper to determine badge color
const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
        case 'academic': return 'bg-blue-100 text-blue-700';
        case 'event': return 'bg-purple-100 text-purple-700';
        case 'holiday': return 'bg-green-100 text-green-700';
        case 'exam': return 'bg-red-100 text-red-700';
        default: return 'bg-slate-100 text-slate-700';
    }
}

export default function NoticesManagementPage() {
    const { toast } = useToast();
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingNotice, setEditingNotice] = useState<Notice | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "General",
        date: new Date().toISOString().split('T')[0],
        fileUrl: "",
        fileName: ""
    });
    // Removed selectedFile state as FileUpload handles it indirectly via calls to setFormData

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const q = query(collection(db, "notices"), orderBy("date", "desc"));
            const querySnapshot = await getDocs(q);
            const noticesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Notice[];
            setNotices(noticesData);
        } catch (error) {
            console.error("Error fetching notices:", error);
        } finally {
            setLoading(false);
        }
    };

    // handleUpload removed as Cloudinary handles it via widget

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            const fileUrl = formData.fileUrl;
            const fileName = formData.fileName;

            // selectedFile logic removed, we rely on formData.fileUrl being updated by the widget component

            if (editingNotice) {
                await updateDoc(doc(db, "notices", editingNotice.id), {
                    ...formData,
                    fileUrl,
                    fileName,
                    updatedAt: new Date()
                });
            } else {
                await addDoc(collection(db, "notices"), {
                    ...formData,
                    fileUrl,
                    fileName,
                    createdAt: new Date()
                });
            }

            setFormData({ title: "", content: "", category: "General", date: new Date().toISOString().split('T')[0], fileUrl: "", fileName: "" });
            // setSelectedFile(null); // Removed
            setShowForm(false);
            setEditingNotice(null);
            fetchNotices();
            toast({
                title: editingNotice ? "Notice Updated" : "Notice Published",
                description: "The notice has been successfully saved.",
            });
        } catch (error) {
            console.error("Error saving notice:", error);
            toast({
                title: "Error",
                description: `Failed to save the notice: ${error instanceof Error ? error.message : "Unknown error"}`,
                variant: "destructive",
            });
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = (notice: Notice) => {
        setEditingNotice(notice);
        setFormData({
            title: notice.title,
            content: notice.content,
            category: notice.category,
            date: notice.date,
            fileUrl: notice.fileUrl || "",
            fileName: notice.fileName || ""
        });
        setShowForm(true);
        // setSelectedFile(null); // Removed
    };

    const handleDelete = async (notice: Notice) => {
        if (confirm("Are you sure you want to delete this notice?")) {
            try {
                await deleteDoc(doc(db, "notices", notice.id));
                if (notice.fileUrl && notice.fileUrl.includes('firebasestorage')) {
                    // Legacy firebase storage cleanup if needed, though we can't easily do it without the storage import.
                    // Ideally we'd keep the storage import just for cleanup or just skip it.
                    // For now, removing the deletion logic for simplicity as we are migrating away.
                    console.log("Skipping legacy storage deletion");
                }
                fetchNotices();
                toast({
                    title: "Notice Deleted",
                    description: "The notice has been removed permanently.",
                });
            } catch (error) {
                console.error("Error deleting notice:", error);
                toast({
                    title: "Error",
                    description: "Failed to delete the notice.",
                    variant: "destructive",
                });
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Notices Board</h1>
                    <p className="text-muted-foreground">Manage school announcements and circulars.</p>
                </div>
                {!showForm && (
                    <Button onClick={() => {
                        setEditingNotice(null);
                        setFormData({ title: "", content: "", category: "General", date: new Date().toISOString().split('T')[0], fileUrl: "", fileName: "" });
                        setFormData({ title: "", content: "", category: "General", date: new Date().toISOString().split('T')[0], fileUrl: "", fileName: "" });
                        // setSelectedFile(null);
                        setShowForm(true);
                    }}>
                        <Plus className="mr-2 h-4 w-4" /> Post New Notice
                    </Button>
                )}
            </div>

            {showForm && (
                <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                        <CardTitle>{editingNotice ? "Edit Notice" : "Create New Notice"}</CardTitle>
                        <CardDescription>Fill in the details for the announcement.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2 col-span-2 md:col-span-1">
                                    <label className="text-sm font-medium">Title</label>
                                    <Input
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. Annual Sports Day 2026"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Category</label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="General">General</option>
                                        <option value="Academic">Academic</option>
                                        <option value="Event">Event</option>
                                        <option value="Holiday">Holiday</option>
                                        <option value="Exam">Exam</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Content / Description</label>
                                <Textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Enter the details of the notice..."
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Date</label>
                                    <Input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Attachment (PDF/Image)</label>
                                    <FileUpload
                                        value={formData.fileUrl ? [formData.fileUrl] : []}
                                        onChange={(url, name) => setFormData({ ...formData, fileUrl: url, fileName: name || "attachment" })}
                                        onRemove={() => setFormData({ ...formData, fileUrl: "", fileName: "" })}
                                    />
                                    {/* Legacy input removed */}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                                <Button type="submit" disabled={uploading}>
                                    {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {editingNotice ? "Update Notice" : "Publish Notice"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="space-y-4">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : notices.length === 0 ? (
                    <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
                        <p className="text-muted-foreground">No notices posted yet.</p>
                    </div>
                ) : (
                    notices.map((notice) => (
                        <div key={notice.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-xl hover:bg-slate-50 transition-colors bg-card">
                            <div className="md:w-32 flex flex-col justify-center items-center md:items-start text-center md:text-left shrink-0 border-b md:border-b-0 md:border-r pb-4 md:pb-0 md:pr-4">
                                <span className="text-2xl font-bold font-serif text-primary">
                                    {format(parseISO(notice.date), 'dd')}
                                </span>
                                <span className="text-sm uppercase tracking-wider text-muted-foreground">
                                    {format(parseISO(notice.date), 'MMM yyyy')}
                                </span>
                            </div>

                            <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant="outline" className={getCategoryColor(notice.category)}>
                                        {notice.category}
                                    </Badge>
                                    <h3 className="font-bold text-lg leading-tight">{notice.title}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">{notice.content}</p>

                                {notice.fileUrl && (
                                    <div className="pt-2">
                                        <a
                                            href={notice.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-xs font-medium text-blue-600 hover:underline"
                                        >
                                            <Paperclip className="h-3 w-3 mr-1" />
                                            Download Attachment {notice.fileName ? `(${notice.fileName})` : ''}
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2 self-start md:self-center">
                                <Button size="icon" variant="ghost" onClick={() => handleEdit(notice)}>
                                    <Pencil className="h-4 w-4 text-muted-foreground" />
                                </Button>
                                <Button size="icon" variant="ghost" className="hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(notice)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}


