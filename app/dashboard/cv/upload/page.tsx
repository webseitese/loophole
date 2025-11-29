"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Loader2 } from "lucide-react";

export default function UploadCVPage() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [cvName, setCvName] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        // Validate file type
        const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        if (!validTypes.includes(selectedFile.type)) {
            setError("Please upload a PDF or DOCX file");
            return;
        }

        // Validate file size (10MB max)
        if (selectedFile.size > 10 * 1024 * 1024) {
            setError("File size must be less than 10MB");
            return;
        }

        setFile(selectedFile);
        setError("");

        // Auto-generate CV name from filename
        if (!cvName) {
            const name = selectedFile.name.replace(/\.(pdf|docx)$/i, "");
            setCvName(name);
        }
    };

    const handleUpload = async () => {
        if (!file || !cvName) {
            setError("Please select a file and provide a name");
            return;
        }

        setIsUploading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", cvName);

            const response = await fetch("/api/cv/parse", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to upload resume");
            }

            // Redirect to CV detail page
            router.push(`/dashboard/cv/${data.cvId}`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <div className="mb-6">
                    <Link href="/dashboard">
                        <Button variant="ghost">← Back to Dashboard</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Upload Master Resume</CardTitle>
                        <CardDescription>
                            Upload your resume and we'll parse it automatically using AI
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* CV Name Input */}
                        <div className="space-y-2">
                            <Label htmlFor="cvName">Resume Name</Label>
                            <Input
                                id="cvName"
                                placeholder="e.g., Software Engineer CV"
                                value={cvName}
                                onChange={(e) => setCvName(e.target.value)}
                                disabled={isUploading}
                            />
                            <p className="text-xs text-muted-foreground">
                                Give your resume a descriptive name
                            </p>
                        </div>

                        {/* File Upload */}
                        <div className="space-y-2">
                            <Label>Resume File</Label>
                            <div
                                className={`border-2 border-dashed rounded-lg p-8 text-center ${file ? "border-primary bg-primary/5" : "border-gray-300"
                                    }`}
                            >
                                {file ? (
                                    <div className="space-y-4">
                                        <FileText className="h-12 w-12 text-primary mx-auto" />
                                        <div>
                                            <p className="font-medium">{file.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {(file.size / 1024).toFixed(2)} KB
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            onClick={() => setFile(null)}
                                            disabled={isUploading}
                                        >
                                            Remove File
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                                        <div>
                                            <Label
                                                htmlFor="file-upload"
                                                className="cursor-pointer text-primary hover:underline"
                                            >
                                                Choose a file
                                            </Label>
                                            <span className="text-gray-600"> or drag and drop</span>
                                            <Input
                                                id="file-upload"
                                                type="file"
                                                accept=".pdf,.docx"
                                                onChange={handleFileChange}
                                                className="hidden"
                                                disabled={isUploading}
                                            />
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            PDF or DOCX (max 10MB)
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                                {error}
                            </div>
                        )}

                        {/* Upload Button */}
                        <Button
                            onClick={handleUpload}
                            disabled={!file || !cvName || isUploading}
                            className="w-full"
                            size="lg"
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Uploading and Parsing...
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload & Parse Resume
                                </>
                            )}
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                            We'll use AI to extract and structure your resume data
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
