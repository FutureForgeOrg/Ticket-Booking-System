import { NavLink } from "../ui/Navlink";

interface FooterColumnProps {
    title: string;
    links: string[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
    return (
        <div>
            <h4 className="text-sm font-semibold text-text-primary">
                {title}
            </h4>

            <ul className="mt-4 space-y-2">
                {links.map((link) => (
                    <li key={link}>
                        <NavLink label={link} />
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default function Footer() {
    return (
        <footer className="bg-surface border-t border-border">
            <div className="mx-auto max-w-7xl px-6 py-14">

                {/* TOP GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* BRAND */}
                    <div>
                        <div className="text-lg font-semibold tracking-tight">
                            <div className="flex justify-start">
                                <div className="flex items-center justify-center gap-2">
                                    <img
                                        src="/hero-logo.png"
                                        alt="Logo"
                                        className="size-12 image-contain"
                                    />
                                    <h1 className="">
                                        <span className="text-[#F4C430]">Go</span><span className="text-[#16A34A]">BookIt</span>
                                    </h1>
                                </div>

                            </div>
                        </div>
                        <p className="mt-3 text-sm text-text-secondary max-w-xs">
                            Book movie tickets effortlessly with a fast, reliable,
                            and premium experience.
                        </p>
                    </div>

                    {/* MOVIES */}
                    <FooterColumn
                        title="Movies"
                        links={["Now Showing", "Upcoming", "Top Rated", "IMAX"]}
                    />

                    {/* SUPPORT */}
                    <FooterColumn
                        title="Support"
                        links={["Help Center", "Contact Us", "Refund Policy"]}
                    />

                    {/* COMPANY */}
                    <FooterColumn
                        title="Company"
                        links={["About", "Careers", "Terms & Privacy"]}
                    />
                </div>

                {/* BOTTOM BAR */}
                <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-text-muted">
                        © {new Date().getFullYear()} CineBook. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4 text-text-muted text-sm">
                        <NavLink label="Privacy" />
                        <NavLink label="Terms" />
                        <NavLink label="Security" />
                    </div>
                </div>

            </div>
        </footer>
    );
}
