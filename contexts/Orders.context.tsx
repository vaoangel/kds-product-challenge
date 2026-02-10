import { Order } from "@/dtos/Order.dto"
import { OrderOrchestrator } from "@/orchestrators/OrderOrchestrator"
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react"
import toast from "react-hot-toast"

export type OrdersContextProps = {
	orders: Array<Order>
	pickup: (order: Order) => void
	updateOrderState: (orderId: string, newState: Order["state"]) => void
}

export const OrdersContext = createContext<OrdersContextProps>(
	// @ts-ignore
	{},
)

export type OrdersProviderProps = {
	children: ReactNode
}

export function OrdersProvider(props: OrdersProviderProps) {
	const [orders, setOrders] = useState<Array<Order>>([])

	useEffect(() => {
		const orderOrchestrator = new OrderOrchestrator()
		const listener = orderOrchestrator.run()
		
		const handleOrder = (order: Order) => {
			setOrders((prev) => [...prev, order])
		}
		
		listener.on("order", handleOrder)
		
		// Cleanup: remover el listener cuando el componente se desmonte
		return () => {
			listener.off("order", handleOrder)
		}
	}, [])

	const updateOrderState = (orderId: string, newState: Order["state"]) => {
		setOrders((prev) =>
			prev.map((order) =>
				order.id === orderId
					? { ...order, state: newState, updatedAt: new Date().toISOString() }
					: order,
			),
		)
	}

	const pickup = (order?: Order) => {
		if (!order) {
			toast.error("No se recibió orden para pickup")
			return
		}
		
		if (order.state === "READY") {
			toast.success(`✅ Orden ${order.id} entregada correctamente`, {
				duration: 2000,
			})
			updateOrderState(order.id, "DELIVERED")
			setTimeout(() => {
				setOrders((prev) => prev.filter((o) => o.id !== order.id))
			}, 2000)
		} else {
			const estadoTexto = {
				PENDING: "Pendiente",
				IN_PROGRESS: "En preparación",
				READY: "Listo",
				DELIVERED: "Entregado",
			}
			toast.error(
				`⚠️ La orden ${order.id} no está lista aún\nEstado actual: ${estadoTexto[order.state]}`,
				{
					duration: 4000,
				},
			)
		}
	}

	const context = {
		orders,
		pickup,
		updateOrderState,
	}

	return (
		<OrdersContext.Provider value={context}>
			{props.children}
		</OrdersContext.Provider>
	)
}

export const useOrders = () => useContext(OrdersContext)
