import { ProductCard } from '@/components'
import { Button } from '@/components/ui/button'
import db from '@/db'
import { Product } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const getMostPopularProducts = () => {
	return db.product.findMany({
		where: {
			isAvailableForPurchase: true
		},
		orderBy: {
			orders: {
				_count: 'desc'
			}
		},
		take: 6
	})
}

const getNewestProducts = () => {
	return db.product.findMany({
		where: {
			isAvailableForPurchase: true
		},
		orderBy: {
			createdAt: 'desc'
		},
		take: 6
	})
}

const Home = () => {
	return (
		<main className="space-y-12 container mx-auto my-6">
			<ProductGridSection title="Most Poplular" productsFetcher={getMostPopularProducts} />
			<ProductGridSection title="Newest" productsFetcher={getNewestProducts} />
		</main>
	)
}

type ProductGridSectionProps = {
	title: string
	productsFetcher: () => Promise<Product[]>
}

const ProductGridSection = async ({ productsFetcher, title }: ProductGridSectionProps) => {
	return (
		<section className="space-y-4">
			<div className="flex gap-4">
				<h2 className="text-3xl font-bold">{title}</h2>
				<Button variant="outline" asChild>
					<Link href="/products" className="space-x-2">
						<span>View All</span>
						<ArrowRight className="size-4" />
					</Link>
				</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{(await productsFetcher()).map((product) => (
					<ProductCard key={product.id} {...product} />
				))}
			</div>
		</section>
	)
}

export default Home
