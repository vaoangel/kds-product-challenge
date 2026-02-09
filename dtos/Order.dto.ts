import { Item } from "@/dtos/Item.dto"

export type OrderState = "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED"

export type Order = {
	id: string
	state: OrderState
	items: Array<Item>

	// Campos adicionales para MongoDB (preparados desde ahora)
	totalAmount?: number // Total calculado
	createdAt?: Date | string // Timestamp de creación
	updatedAt?: Date | string // Timestamp de última actualización
	riderId?: string // ID del rider asignado (cuando esté READY/DELIVERED)
	estimatedPrepTime?: number // Minutos estimados de preparación
}
