import { Body, Container, Head, Heading, Html, Preview, Tailwind } from '@react-email/components'
import OrderInformation from './components/OrderInformation'

type PurchaseRecieptEmailProps = {
	product: {
		name: string
		imagePath: string
		description: string
	}
	order: {
		id: string
		createdAt: Date
		pricePaidInCents: number
	}
	downloadVerificationId: string
}

PurchaseRecieptEmail.PreviewProps = {
	product: {
		name: 'Product Name',
		description: 'Product Description',
		imagePath: '/products/7450d9db-6e58-4170-b8f3-48aa3aad26dd-download.jpeg'
	},
	order: {
		id: crypto.randomUUID(),
		createdAt: new Date(),
		pricePaidInCents: 1000
	},
	downloadVerificationId: crypto.randomUUID()
} satisfies PurchaseRecieptEmailProps

export default function PurchaseRecieptEmail({ product, order, downloadVerificationId }: PurchaseRecieptEmailProps) {
	return (
		<Html>
			<Preview>Download {product.name} and view receipt</Preview>
			<Tailwind>
				<Head />
				<Body className="font-sans bg-white">
					<Container className="max-w-xl">
						<Heading>Purchase Receipt</Heading>
						<OrderInformation
							order={order}
							product={product}
							downloadVerificationId={downloadVerificationId}
						/>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}
