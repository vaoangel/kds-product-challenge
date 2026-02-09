import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
} from "react"
import { useOrders } from "@/contexts/Orders.context"
import { getRandomInterval } from "@/helpers/utilities"
import { Rider } from "@/dtos/Rider.dto"

export type RidersContextProps = {
	riders: Array<Rider>
	pickupByOrderId: (orderId: string) => void
}

export const RidersContext = createContext<RidersContextProps>(
	// @ts-ignore
	{},
)

export type RidersProviderProps = {
	children: ReactNode
}

export function RidersProvider(props: RidersProviderProps) {
	const [riders, setRiders] = useState<Array<Rider>>([])
	const [assignedOrders, setAssignedOrders] = useState<string[]>([])
	const ordersContext = useOrders()

	
	const pickupByOrderId = useCallback((orderId: string) => {
		const currentOrder = ordersContext.orders.find(o => o.id === orderId)
		if (currentOrder) {
			console.log("Pickup - Orden encontrada:", currentOrder.id, "Estado:", currentOrder.state)
			ordersContext.pickup(currentOrder)
			
			
			alert("El Repartidor ha recogido el pedido, pedido en camino!")
			setRiders((prev) => prev.filter((rider) => rider.orderWanted !== orderId))
		} else {
			alert(`Orden ${orderId} no encontrada`)
		}
	}, [ordersContext.orders, ordersContext.pickup])

	useEffect(() => {
		const order = ordersContext.orders.find((order) => !assignedOrders.includes(order.id))
		
		if (order) {
			const orderId = order.id
			setAssignedOrders((prev) => [...prev, orderId])
			
			setTimeout(
				() => {
					setRiders((prev) => [
						...prev,
						{
							orderWanted: orderId,
							pickup: () => pickupByOrderId(orderId), // Solo guarda el ID
						},
					])
				},
				getRandomInterval(4_000, 10_000),
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ordersContext.orders])

	const context = { riders, pickupByOrderId }
	return (
		<RidersContext.Provider value={context}>
			{props.children}
		</RidersContext.Provider>
	)
}

export const useRiders = () => useContext(RidersContext)
