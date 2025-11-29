import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold">Resume Optimizer</span>
                    </Link>
                    <nav className="flex gap-4">
                        <Link href="/auth/login">
                            <Button variant="ghost">Login</Button>
                        </Link>
                        <Link href="/auth/signup">
                            <Button>Get Started</Button>
                        </Link>
                    </nav>
                </div>
            </header>

            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        Choose Your Plan
                    </h1>
                    <p className="text-xl text-gray-600">
                        Start free, upgrade when you need more
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* FREE Plan */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Free</CardTitle>
                            <div className="mt-4">
                                <span className="text-4xl font-bold">$0</span>
                                <span className="text-gray-600">/month</span>
                            </div>
                            <CardDescription className="mt-2">
                                Perfect to try it out
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3">
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span>3 optimizations per month</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span>1 master CV</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span>Basic ATS score</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span>PDF export</span>
                                </li>
                            </ul>
                            <Link href="/auth/signup" className="block">
                                <Button className="w-full mt-6" variant="outline">
                                    Get Started Free
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* PRO Plan */}
                    <Card className="border-primary border-2 relative shadow-lg">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                            Most Popular
                        </div>
                        <CardHeader>
                            <CardTitle className="text-2xl">PRO</CardTitle>
                            <div className="mt-4">
                                <span className="text-4xl font-bold">$9.99</span>
                                <span className="text-gray-600">/month</span>
                            </div>
                            <CardDescription className="mt-2">
                                For active job seekers
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3">
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span className="font-semibold">50 optimizations per month</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span>3 master CVs</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span className="font-semibold">Cover letter generator (3 variants)</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span>Advanced ATS analysis</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span className="font-semibold">PDF + DOCX export</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span>Priority support</span>
                                </li>
                            </ul>
                            <Link href="/auth/signup" className="block">
                                <Button className="w-full mt-6">
                                    Start Free Trial
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* UNLIMITED Plan */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">UNLIMITED</CardTitle>
                            <div className="mt-4">
                                <span className="text-4xl font-bold">$19.99</span>
                                <span className="text-gray-600">/month</span>
                            </div>
                            <CardDescription className="mt-2">
                                For power users
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3">
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span className="font-semibold">Unlimited optimizations</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span className="font-semibold">Unlimited master CVs</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span>Everything in PRO</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span>LinkedIn profile optimizer</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span>Interview questions predictor</span>
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span>Resume templates library</span>
                                </li>
                            </ul>
                            <Link href="/auth/signup" className="block">
                                <Button className="w-full mt-6">
                                    Start Free Trial
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* FAQ Section */}
                <div className="mt-20 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">How does the free trial work?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    You can start with the FREE plan (no credit card required) and get 3 optimizations per month.
                                    Upgrade anytime to PRO or UNLIMITED for more features.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Can I cancel anytime?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Yes! You can cancel your subscription at any time from your billing dashboard.
                                    You'll keep access until the end of your billing period.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">What's an "optimization"?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    One optimization = tailoring your resume for one specific job posting.
                                    You can download the optimized resume as many times as you want.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Do optimizations roll over?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    No, unused optimizations reset on the 1st of each month.
                                    Choose UNLIMITED if you apply to many jobs!
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t py-8 mt-20">
                <div className="container mx-auto px-4 text-center text-gray-600">
                    <p>&copy; 2024 Resume Optimizer. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
