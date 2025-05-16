import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";
import { TiLocationArrow } from "react-icons/ti";

gsap.registerPlugin(ScrollTrigger);

// GitHub username to fetch data for
const GITHUB_USERNAME = "manaspros";

const GitHubCalendar = () => {
    const [calendarData, setCalendarData] = useState([]);
    const [hoveredDay, setHoveredDay] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [yearTotal, setYearTotal] = useState(0);
    const calendarRef = useRef(null);

    useEffect(() => {
        const fetchGitHubContributions = async () => {
            setIsLoading(true);
            try {
                // Using the correct API endpoint from the documentation
                const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch GitHub data: ${response.status}`);
                }

                const data = await response.json();
                console.log("GitHub API response:", data); // Debug

                if (!data || !data.contributions || !Array.isArray(data.contributions)) {
                    throw new Error('Invalid data format received from API');
                }

                // Store the year total
                const lastYear = Object.keys(data.total).find(year => year !== 'lastYear');
                setYearTotal(lastYear ? data.total[lastYear] : 0);

                // Transform the data from API format to our component format
                setCalendarData(data.contributions.map(item => ({
                    date: new Date(item.date),
                    count: item.count,
                    level: item.level
                })));
            } catch (err) {
                console.error('Error fetching GitHub data:', err);
                setError(err.message);
                // Fall back to demo data
                setCalendarData(generateDemoData());
            } finally {
                setIsLoading(false);
            }
        };

        fetchGitHubContributions();
    }, []);

    // Fallback generator function
    const generateDemoData = () => {
        const data = [];
        const now = new Date();
        const oneYearAgo = new Date(now);
        oneYearAgo.setFullYear(now.getFullYear() - 1);

        for (let d = new Date(oneYearAgo); d <= now; d.setDate(d.getDate() + 1)) {
            const isWeekend = d.getDay() === 0 || d.getDay() === 6;
            const randomFactor = isWeekend ? 0.5 : 0.8;
            const monthFactor = [0.7, 0.8, 0.9, 0.9, 0.8, 0.8, 0.9, 0.9, 0.9, 0.8, 0.8, 0.7][d.getMonth()];
            const probability = randomFactor * monthFactor;

            let count = 0;
            let level = 0;

            if (Math.random() < probability) {
                count = Math.floor(Math.random() * 10);
                level = Math.min(Math.floor(count / 2), 4);
            }

            data.push({
                date: new Date(new Date(d).setHours(0, 0, 0, 0)),
                count: count,
                level: level
            });
        }

        return data;
    };

    // Group data by weeks for the calendar display
    const weeks = [];
    if (calendarData.length > 0) {
        let currentWeek = [];
        let currentDay = calendarData[0].date.getDay();

        // Pad beginning with empty cells if needed
        for (let i = 0; i < currentDay; i++) {
            currentWeek.push(null);
        }

        calendarData.forEach(day => {
            const dayOfWeek = day.date.getDay();

            if (dayOfWeek === 0 && currentWeek.length > 0) {
                weeks.push(currentWeek);
                currentWeek = [];
            }

            currentWeek.push(day);

            if (day === calendarData[calendarData.length - 1]) {
                // Pad end with empty cells if needed
                while (currentWeek.length < 7) {
                    currentWeek.push(null);
                }
                weeks.push(currentWeek);
            }
        });
    }

    // Month labels positioning calculation
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const visibleMonths = [];

    if (calendarData.length > 0) {
        // Only show a subset of months to prevent overcrowding
        const firstMonth = calendarData[0].date.getMonth();
        const monthsToShow = [
            firstMonth,
            (firstMonth + 2) % 12,
            (firstMonth + 4) % 12,
            (firstMonth + 6) % 12,
            (firstMonth + 8) % 12,
            (firstMonth + 10) % 12,
        ];

        // Calculate positions for these months
        monthsToShow.forEach((month, index) => {
            visibleMonths.push({
                label: months[month],
                position: (index * 13) // Evenly space them
            });
        });
    }

    // Format date for display in tooltip
    const formatDate = (date) => {
        if (!date) return "";
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Get color class based on contribution level
    const getLevelColor = (level) => {
        const colors = [
            "bg-gray-800",       // level 0
            "bg-violet-900",     // level 1
            "bg-violet-700",     // level 2
            "bg-violet-500",     // level 3
            "bg-violet-300"      // level 4
        ];
        return colors[level || 0];
    };

    return (
        <section ref={calendarRef} id="github-activity" className="bg-black py-24">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-16 flex flex-col items-center">
                    <p className="font-general text-sm uppercase text-blue-50 md:text-[10px]">
                        my coding journey
                    </p>

                    <AnimatedTitle
                        title="G<b>i</b>tHub <br /> Act<b>i</b>vity"
                        containerClass="mt-5 !text-white pointer-events-none relative z-10"
                    />

                    <p className="mt-6 text-center max-w-lg font-circular-web text-blue-50/60">
                        A visualization of my consistent coding habits and contributions over the past year
                        {yearTotal > 0 && (
                            <span className="block mt-2 text-violet-300 font-bold">
                                {yearTotal} contributions in the last year
                            </span>
                        )}
                    </p>
                </div>

                <div className="calendar-container relative mt-10 rounded-lg border border-white/10 bg-black/80 backdrop-blur-sm p-6 md:p-8 shadow-xl">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="three-body">
                                <div className="three-body__dot"></div>
                                <div className="three-body__dot"></div>
                                <div className="three-body__dot"></div>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-400 py-8">
                            <p>Could not load GitHub data: {error}</p>
                            <p className="text-sm text-violet-300 mt-2">Using demo data instead</p>
                        </div>
                    ) : (
                        <>
                            {hoveredDay && (
                                <div className="pointer-events-none absolute -top-14 left-1/2 z-10 -translate-x-1/2 rounded-md bg-black/90 px-3 py-2 text-xs text-white shadow-lg">
                                    <p className="whitespace-nowrap">{hoveredDay.count} contributions on {formatDate(hoveredDay.date)}</p>
                                    <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
                                </div>
                            )}

                            {/* Month labels - Fixed positioning with even spacing */}
                            <div className="relative mb-10 w-full h-5">
                                {visibleMonths.map((month, i) => (
                                    <div
                                        key={i}
                                        className="absolute px-20 pl-64 top-0 text-sm font-medium text-violet-300"
                                        style={{ left: `${month.position}%` }}
                                    >
                                        {month.label}
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-start">
                                <div className="mr-3 text-base text-violet-300/70 flex flex-col h-auto justify-between py-1">
                                    <div>M</div>
                                    <div>T</div>
                                    <div>W</div>
                                    <div>T</div>
                                    <div>F</div>
                                    <div>S</div>
                                    <div>S</div>
                                </div>

                                {/* Calendar grid - Improved container */}
                                <div className="overflow-x-auto w-full">
                                    <div className="flex gap-[6px] pb-4 min-w-max justify-start md:justify-center">
                                        {weeks.map((week, weekIndex) => (
                                            <div key={weekIndex} className="flex flex-col gap-[6px]">
                                                {week.map((day, dayIndex) => (
                                                    <div
                                                        key={`${weekIndex}-${dayIndex}`}
                                                        className={`contribution-cell h-4 w-4 md:h-5 md:w-5 rounded-sm transition-all duration-200 ${day ? getLevelColor(day.level) : 'bg-gray-900'
                                                            } ${hoveredDay && day && hoveredDay.date.toDateString() === day.date.toDateString()
                                                                ? 'scale-125 ring-1 ring-white shadow-glow'
                                                                : 'hover:scale-110'
                                                            }`}
                                                        onMouseEnter={() => day && setHoveredDay({
                                                            date: day.date,
                                                            count: day.count
                                                        })}
                                                        onMouseLeave={() => setHoveredDay(null)}
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Legend - bigger items */}
                            <div className="mt-10 flex items-center justify-center gap-4 text-sm text-white">
                                <span className="font-medium">Less</span>
                                <div className="bg-gray-900 h-4 w-4 rounded-sm border border-gray-700"></div>
                                <div className="bg-violet-900 h-4 w-4 rounded-sm"></div>
                                <div className="bg-violet-700 h-4 w-4 rounded-sm"></div>
                                <div className="bg-violet-500 h-4 w-4 rounded-sm"></div>
                                <div className="bg-violet-300 h-4 w-4 rounded-sm"></div>
                                <span className="font-medium">More</span>
                            </div>
                        </>
                    )}

                    {/* GitHub link */}
                    <div className="mt-12 flex justify-center">
                        <a
                            href={`https://github.com/${GITHUB_USERNAME}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative z-10 flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-violet-300 px-7 py-3 text-black"
                        >
                            <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
                                <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                                    VIEW ON GITHUB
                                </div>
                                <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                                    VIEW ON GITHUB
                                </div>
                            </span>
                            <TiLocationArrow />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GitHubCalendar;
