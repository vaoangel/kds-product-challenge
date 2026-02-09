import s from "./Column.module.scss"
import { Order } from "@/dtos/Order.dto"

export type ColumnProps = {
	orders: Array<Order>
	title: string
	onClick?: (order: Order) => void
}

export default function Column(props: ColumnProps) {
	return (
		<div className={s["pk-column"]}>
			<div className={s["pk-column__title"]}>
				<h3>{props.title}</h3>
			</div>
		{props.orders.map((order) => (
			<div
				key={order.id}
				onClick={() => props.onClick && props.onClick(order)}
				className={s["pk-card"]}
			>
				<div>
					<span>
						Orden: <b>{order.id}</b>
					</span>
					{order.estimatedPrepTime && (
						<span style={{ marginLeft: "10px", color: "#666", fontSize: "13px" }}>
							⏱️ {order.estimatedPrepTime} min
						</span>
					)}
				</div>
				<div className={s["pk-card__items"]}>
					{order.items.map((item) => (
						<div key={item.id} className={s["pk-card__item"]}>
							<span>{item.image}</span>
							<span>{item.name}</span>
							<span>
								${item.price.amount}
							</span>
						</div>
					))}
				</div>
				{order.totalAmount && (
					<div className={s["pk-card__total"]}>
						<strong>Total: ${order.totalAmount} MXN</strong>
					</div>
				)}
			</div>
		))}
		</div>
	)
}
