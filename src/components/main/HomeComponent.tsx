"use client";

import { TRENDING } from "@/static/data";
import axiosServer from "@/utils/axiosServer";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import Section1Skeleton from "../skeleton/Section1Skeleton";
import Section1 from "./sections/Section1";
import Event from "./Event";
import Section2 from "./sections/Section2";
import Section4 from "./sections/section4";
import Section3 from "./sections/Section3";
import VideoSection from "./sections/VideoSection";
const queryClient = new QueryClient();

export default function HomePage() {
    return (
        <QueryClientProvider client={queryClient}>
            <HomeCompoent />
        </QueryClientProvider>
    )
}

function HomeCompoent() {
    const fetchCategoryArticles = async (category: string, limit?: number) => {
        const { data } = await axiosServer.get(
            `/article/all?category=${category}&limit=${limit}&sort=createdAt`
        );
        return data.articles;
    };

    const { isPending, data: topNews } = useQuery({
        queryKey: ["home-top-news"],
        queryFn: () => fetchCategoryArticles("top-news", 4),
        staleTime: 60000,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const { isPending: eventLoading, data: events } = useQuery({
        queryKey: ["home-events"],
        queryFn: async () => {
            const { data } = await axiosServer.get(`/event?status=ongoing&limit=5`);
            return data?.events;
        },
        staleTime: 60000,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const { isPending: nagalandLoading, data: nagaland } = useQuery({
        queryKey: ["home-nagaland"],
        queryFn: () => fetchCategoryArticles("nagaland", 4),
        staleTime: 60000,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const { isPending: indiaLoading, data: india } = useQuery({
        queryKey: ["home-india"],
        queryFn: () => fetchCategoryArticles("india", 4),
        staleTime: 60000,
        refetchOnWindowFocus: false,
        retry: 1,
    });
    const { isPending: exclusiveLoading, data: emExclusive } = useQuery({
        queryKey: ["home-em-exclusive"],
        queryFn: () => fetchCategoryArticles("exclusive", 4),
        staleTime: 60000,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const { isPending: editorsPickLoading, data: editorsPick } = useQuery({
        queryKey: ["home-editorsPick"],
        queryFn: () => fetchCategoryArticles("editor's-pick", 4),
        staleTime: 60000,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const { isPending: educationLoading, data: education } = useQuery({
        queryKey: ["home-education"],
        queryFn: () => fetchCategoryArticles("education", 4),
        staleTime: 60000,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const { isPending: artLoading, data: artsEntertainment } = useQuery({
        queryKey: ["home-artsEntertainment"],
        queryFn: () => fetchCategoryArticles("arts-and-entertainment", 5),
        staleTime: 60000,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const { isPending: worldLoading, data: world } = useQuery({
        queryKey: ["home-world"],
        queryFn: () => fetchCategoryArticles("world", 5),
        staleTime: 60000,
        refetchOnWindowFocus: false,
        retry: 1,
    });
    const { isPending: regionLoading, data: region } = useQuery({
        queryKey: ["home-region"],
        queryFn: () => fetchCategoryArticles("region", 4),
        staleTime: 60000,
        refetchOnWindowFocus: false,
        retry: 1,
    });
    const { isPending: businessLoading, data: business } = useQuery({
        queryKey: ["home-business"],
        queryFn: () => fetchCategoryArticles("business", 4),
        staleTime: 60000,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const { isPending: sportsLoading, data: sports } = useQuery({
        queryKey: ["home-sports"],
        queryFn: () => fetchCategoryArticles("sports", 5),
        staleTime: 60000,
        refetchOnWindowFocus: false,
        retry: 1,
    });

    const { isPending: videoLoading, data: videos } = useQuery({
        queryKey: ["home-videos"],
        queryFn: async () => {
            const { data } = await axiosServer.get(`/video?limit=4`);
            return data.videos;
        },
        staleTime: 60000,
        refetchOnWindowFocus: false,
        retry: 1,
    });


    return (
        <div className="min-h-screen">
            {isPending ? (
                <Section1Skeleton />
            ) : (
                <Section1 data={topNews || []} heading="TOP NEWS" link={"/top-news"} />
            )}

            {events?.map(
                (
                    data: {
                        articles: {
                            thumbnail: string;
                            category: string;
                            title: string;
                            author: string;
                            date: string;
                            slug: string;
                        }[];
                        slug: string;
                        title: string;
                    },
                    i: number
                ) => (
                    <Event
                        key={i}
                        slug={data?.slug}
                        articles={data?.articles || []}
                        title={data?.title || ""}
                    />
                )
            )}

            {nagalandLoading ? (
                <Section1Skeleton />
            ) : (
                <Section2 data={nagaland || []} heading="NAGALAND" link={"/nagaland"} />
            )}

            {exclusiveLoading ? (
                <Section1Skeleton />
            ) : (
                <Section4
                    data={emExclusive || []}
                    heading="EM EXCLUSIVE"
                    link={"/exclusive"}
                />
            )}

            {indiaLoading ? (
                <Section1Skeleton />
            ) : (
                <Section1 data={india || []} heading="INDIA" link="/india" />
            )}

            {editorsPickLoading ? (
                <Section1Skeleton />
            ) : (
                <Section4
                    data={editorsPick || []}
                    heading="EDITOR’S PICK"
                    link="/editors-pick"
                />
            )}

            {artLoading ? (
                <Section1Skeleton />
            ) : (
                <Section3
                    data={artsEntertainment || []}
                    heading="ART & ENTERTAINMENT"
                    trending={TRENDING}
                    link="/arts-and-entertainment"
                />
            )}

            {worldLoading ? (
                <Section1Skeleton />
            ) : (
                <Section1 data={world || []} heading="WORLD" link="/world" />
            )}

            {regionLoading ? (
                <Section1Skeleton />
            ) : (
                <Section1 data={region || []} heading="REGION" link="/region" />
            )}

            {businessLoading ? (
                <Section1Skeleton />
            ) : (
                <Section1 data={business || []} heading="Business" link="/business" />
            )}
            {educationLoading ? (
                <Section1Skeleton />
            ) : (
                <Section4
                    data={education || []}
                    heading="Education"
                    link="/education"
                />
            )}
            {sportsLoading ? (
                <Section1Skeleton />
            ) : (
                <Section3 data={sports || []} heading="SPORTS NEWS" link="/sports" />
            )}
            {videoLoading ? (
                <Section1Skeleton />
            ) : (
                <VideoSection data={videos || []} heading="VIDEOS" />
            )}
        </div>
    );
}
