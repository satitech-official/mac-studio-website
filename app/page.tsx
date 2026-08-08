import MacStudioSite from "../components/MacStudioSite";

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ArtSchool"],
  name: "MAC Studio",
  description: "Art classes, creative workshops and hands-on art experiences for children and adults in Sector 57, Gurugram.",
  telephone: "+91 7838116352",
  areaServed: {
    "@type": "Place",
    name: "Sector 57, Gurugram, Haryana, India",
  },
  sameAs: [
    "https://www.facebook.com/tasmacstudio/",
    "https://www.instagram.com/tasmacstudio/",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MacStudioSite />
    </>
  );
}
