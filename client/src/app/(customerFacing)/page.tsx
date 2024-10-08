import { ProductCard } from '@/components'
import { ProductCardSkeleton } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import db from '@/db'
import { cache } from '@/lib'
import { Product } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

const getMostPopularProducts = cache(
	() => {
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
	},
	['/', 'getMostPopularProducts'],
	{ revalidate: 60 * 60 * 24 }
)

const getNewestProducts = cache(() => {
	return db.product.findMany({
		where: {
			isAvailableForPurchase: true
		},
		orderBy: {
			createdAt: 'desc'
		},
		take: 6
	})
}, ['/', 'getNewestProducts'])

const Home = () => {
	return (
		<main className="space-y-12 container mx-auto my-6">
			<div className="py-6">
				<ProductGridSection title="Most Popular" productsFetcher={getMostPopularProducts} />
			</div>
			<ProductGridSection title="Newest" productsFetcher={getNewestProducts} />
		</main>
	)
}

type ProductGridSectionProps = {
	title: string
	productsFetcher: () => Promise<Product[]>
}

const ProductGridSection = ({ productsFetcher, title }: ProductGridSectionProps) => {
	return (
		<section className="space-y-4 mx-6">
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
				<Suspense
					fallback={
						<>
							<ProductCardSkeleton />
							<ProductCardSkeleton />
							<ProductCardSkeleton />
						</>
					}
				>
					<ProductSuspense productsFetcher={productsFetcher} />
				</Suspense>
			</div>
		</section>
	)
}

const ProductSuspense = async ({ productsFetcher }: { productsFetcher: () => Promise<Product[]> }) => {
	return (await productsFetcher()).map((product) => <ProductCard key={product.id} {...product} />)
}
export default Home
