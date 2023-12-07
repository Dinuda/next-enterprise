
// These styles apply to every route in the application
import "app/globals.css"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
// import { Provider } from "react-redux"
import Header from "components/header/header"
// import { store } from "lib/state/auth/store"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const title = "Next.js Prisma Postgres Auth Starter"
const description =
  "This is a Next.js starter kit that uses Next-Auth for simple email + password login and a Postgres database to persist the data."

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
  creator: "shadcn",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable} suppressHydrationWarning={true}>
          <Suspense fallback="Loading...">
            <Header />
          </Suspense>
          {children}
      </body>
    </html>
  )
}

export default RootLayout
