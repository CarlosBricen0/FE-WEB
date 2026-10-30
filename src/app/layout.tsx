import type { Metadata } from "next";

import "next-cloudinary/dist/cld-video-player.css";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Footer from "@/components/Footer";
import TanStackProvider from "@/providers/TanStackProvider";
import { Toaster } from "components-front-end/creator/ui/toaster";



export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "OnlyHorse - E-commerce Store",
	description:
		"OnlyHorse is a platform for horse lovers which includes a wide range of exclusive content and merchandise.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className="font-sans">
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<div className='h-screen flex flex-col'>
						<div className='flex-1'>
							<TanStackProvider>{children}<Toaster /></TanStackProvider>
						</div>
						<Footer />
					</div>
				</ThemeProvider>
				
			</body>
		</html>
	);
}
