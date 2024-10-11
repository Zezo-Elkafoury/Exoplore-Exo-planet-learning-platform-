import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import CustomCursor from "@/components/CustomCursor";
import { Exo } from 'next/font/google'
import Header from '@/components/Header'
const exo_init = Exo({ subsets: ['latin'] ,
  weight: ['400']
})


export const metadata = {
  title: "Explore Exoplantes",
  description: "Explore exoplanets with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${exo_init.className}`}
      >
        <Header />
        <Analytics />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
