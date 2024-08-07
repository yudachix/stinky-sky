import App from "@/components/app";
import { FACE_COLOR } from "@/consts/color";
import { DESCRIPTION, TITLE } from "@/consts/site";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

const baseUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL as string);

export const viewport: Viewport = {
  themeColor: FACE_COLOR,
};

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    url: baseUrl.href,
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        alt: "",
        width: 1200,
        height: 630,
        type: "image/png",
        url: "/stinky-sky/images/ogp-image-1200x630.png",
      },
    ],
  },
  icons: {
    apple: {
      sizes: "180x180",
      url: "/stinky-sky/favicons/apple-touch-icon.png",
    },
    icon: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/stinky-sky/favicons/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "194x194",
        url: "/stinky-sky/favicons/favicon-194x194.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/stinky-sky/favicons/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/stinky-sky/favicons/favicon-16x16.png",
      },
      {
        rel: "shortcut icon",
        url: "/stinky-sky/favicons/favicon.ico",
      },
    ],
  },
  manifest: "/stinky-sky/favicons/site.webmanifest",
  other: {
    "msapplication-TileColor": "#da532c",
    "msapplication-TileImage": "/stinky-sky/favicons/mstile-144x144.png",
    "msapplication-config": "/stinky-sky/favicons/browserconfig.xml",
  },
};

export default function Page(): ReactNode {
  return <App />;
}
