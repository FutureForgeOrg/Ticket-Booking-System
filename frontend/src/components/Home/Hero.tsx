import Button from "../ui/Button";

export default function Hero() {
    return (
        <section className="bg-canvas">
            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-text-primary">
                            Book Movie Tickets
                            <br />
                            <span className="text-primary">
                                Effortlessly
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-text-secondary max-w-xl">
                            Discover movies, choose your seats, and book tickets in seconds.
                            A smooth, reliable, and premium ticket booking experience.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Button size="lg">
                                Book Tickets
                            </Button>

                            <Button variant="outline" size="lg">
                                Browse Movies
                            </Button>
                        </div>
                    </div>

                    {/* RIGHT VISUAL */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-primary-soft rounded-3xl blur-3xl" />

                        <img
                            src="/hero-brand-logo.svg"
                            alt="Movie ticket booking"
                            className="relative w-full max-w-lg mx-auto"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
