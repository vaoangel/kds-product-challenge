import s from "./Kanban.module.scss"
import Column from "@/components/Column/Column"
import { useOrders } from "@/contexts/Orders.context"

export default function Kanban() {
	const { orders, updateOrderState } = useOrders()

	return (
		<section className={s["pk-kanban"]}>
			<Column
				title="Pendiente"
				orders={orders.filter((order) => order.state === "PENDING")}
				onClick={(order) => updateOrderState(order.id, "IN_PROGRESS")}
			/>
			<Column
				title="En preparación"
				orders={orders.filter((order) => order.state === "IN_PROGRESS")}
				onClick={(order) => updateOrderState(order.id, "READY")}
			/>
			<Column
				title="Listo"
				orders={orders.filter((order) => order.state === "READY")}
			/>
		</section>
	)
}
