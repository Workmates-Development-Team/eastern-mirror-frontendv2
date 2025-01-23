import Link from "next/link";
import React from "react";

const AboutUs = () => {
  return (
    <div>
      <section className="">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8">
            <div className="">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
                About Us
              </h2>
              <p className="mt-4 text-gray-600 text-lg">
                Eastern Mirror is a premier source for the latest news and
                insights from the Northeast region of India. &apos;Journalism for
                Justice&apos; is the principle behind which we firmly stand and we
                provide a fair and unbiased platform for issues that matter and
                impact our readers. Established with a commitment to
                journalistic integrity, we aim to provide our readers with
                verified, timely, and engaging content covering a wide array of
                topics including politics, culture, sports and more.
              </p>
              <p className="mt-4 text-gray-600 text-lg">
                At Eastern Mirror, we believe in the power of storytelling and
                strive to highlight the rich heritage and diverse narratives of
                the Northeast. Our dedicated team of journalists and
                contributors work tirelessly to bring you in-depth articles,
                interviews and analysis that reflect the unique perspectives of
                the region’s vibrant communities.
              </p>
              <p className="mt-4 text-gray-600 text-lg">
                Eastern Mirror was launched by the Nagaland Free Press Society
                on 8 August 2002. Our daily newspaper is printed and published
                by Vimenuo Keditsu at Eastern Publication House located in
                Dimapur, Nagaland.
              </p>
              <p className="mt-4 text-gray-600 text-lg">
                Eastern Mirror caters to an ever-growing audience from across
                the globe through digital versions, including our{" "}
                <Link href="http://www.easternmirrornagaland.com/">
                  website
                </Link>
                , e-paper, and has a strong presence on various social media
                platforms including Instagram, YouTube, Twitter and Facebook.
              </p>
              <p className="mt-4 text-gray-600 text-lg">
                Join us on our journey as we illuminate the voices and stories
                that define the Northeast.
              </p>
              <p className="mt-4 text-gray-600 text-lg">
                Thank you for visiting us!
              </p>
              
            </div>
            {/* <div className="mt-12 md:mt-0">
                <img src="https://images.unsplash.com/photo-1531973576160-7125cd663d86" alt="About Us Image" className="object-cover rounded-lg shadow-md" />
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
