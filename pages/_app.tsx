import { OrdersProvider } from "@/contexts/Orders.context"
import { RidersProvider } from "@/contexts/Riders.context"
import "@/styles/globals.scss"
import type { AppProps } from "next/app"
import { Toaster } from "react-hot-toast"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Toaster
				position="top-right"
				toastOptions={{
					duration: 3000,
					style: {
						background: "#333",
						color: "#fff",
						fontWeight: "500",
					},
					success: {
						duration: 3000,
						iconTheme: {
							primary: "#10b981",
							secondary: "#fff",
						},
					},
					error: {
						duration: 4000,
						iconTheme: {
							primary: "#ef4444",
							secondary: "#fff",
						},
					},
				}}
			/>
			<OrdersProvider>
				<RidersProvider>
					<Component {...pageProps} />
				</RidersProvider>
			</OrdersProvider>
		</>
	)
}
