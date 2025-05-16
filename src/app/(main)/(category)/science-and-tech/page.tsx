import SubPage from "@/components/SubPage";
import { Metadata } from "next";

const IndiaPage = async () => {
  return (
    <div>
     

      <SubPage
        title="Science and Tech"
        category="science-and-tech"
        links={[
          {
            label: "Science and Tech",
          },
        ]}
      />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Latest Science & Tech Innovations You Should Know - Eastern Mirror",
  description:
    "Stay updated with the latest breakthroughs in science and technology. Explore trends, discoveries, and innovations shaping the future.",
  keywords: [
    "science news",
    "technology updates",
    "latest innovations",
    "future tech",
    "scientific discoveries",
    "tech trends",
    "emerging technologies",
  ],
  openGraph: {
    url: "https://www.easternmirrornagaland.com/science-and-tech",
    title: "Latest Science & Tech Innovations You Should Know - Eastern Mirror",
    description:
      "Stay updated with the latest breakthroughs in science and technology. Explore trends, discoveries, and innovations shaping the future.",
  },
};
export const dynamic = 'force-dynamic';
export default IndiaPage;
