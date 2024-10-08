import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
	title: 'Next-Kart',
	description: 'An ecommerce platform built with Next.js',
}

const RootLayout = ({children}: Readonly<{children: React.ReactNode}>) =>{
	return (
		<html lang="en">
			<body className={cn('font-sans antialiased', inter.variable)}>{children}</body>
		</html>
	)
}

export default RootLayout