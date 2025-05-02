import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";

// Client logos array - Replace with your actual client logos
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

// Simplified logo display - removed card container and increased size
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

export default function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden h-40">
      <Marquee pauseOnHover className="[--duration:15s] flex-nowrap">
        {clientLogos.map((logo) => (
          <Logo key={logo.name} {...logo} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background hidden md:block"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background hidden md:block"></div>
    </div>
  );
}