export type ItemCategory = "food" | "drink" | "dessert"

export type Item = {
	id: string
	name: string
	image: string  
	quantity?: number  
	price: {
	  currency: string
	  amount: number
	}
	
	sku?: string 
	category?: ItemCategory  
  }