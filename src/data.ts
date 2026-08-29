export interface TeamContact {
  id: string;
  name: string;
  phone: string;
  displayPhone: string;
  url: string;
  leadTime?: string;
}

export const PREFILLED_MESSAGE = "Hi, I want to join the EventsKonnectGH Sales Team and have some questions.";

export const WHATSAPP_CONTACTS: TeamContact[] = [
  {
    id: "team-1",
    name: "Speak to the recruitment team advisor",
    phone: "233554700904",
    displayPhone: "+233 55 470 0904",
    url: `https://wa.me/233554700904?text=${encodeURIComponent(PREFILLED_MESSAGE)}`,
    leadTime: "Online now • Fast response"
  },
  {
    id: "team-2",
    name: "Secondary recruitment advisor",
    phone: "233539733353",
    displayPhone: "+233 53 973 3353",
    url: `https://wa.me/233539733353?text=${encodeURIComponent(PREFILLED_MESSAGE)}`,
    leadTime: "Online now • Dedicated agent"
  }
];

export const PRIMARY_STICKY_WHATSAPP = `https://wa.me/233554700904?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;

export const OFFICIAL_WEBSITE_URL = "https://www.eventskonnectgh.com";

export const VENDOR_CATEGORIES = [
  {
    name: "Photography & Videography",
    description: "Capturing memorable moments across weddings, corporate events & parties.",
    icon: "camera"
  },
  {
    name: "Catering & Beverages",
    description: "Authentic local dishes, gourmet culinary experts, drinks & mixology.",
    icon: "utensils"
  },
  {
    name: "Decor & Event Styling",
    description: "Stage design, floral arrangements, lighting & ambient event setups.",
    icon: "sparkles"
  },
  {
    name: "Entertainment & DJs",
    description: "Top DJs, MCs, live bands and sound systems keeping celebrations vibrant.",
    icon: "music"
  },
  {
    name: "Venues & Spaces",
    description: "Banquet halls, gardens, beaches and contemporary event spaces across Ghana.",
    icon: "building"
  },
  {
    name: "Event Services & Planning",
    description: "Coordinators, security, ushering, rental equipment and production.",
    icon: "users"
  }
];

export const ROLE_RESPONSIBILITIES = [
  {
    title: "Introduce the platform",
    description: "Introduce EventsKonnectGH to event vendors and service providers across Ghana.",
    badge: "Outreach"
  },
  {
    title: "Explain the benefits",
    description: "Help quality providers understand how EventsKonnectGH can support their business growth.",
    badge: "Value"
  },
  {
    title: "Support registrations",
    description: "Guide interested businesses smoothly through the platform registration process.",
    badge: "Guidance"
  },
  {
    title: "Represent the brand",
    description: "Represent EventsKonnectGH in a professional, courteous and positive way.",
    badge: "Ambassador"
  },
  {
    title: "Build relationships",
    description: "Develop strong, long-term relationships within Ghana’s vibrant events industry.",
    badge: "Network"
  }
];
