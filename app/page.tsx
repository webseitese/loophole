import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles, Target, Zap, FileText, TrendingUp } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold">Resume Optimizer</span>
                    </div>
                    <nav className="flex gap-4">
                        <Link href="/pricing">
                            <Button variant="ghost">Pricing</Button>
                        </Link>
                        <Link href="/auth/login">
                            <Button variant="ghost">Login</Button>
                        </Link>
                        <Link href="/auth/signup">
                            <Button>Get Started</Button>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Optimize Your Resume for Any Job in Seconds
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Upload your resume once, then get AI-powered tailored versions for every job you apply to.
                        Beat ATS systems and impress hiring managers.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/auth/signup">
                            <Button size="lg" className="text-lg px-8">
                                Start Free Trial
                            </Button>
                        </Link>
                        <Link href="/pricing">
                            <Button size="lg" variant="outline" className="text-lg px-8">
                                View Pricing
                            </Button>
                        </Link>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        3 free optimizations per month • No credit card required
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <Card>
                        <CardHeader>
                            <FileText className="h-12 w-12 text-primary mb-4" />
                            <CardTitle>1. Upload Your Resume</CardTitle>
                            <CardDescription>
                                Upload your master resume once. We'll parse and structure it automatically.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Target className="h-12 w-12 text-primary mb-4" />
                            <CardTitle>2. Paste Job Description</CardTitle>
                            <CardDescription>
                                Copy the job posting you're interested in. Our AI analyzes the requirements.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Zap className="h-12 w-12 text-primary mb-4" />
                            <CardTitle>3. Get Optimized Resume</CardTitle>
                            <CardDescription>
                                Receive a tailored resume with improved ATS score and relevant keywords.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-blue-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Resume Optimizer?</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="flex gap-4">
                            <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold mb-2">Beat ATS Systems</h3>
                                <p className="text-gray-600">
                                    Get instant ATS scores and see exactly what to improve to pass automated screening.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold mb-2">Save Hours of Work</h3>
                                <p className="text-gray-600">
                                    No more manually tailoring resumes. Get optimized versions in seconds, not hours.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold mb-2">Keyword Optimization</h3>
                                <p className="text-gray-600">
                                    Automatically integrate relevant keywords from job descriptions naturally.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold mb-2">Cover Letters Included</h3>
                                <p className="text-gray-600">
                                    PRO users get 3 cover letter variants for every optimization.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Preview */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Free</CardTitle>
                            <div className="text-3xl font-bold mt-2">$0</div>
                            <CardDescription>Perfect to try it out</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span>3 optimizations/month</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span>1 master CV</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span>Basic ATS score</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span>PDF export</span>
                                </li>
                            </ul>
                            <Link href="/auth/signup" className="block mt-6">
                                <Button className="w-full">Get Started</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="border-primary border-2 relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                            Most Popular
                        </div>
                        <CardHeader>
                            <CardTitle>PRO</CardTitle>
                            <div className="text-3xl font-bold mt-2">$9.99<span className="text-sm font-normal">/month</span></div>
                            <CardDescription>For active job seekers</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span>50 optimizations/month</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span>3 master CVs</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span>Cover letter generator</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span>Advanced ATS analysis</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span>PDF + DOCX export</span>
                                </li>
                            </ul>
                            <Link href="/auth/signup" className="block mt-6">
                                <Button className="w-full">Start Free Trial</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>UNLIMITED</CardTitle>
                            <div className="text-3xl font-bold mt-2">$19.99<span className="text-sm font-normal">/month</span></div>
                            <CardDescription>For power users</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span>Unlimited optimizations</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span>Unlimited master CVs</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span>Everything in PRO</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span>LinkedIn optimizer</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span>Interview questions</span>
                                </li>
                            </ul>
                            <Link href="/auth/signup" className="block mt-6">
                                <Button className="w-full">Start Free Trial</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of job seekers who've optimized their resumes with AI
                    </p>
                    <Link href="/auth/signup">
                        <Button size="lg" variant="secondary" className="text-lg px-8">
                            Get Started Free
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t py-8">
                <div className="container mx-auto px-4 text-center text-gray-600">
                    <p>&copy; 2024 Resume Optimizer. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
