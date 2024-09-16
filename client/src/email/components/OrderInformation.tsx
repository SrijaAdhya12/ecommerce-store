import { Button, Column, Img, Row, Section, Text } from '@react-email/components'

type OrderInformationProps = {
	order: {
		id: string
		createdAt: Date
		pricePaidInCents: number
	}
	product: { imagePath: string; name: string; description: string }
	downloadVerificationId: string
}

const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })

const OrderInformation = ({ order, product, downloadVerificationId }: OrderInformationProps) => {
	return (
		<>
			<Section>
				<Row>
					<Column>
						<Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">Order Id</Text>
						<Text>{/* {order.id} */}</Text>
					</Column>
					<Column>
						<Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">Purchased On</Text>
						{/* <Text>{dateFormatter.format(order.createdAt)}</Text> */}
					</Column>
					<Column>
						<Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">Price Paid</Text>
						{/* <Text>{formatCurrency(order.pricePaidInCents / 100)}</Text> */}
					</Column>
				</Row>
			</Section>
			<Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
				<Img
					width="100%"
					src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.imagePath}`}
					alt="Product Image"
					className="mx-auto"
				/>
				<Row>
					<Column className="align-bottom">
						<Text className="text-lg font-bold m-0 mr-4">{product.name}</Text>
					</Column>
					<Column align="right">
						<Button
							href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products/download/${downloadVerificationId}`}
							className="bg-black text-white px-6 py-4 rounded text-lg"
						>
							Download
						</Button>
					</Column>
				</Row>
				<Row>
					<Column>
						<Text className="text-gray-500 mb-0">{product.description}</Text>
					</Column>
				</Row>
			</Section>
		</>
	)
}

export default OrderInformation