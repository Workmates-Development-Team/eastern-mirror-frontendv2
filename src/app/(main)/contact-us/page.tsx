import axiosServer from "@/utils/axiosServer";

interface ContactResponse {
  letterToEditor: string;
  adQuery: string;
  ePaperQuery: string;
  customerCare: string;
  officeAddress: string;
  refundsQueries: string;
}

let cachedContactInfro: ContactResponse | null = null;
let cacheTimestamp: number | null = null;
const CACHE_EXPIRY_TIME = 1 * 60 * 1000;

const getContactInfo = async (): Promise<ContactResponse> => {
  const { data } = await axiosServer.get(`/contact`);
  return data?.contact;
};

async function getCacheContactInfo(): Promise<ContactResponse> {
  const currentTime = Date.now();

  if (cachedContactInfro && cacheTimestamp && (currentTime - cacheTimestamp) < CACHE_EXPIRY_TIME) {
    return cachedContactInfro;
  }

  const data = await getContactInfo();
  cachedContactInfro = data;
  cacheTimestamp = currentTime;
  return data;
}



const ContactUs = async () => {
  const contact = await getCacheContactInfo()

  if (!contact) {
    return (
      <div>
        <p>Unable to load contact information.</p>
      </div>
    );
  }

  return (
    <div>
      <section className="">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8">
            <div className="">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
                Contact Us
              </h2>

              <p className="mb-3 mt-5 text-gray-600 text-lg text-center">
                Please email, clearly mentioning the subject.
              </p>

              <hr />

              <div className="flex justify-center mt-10">
                <div className="flex flex-col gap-4 text-center">
                  <p>
                    <strong>Letters to the Editor: </strong>{" "}
                    {contact.letterToEditor}
                  </p>
                  <p>
                    <strong>Advertisements Queries: </strong> {contact.adQuery}
                  </p>
                  <p>
                    <span>
                      <strong>e-Paper related Queries</strong>:
                      {contact.ePaperQuery}
                    </span>
                  </p>
                  <p>
                    <strong>Contact us (Customer care)</strong>
                    <a
                      href={`https://api.whatsapp.com/send?phone=${contact.customerCare}&amp;app=facebook&amp;entry_point=page_cta&amp;fbclid=IwAR3n5J3MkFSWtdIS83GxN9WM9f4uQ3oY5VtQDFyqc7LImEZ7MkuFfGYuM8c`}
                      target="_blank"
                      rel="nofollow noopener"
                    >
                      {contact.customerCare}
                    </a>
                  </p>
                  <p>
                    <strong>Office</strong>: {contact.officeAddress}
                  </p>
                  <p>
                    <strong>Refunds/Subscription Queries</strong>:{" "}
                    <a href={`mailto:${contact.refundsQueries}`}>
                      {contact.refundsQueries}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};



export const dynamic = 'force-dynamic';

export default ContactUs;
