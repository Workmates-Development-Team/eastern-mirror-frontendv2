import {
  BookImage,
  Contact,
  GalleryThumbnails,
  Home,
  Newspaper,
  Settings,
  SquarePen,
  User,
  Users,
  Video,
} from "lucide-react";
import { FcAdvertising } from "react-icons/fc";

export const ADMIN_SIDEBAR_LINKS = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: () => <Home className="h-4 w-4" />,
  },

  {
    label: "Post",
    path: "/post",
    icon: () => <Newspaper className="h-4 w-4" />,
    subLinks: [
      {
        label: "All Posts",
        path: "/em-admin/post",
      },
      {
        label: "Add New Post",
        path: "/em-admin/post/add-post",
      },
      {
        label: "Categories",
        path: "/em-admin/post/categories",
      },
    ],
  },
  {
    label: "Videos",
    path: "/videos",
    icon: () => <Video className="h-4 w-4" />,
  },
  {
    label: "Events",
    path: "/events",
    icon: () => <BookImage className="h-4 w-4" />,
  },
  {
    label: "Advertisement",
    path: "/advertisement",
    icon: () => <FcAdvertising className="h-4 w-4" />,
  },
  {
    label: "Authors",
    path: "/authors",
    icon: () => <SquarePen className="h-4 w-4" />,
  },
  {
    label: "Users",
    path: "/users",
    icon: () => <Users className="h-4 w-4" />,
  },
  {
    label: "Gallery",
    path: "/gallery",
    icon: () => <GalleryThumbnails className="h-4 w-4" />,
  },
  {
    label: "Contact",
    path: "/contact",
    icon: () => <Contact className="h-4 w-4" />,
  },
  
];

export const NAVBAR_LINKS = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "nagaland",
    href: "/nagaland",
    subLinks: [
      {
        label: "Chümoukedima",
        href: "/chumoukedima",
      },
      {
        label: "Dimapur",
        href: "/dimapur",
      },
      {
        label: "Kiphire",
        href: "/kiphire",
      },
      {
        label: "Kohima",
        href: "/kohima",
      },
      {
        label: "Longleng",
        href: "/longleng",
      },
      {
        label: "Meluri",
        href: "/meluri",
      },
      {
        label: "Mokokchung",
        href: "/mokokchung",
      },
      {
        label: "Mon",
        href: "/mon",
      },
      {
        label: "Niuland",
        href: "/niuland",
      },
      {
        label: "Noklak",
        href: "/noklak",
      },
      {
        label: "Peren",
        href: "/peren",
      },
      {
        label: "Phek",
        href: "/phek",
      },
      {
        label: "Shamator",
        href: "/shamator",
      },
      {
        label: "Tseminyü",
        href: "/tseminyu",
      },
      {
        label: "Tuensang",
        href: "/tuensang",
      },
      {
        label: "Wokha",
        href: "/wokha",
      },
      {
        label: "Zünheboto",
        href: "/zunheboto",
      },
    ],
  },

  {
    label: "India",
    href: "/india",
  },
  {
    label: "World",
    href: "/world",
  },

  {
    label: "opinion",
    href: "/opinion",
    subLinks: [
      {
        label: "Editorial",
        href: "/editorial",
      },
      {
        label: "Views and Reviews",
        href: "/views-and-reviews",
      },
      {
        label: "Op-Ed",
        href: "/op-ed",
      },
      {
        label: "Letter to Editor",
        href: "/letter-to-editor",
      },
      {
        label: "Book Reviews",
        href: "/book-reviews",
      },
    ],
  },

  {
    label: "sports",
    href: "/sports",
  },

  {
    label: "science and tech",
    href: "/science-and-tech",
  },

  {
    label: "arts and entertainment",
    href: "/arts-and-entertainment",
  },

  {
    label: "More",
    href: "/education",
    subLinks: [
    
      {
        label: "Education",
        href: "/education",
      },
      {
        label: "Business",
        href: "/business",
      },
      {
        label: "Health",
        href: "/health",
      },
    ],
  },
];

export const FOOTER_LINKS = [
  {
    section: "Popular Sections",
    links: [
      {
        label: "EM Exclusive",
        href: "/exclusive",
      },
      {
        label: "Education",
        href: "/education",
      },
      {
        label: "Editor's Pick",
        href: "/editors-pick",
      },
      {
        label: "Health",
        href: "/health",
      },
    ],
  },
  {
    section: "News",
    path: "/news",
    links: [
      {
        label: "World",
        href: "/world",
      },
      {
        label: "India",
        href: "/india",
      },
  
    ],
  },
  {
    section: "OPINIONS",
    links: [
      {
        label: "Editorial",
        href: "/opinion/editorial",
      },
      {
        label: "Views & Reviews",
        href: "/opinion/views-and-reviews",
      },
      {
        label: "Op-Ed",
        href: "/opinion/op-ed",
      },
      {
        label: "Book Reviews",
        href: "/opinion/book-reviews",
      },
    ],
  },
  // {
  //   section: "Entertainment",
  //   links: [
  //     {
  //       label: "Rhythm of Love",
  //       href: "/rhythm-of-love",
  //     },
  //     {
  //       label: "Music",
  //       href: "/music",
  //     },
  //     {
  //       label: "Film",
  //       href: "/film",
  //     },
  //   ],
  // },
  {
    section: "Others",
    links: [
      {
        label: "Videos",
        href: "/videos",
      },
      {
        label: "Business",
        href: "/business",
      },
      {
        label: "Science and Tech",
        href: "/science-and-tech",
      },
      {
        label: "Sports",
        href: "/sports",
      },
    ],
  },

  {
    section: "Eastern Mirror",
    links: [
      {
        label: "About Us",
        href: "/about-us",
      },
      {
        label: "Contact Us",
        href: "/contact-us",
      },
      // {
      //   label: "Advertise with Us",
      //   href: "/advertisment",
      // },
    ],
  },
];
