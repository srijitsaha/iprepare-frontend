import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, BookOpen, Calculator, Microscope, Quote } from "lucide-react"

export default function IPrepareLanding() {
    return (
        <>
            <div className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden">
                {/* TopNavBar */}
                <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
                        <div className="text-xl font-bold tracking-tight text-primary">
                            iPrepare
                        </div>
                        <Button className="rounded-full px-6">
                            Get Started
                        </Button>
                    </div>
                </nav>


                <main>
                    {/* Hero Section */}
                    <section className="relative flex min-h-[80vh] items-center justify-center py-20 overflow-hidden">
                        {/* Background Image & Overlay */}
                        <div className="absolute inset-0 z-0">
                            <img
                                alt="Student studying"
                                className="w-full h-full object-cover opacity-20 dark:opacity-30"
                                src="60272784626.png"
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-background via-background/20 to-transparent"></div>
                        </div>

                        <div className="container relative z-10 mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="text-left space-y-6">
                                <Badge variant="secondary" className="px-3 py-1 text-sm tracking-wide uppercase">
                                    <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></span>
                                    Live Quizzes Active
                                </Badge>

                                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight lg:text-7xl">
                                    From Aspiration to <span className="text-primary">Achievement.</span>
                                </h1>

                                <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                                    The ultimate platform for UPSC, JEE, and NEET aspirants to master their exams with precision and grit.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4">
                                    <Button size="lg" className="rounded-full w-full sm:w-auto text-md px-8 h-14">
                                        Start Mock Test
                                    </Button>
                                    <Button size="lg" variant="outline" className="rounded-full w-full sm:w-auto text-md px-8 h-14">
                                        Browse Quizzes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Motivational Quote */}
                    <section className="py-24 bg-muted/50 border-y">
                        <div className="container mx-auto px-4 text-center max-w-4xl">
                            <Quote className="w-12 h-12 mx-auto text-muted-foreground mb-6 opacity-50" />
                            <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-6 italic">
                                "The only limit to our realization of tomorrow will be our doubts of today."
                            </h2>
                            <p className="text-sm font-semibold text-primary uppercase tracking-widest">
                                - Franklin D. Roosevelt
                            </p>
                        </div>
                    </section>

                    {/* Exam Categories (Bento Grid) */}
                    <section className="py-32 container mx-auto px-4 md:px-8">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Master Your Domain</h2>
                            <p className="text-lg text-muted-foreground">Select your target and begin your journey.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* UPSC Card */}
                            <Card className="group hover:border-primary/50 transition-colors flex flex-col h-full bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                        <BookOpen className="w-6 h-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl">UPSC Civil Services</CardTitle>
                                    <CardDescription className="text-base">
                                        Simulated exam environments and real-time performance analytics.
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="mt-auto pt-6">
                                    <a className="text-sm font-semibold text-primary flex items-center gap-2 group-hover:gap-3 transition-all" href="#">
                                        Practice Now <ArrowRight className="w-4 h-4" />
                                    </a>
                                </CardFooter>
                            </Card>

                            {/* JEE Card */}
                            <Card className="group hover:border-primary/50 transition-colors flex flex-col h-full bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                        <Calculator className="w-6 h-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl">JEE Main & Advanced</CardTitle>
                                    <CardDescription className="text-base">
                                        Daily quizzes and subject-specific mock drills to enhance problem-solving speed.
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="mt-auto pt-6">
                                    <a className="text-sm font-semibold text-primary flex items-center gap-2 group-hover:gap-3 transition-all" href="#">
                                        Practice Now <ArrowRight className="w-4 h-4" />
                                    </a>
                                </CardFooter>
                            </Card>

                            {/* NEET Card */}
                            <Card className="group hover:border-primary/50 transition-colors flex flex-col h-full bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                        <Microscope className="w-6 h-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl">NEET (UG)</CardTitle>
                                    <CardDescription className="text-base">
                                        In-depth biology, physics, and chemistry mastery designed for future medical professionals.
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="mt-auto pt-6">
                                    <a className="text-sm font-semibold text-primary flex items-center gap-2 group-hover:gap-3 transition-all" href="#">
                                        Practice Now <ArrowRight className="w-4 h-4" />
                                    </a>
                                </CardFooter>
                            </Card>
                        </div>
                    </section>

                    {/* Success Stories Section */}
                    <section className="py-32 bg-muted/30">
                        <div className="container mx-auto px-4 md:px-8">
                            <div className="text-center mb-16 space-y-4">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The Hall of Triumph</h2>
                                <p className="text-lg text-muted-foreground">Realizing potential through disciplined ambition.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Testimonial 1 */}
                                <Card className="relative overflow-hidden border-l-4 border-l-primary flex flex-col h-full">
                                    <Quote className="absolute top-6 right-6 w-8 h-8 text-muted-foreground/20" />
                                    <CardContent className="pt-8 flex-1 flex flex-col">
                                        <Avatar className="w-12 h-12 mb-6 border-2 border-primary/20">
                                            <AvatarFallback className="bg-primary/10 text-primary font-bold">AS</AvatarFallback>
                                        </Avatar>
                                        <p className="text-lg font-medium mb-8 flex-1">
                                            "The exam environment was exactly like the real UPSC prelims. It gave me the edge I needed."
                                        </p>
                                        <div>
                                            <p className="font-bold">Ananya Sharma</p>
                                            <p className="text-sm text-primary mt-1 font-medium">UPSC Rank: 42</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Testimonial 2 */}
                                <Card className="relative overflow-hidden border-l-4 border-l-primary flex flex-col h-full">
                                    <Quote className="absolute top-6 right-6 w-8 h-8 text-muted-foreground/20" />
                                    <CardContent className="pt-8 flex-1 flex flex-col">
                                        <Avatar className="w-12 h-12 mb-6 border-2 border-primary/20">
                                            <AvatarFallback className="bg-primary/10 text-primary font-bold">VS</AvatarFallback>
                                        </Avatar>
                                        <p className="text-lg font-medium mb-8 flex-1">
                                            "Daily quizzes kept my problem-solving speed at its peak for JEE. Absolutely essential."
                                        </p>
                                        <div>
                                            <p className="font-bold">Vikram Singh</p>
                                            <p className="text-sm text-primary mt-1 font-medium">IIT Bombay - CSE</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Testimonial 3 */}
                                <Card className="relative overflow-hidden border-l-4 border-l-primary flex flex-col h-full">
                                    <Quote className="absolute top-6 right-6 w-8 h-8 text-muted-foreground/20" />
                                    <CardContent className="pt-8 flex-1 flex flex-col">
                                        <Avatar className="w-12 h-12 mb-6 border-2 border-primary/20">
                                            <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFuQ0sfT5hv24kpSW1N0PDSP-EFhn9hKY2enkjxR_2FS4mrZCEe6poT931D7h3Lnn4i5wc0UIsvtiUgGFex4yU8Vo61B68S3rTMhBFFBct4SPBC6lrovvgIi-U-e94LUoRCLNTxAwP-xFfblFmObYX5IRVQdYb_J_sTwTC0lwS_LRRQ51Y-DpwvtxWODhqVgeT7gfjgabyO4dFT16GfWAY8Bcg3vL8F-yMa0tpYW2TfcP5716Nj9I3rUL3-4jifASdYBfjHuX0p8Q" />
                                            <AvatarFallback className="bg-primary/10 text-primary font-bold">RD</AvatarFallback>
                                        </Avatar>
                                        <p className="text-lg font-medium mb-8 flex-1">
                                            "The rigorous test series built my mental endurance for the actual exam day."
                                        </p>
                                        <div>
                                            <p className="font-bold">Rahul Desai</p>
                                            <p className="text-sm text-primary mt-1 font-medium">NEET Score: 710/720</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="border-t bg-muted/40 text-muted-foreground py-16">
                    <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="text-xl font-bold text-foreground mb-4">iPrepare</div>
                            <p className="text-sm max-w-sm mb-6">
                                Engineered for Excellence. Building the leaders, engineers, and doctors of tomorrow through disciplined ambition.
                            </p>
                            <p className="text-xs">
                                © 2024 iPrepare. All rights reserved.
                            </p>
                        </div>
                        <div className="flex flex-col md:items-end justify-start space-y-4">
                            <a className="text-sm hover:text-primary transition-colors" href="#">Privacy Policy</a>
                            <a className="text-sm hover:text-primary transition-colors" href="#">Terms of Service</a>
                            <a className="text-sm hover:text-primary transition-colors" href="#">Contact Support</a>
                            <a className="text-sm hover:text-primary transition-colors" href="#">Test Series</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}