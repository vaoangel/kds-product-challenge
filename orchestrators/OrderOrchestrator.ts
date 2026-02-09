import { Order } from "@/dtos/Order.dto"
import { EventEmitter } from "events"
import {
	getRandomId,
	getRandomInterval,
	generateRandomItems,
	calculateOrderTotal,
	estimatePrepTime,
} from "@/helpers/utilities"

export class OrderOrchestrator {
	private interval: NodeJS.Timeout | undefined
	private maxOrders: number = getRandomInterval(10, 30)
	private eventEmitter = new EventEmitter()

	private emit(order: Order) {
		this.eventEmitter.emit("order", order)
	}

	public run() {
		this.interval = setInterval(() => {
			// Generar items para la orden
			const items = generateRandomItems()

			this.emit({
				id: getRandomId(),
				state: "PENDING",
				items,
				totalAmount: calculateOrderTotal(items),
				estimatedPrepTime: estimatePrepTime(items),
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			})

			this.maxOrders--
			if (this.maxOrders <= 0) {
				clearInterval(this.interval)
			}
		}, 2000)
		return this.eventEmitter
	}
}