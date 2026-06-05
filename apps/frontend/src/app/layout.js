import { Geist, Geist_Mono } from "next/font/google";
import { localFont } from "next/font/local";
import "./globals.css";


// FONTS DO GOOGLE
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// FONTES CUSTOMIZADAS (5 fontes disponíveis)
const deterioratHand = localFont({
  src: "./fonts/deteriorat_hand/DeterioratHand.otf",
  variable: "--font-deteriorat",
});

const fantasiColour = localFont({
  src: "./fonts/fantasi_colour/FantasiColour.otf",
  variable: "--font-fantasi",
});

const hopeTake = localFont({
  src: "./fonts/hope_take/Hope Take.otf",
  variable: "--font-hope",
});

const lostWritting = localFont({
  src: "./fonts/lost_writting/Lost Writting.otf",
  variable: "--font-lost",
});

const myheartFont = localFont({
  src: "./fonts/myheart_2/myheart.otf",
  variable: "--font-myheart",
});

export const metadata = {
  title: "SUDS",
  description: "O controle da sua jornada de saúde mental na palma da sua mão",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${deterioratHand.variable} ${fantasiColour.variable} ${hopeTake.variable} ${lostWritting.variable} ${myheartFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
