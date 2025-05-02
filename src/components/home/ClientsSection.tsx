// components/ClientsSection.tsx
import { Marquee } from "@/components/ui/marquee";

// Client logos array
const clientLogos = [
  {
    name: "Bloom Egypt",
    img: "/pics/Bloom.jpg",
  },
  {
    name: "MinsteryOfTrade",
    img: "/pics/MinstryOfTrade.jpg",
  },
  {
    name: "Cellnet",
    img: "/pics/Cellnet.jpg",
  },
  {
    name: "EGBANK",
    img: "/pics/EGBANK.jpg",
  },
  {
    name: "FOREX",
    img: "/pics/Forex.jpg",
  },
  {
    name: "Misr Insurance",
    img: "/pics/MisrInsurance.jpg",
  },
];

// Simplified logo display
const Logo = ({
  img,
  name,
}: {
  img: string;
  name: string;
}) => {
  return (
    <img
      className="h-16 max-w-full object-contain mx-8"
      alt={`${name} logo`}
      src={img}
    />
  );
};

const ClientsSection = () => {
  return (
    <section id="clients" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading organizations across various industries in Egypt
          </p>
        </div>
        
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden h-40">
          <Marquee pauseOnHover className="[--duration:15s] flex-nowrap">
            {clientLogos.map((logo) => (
              <Logo key={logo.name} {...logo} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background hidden md:block"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background hidden md:block"></div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;