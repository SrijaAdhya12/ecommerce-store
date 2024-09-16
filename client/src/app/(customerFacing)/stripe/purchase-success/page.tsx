import { Button } from '@/components/ui/button'
import db from '@/db'
import { formatCurrency } from '@/lib'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const SucessPage = async ({ searchParams }: { searchParams: { payment_intent: string } }) => {
	const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent)
	if (paymentIntent.metadata.productId == null) return notFound()

	const product = await db.product.findUnique({ where: { id: paymentIntent.metadata.productId } })

	if (product == null) return notFound()

	const isSuccess = paymentIntent.status === 'succeeded'
	return (
		<div className="max-w-5xl w-full mx-auto space-y-8 mt-20">
			<h1 className="text-4xl font-bold">{isSuccess ? 'Success!' : 'Error'}</h1>
			<div className="flex gap-4 items-center ">
				<div className="w-1/3 flex-shrink-0 relative aspect-video">
					<Image src={product.imagePath} className="object-contain" fill alt={product.name} />
				</div>
				<div>
					<div className="text-lg ">{formatCurrency(product.priceInCents / 100)}</div>
					<h1 className="text-2xl font-bold">{product.name}</h1>
					<div className="line-clamp-3 text-muted-foreground ">{product.description}</div>
					<Button className="mt-4" size="lg" asChild>
						{isSuccess ? (
							<a href={`/products/download/${await createDownloadVerification(product.id)}`}>Download</a>
						) : (
							<Link href={`/products/${product.id}`}>Try Again </Link>
						)}
					</Button>
				</div>
			</div>
		</div>
	)
}

const createDownloadVerification = async (productId: string) => {
	return (
		await db.downloadVerification.create({
			data: { productId, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) }
		})
	).id
}

export default SucessPage
