import { Order } from "@/dtos/Order.dto"

export type RiderStatus = "WAITING" | "PICKING_UP" | "DELIVERED"

export type Rider = {
	id?: string  
	name?: string  
	orderWanted: string  
	status?: RiderStatus  
	arrivedAt?: Date | string  
	pickup: (order?: Order) => void  
}
