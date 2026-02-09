import { Item } from "@/dtos/Item.dto"

export function getRandomId() {
	const length = 5
	let result = ""
	const characters = "0123456789"
	const charactersLength = characters.length
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength),
		)
	}
	return result
}

export function getRandomInterval(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

// Tipo para los items del menú
type MenuItem = {
	name: string
	price: number
	image: string
	category: "food" | "drink" | "dessert"
	prepTime: number // Minutos estimados de preparación
}

// Catálogo de productos del restaurante
const MENU_ITEMS: MenuItem[] = [
	{
		name: "Pizza Margherita",
		price: 150,
		image: "🍕",
		category: "food",
		prepTime: 15,
	},
	{
		name: "Pizza Pepperoni",
		price: 170,
		image: "🍕",
		category: "food",
		prepTime: 15,
	},
	{
		name: "Hamburguesa Clásica",
		price: 120,
		image: "🍔",
		category: "food",
		prepTime: 10,
	},
	{
		name: "Hamburguesa Doble",
		price: 180,
		image: "🍔",
		category: "food",
		prepTime: 12,
	},
	{
		name: "Tacos al Pastor",
		price: 90,
		image: "🌮",
		category: "food",
		prepTime: 8,
	},
	{
		name: "Tacos de Asada",
		price: 95,
		image: "🌮",
		category: "food",
		prepTime: 8,
	},
	{
		name: "Burrito",
		price: 110,
		image: "🌯",
		category: "food",
		prepTime: 10,
	},
	{
		name: "Quesadilla",
		price: 85,
		image: "🧀",
		category: "food",
		prepTime: 7,
	},
	{
		name: "Ensalada César",
		price: 95,
		image: "🥗",
		category: "food",
		prepTime: 5,
	},
	{
		name: "Papas Fritas",
		price: 45,
		image: "🍟",
		category: "food",
		prepTime: 5,
	},
	{
		name: "Coca Cola",
		price: 30,
		image: "🥤",
		category: "drink",
		prepTime: 1,
	},
	{
		name: "Agua Natural",
		price: 20,
		image: "💧",
		category: "drink",
		prepTime: 1,
	},
	{
		name: "Cerveza",
		price: 50,
		image: "🍺",
		category: "drink",
		prepTime: 1,
	},
	{ name: "Café", price: 35, image: "☕", category: "drink", prepTime: 3 },
	{
		name: "Helado",
		price: 60,
		image: "🍨",
		category: "dessert",
		prepTime: 3,
	},
	{
		name: "Brownie",
		price: 55,
		image: "🍰",
		category: "dessert",
		prepTime: 2,
	},
]

/**
 * Genera entre 1 y 5 items aleatorios del menú para una orden
 * @returns Array de items con datos completos
 */
export function generateRandomItems(): Array<Item> {
	const itemCount = getRandomInterval(1, 5)
	const selectedItems: Array<Item> = []

	for (let i = 0; i < itemCount; i++) {
		const randomIndex = Math.floor(Math.random() * MENU_ITEMS.length)
		const menuItem = MENU_ITEMS[randomIndex]

		selectedItems.push({
			id: getRandomId(),
			name: menuItem.name,
			image: menuItem.image,
			category: menuItem.category,
			quantity: 1,
			price: {
				currency: "MXN",
				amount: menuItem.price,
			},
		})
	}

	return selectedItems
}

/**
 * Calcula el monto total de una orden sumando todos sus items
 * @param items Array de items de la orden
 * @returns Total en la moneda de los items
 */
export function calculateOrderTotal(items: Array<Item>): number {
	return items.reduce((total, item) => {
		const quantity = item.quantity || 1
		return total + item.price.amount * quantity
	}, 0)
}

/**
 * Estima el tiempo de preparación de una orden basado en sus items
 * Toma el item con mayor tiempo + la mitad del tiempo de los demás
 * @param items Array de items de la orden
 * @returns Tiempo estimado en minutos
 */
export function estimatePrepTime(items: Array<Item>): number {
	let maxTime = 0
	let totalOtherTime = 0

	items.forEach((item) => {
		const menuItem = MENU_ITEMS.find((m) => m.name === item.name)
		if (menuItem) {
			if (menuItem.prepTime > maxTime) {
				totalOtherTime += maxTime
				maxTime = menuItem.prepTime
			} else {
				totalOtherTime += menuItem.prepTime
			}
		}
	})

	return Math.ceil(maxTime + totalOtherTime / 2)
}