import type { MediaItem, Pillar } from "@/types";
import previousConferencePoster from "@/data/AIAC_images/image16.jpg";
import aboutEventPoster from "@/data/AIAC_images/image20.jpg";
import heroEventPoster from "@/data/AIAC_images/image4.jpg";

interface HomeVideoMedia {
  videoSrc: string | null;
  posterSrc: string;
  posterAlt: string;
  width: number;
  height: number;
  objectPosition: string;
}

export const homeVideoMedia = {
  hero: {
    // Add the file to frontend/public/media, then set this to "/media/aiaiac-hero.mp4".
    videoSrc: null,
    posterSrc: heroEventPoster,
    posterAlt: "AIAIAC West Africa panel discussion",
    width: 1968,
    height: 1090,
    objectPosition: "center 52%",
  },
  about: {
    // Add the file to frontend/public/media, then set this to "/media/aiaiac-event.mp4".
    videoSrc: null,
    posterSrc: aboutEventPoster,
    posterAlt: "AIAIAC West Africa delegates gathered at a previous edition",
    width: 1968,
    height: 1076,
    objectPosition: "center",
  },
} satisfies Record<"hero" | "about", HomeVideoMedia>;

interface PreviousConferenceVideoMedia {
  videoSrc: string | null;
  captionSrc: string | null;
  posterSrc: string;
  posterAlt: string;
  width: number;
  height: number;
  objectPosition: string;
}

export const previousConferenceVideoMedia = {
  // Add the approved file at frontend/public/media/aiaiac-previous-conference-highlights.mp4,
  // then set this to "/media/aiaiac-previous-conference-highlights.mp4".
  videoSrc: null,
  // Set this to "/media/aiaiac-previous-conference-highlights.en.vtt" when captions are ready.
  captionSrc: null,
  posterSrc: previousConferencePoster,
  posterAlt: "A speaker presenting on the AIAIAC stage at a previous conference edition",
  width: 1968,
  height: 1158,
  objectPosition: "center",
} satisfies PreviousConferenceVideoMedia;

const img = (id: string) => `https://framerusercontent.com/images/${id}`;

export const heroSlides = [
  {
    id: "infrastructure",
    src: img("AHacUxcDBtDlbJTmekwr2v6k0.jpg"),
    label: "Offshore integrity",
    caption: "Guarding the infrastructure that powers West Africa",
  },
  {
    id: "conference",
    src: img("fJSa4NF3nBmI5FDcnYj6nnowxc.jpeg"),
    label: "Two conference halls",
    caption: "Asset Integrity · Automation & Cybersecurity",
  },
  {
    id: "exhibition",
    src: img("d15eflhOZEtAkPzPqgQVutQ3t4.jpeg"),
    label: "Exhibition floor",
    caption: "Technology transforming asset-intensive operations",
  },
  {
    id: "control-room",
    src: img("gCnrfwmhoDr5hftW7fanjxWvNgQ.png"),
    label: "OT cybersecurity",
    caption: "Defending industrial control systems",
  },
];

export const exhibitionImage = img("d15eflhOZEtAkPzPqgQVutQ3t4.jpeg");

export const mediaItems: MediaItem[] = [
  {
    id: "m1",
    src: img("fJSa4NF3nBmI5FDcnYj6nnowxc.jpeg"),
    caption: "Plenary sessions — technical presentations and panel discussions",
    width: 1344,
    height: 768,
  },
  {
    id: "m2",
    src: img("d15eflhOZEtAkPzPqgQVutQ3t4.jpeg"),
    caption: "Exhibition hall — the latest technologies transforming the industry",
    width: 832,
    height: 1248,
  },
  {
    id: "m3",
    src: img("gCnrfwmhoDr5hftW7fanjxWvNgQ.png"),
    caption: "Automation & OT cybersecurity operations",
    width: 864,
    height: 1152,
  },
  {
    id: "m4",
    src: img("e94M1gByU4vP4wlNJClbVuf4ik.png"),
    caption: "Technical sessions and knowledge exchange",
    width: 864,
    height: 1152,
  },
  {
    id: "m5",
    src: img("AHacUxcDBtDlbJTmekwr2v6k0.jpg"),
    caption: "Critical energy infrastructure across the region",
    width: 1558,
    height: 1112,
  },
];

export const pillars: Pillar[] = [
  {
    index: "01",
    title: "Asset Integrity",
    description:
      "Integrity management, corrosion control and process safety — inspection and monitoring technologies keeping assets safe and reliable.",
    image: img("AHacUxcDBtDlbJTmekwr2v6k0.jpg"),
  },
  {
    index: "02",
    title: "Artificial Intelligence",
    description:
      "Digital twins and predictive maintenance turning operational data into earlier, better decisions across asset-intensive operations.",
    image: img("gCnrfwmhoDr5hftW7fanjxWvNgQ.png"),
  },
  {
    index: "03",
    title: "Automation",
    description:
      "IIoT and SCADA systems, process control engineering and the automation stack driving operational performance.",
    image: img("e94M1gByU4vP4wlNJClbVuf4ik.png"),
  },
  {
    index: "04",
    title: "Cybersecurity",
    description:
      "OT cyber defense frameworks, regulatory standards and industrial resilience for critical infrastructure.",
    image: img("fJSa4NF3nBmI5FDcnYj6nnowxc.jpeg"),
  },
];
