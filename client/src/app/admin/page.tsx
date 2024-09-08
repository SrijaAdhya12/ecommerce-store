import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import db from '@/db/db'
import { formatCurrency, formatNumber } from '@/lib/formatters'
const getSalesData = async () => {
	const data = await db.order.aggregate({
		_sum: {
			pricePaidInCents: true
		},
		_count: true
	})
	return {
		amount: (data._sum.pricePaidInCents || 0) / 100,
		numberOfSales: data._count
	}
}

const AdminDashboard = async () => {
	const salesData = await getSalesData()
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<DashboardCard
				title="Sales"
				subtitle={`${formatNumber(salesData.numberOfSales)}`}
				body={formatCurrency(salesData.amount)}
			/>
			<DashboardCard title="Sales" subtitle="Test" body="body" />
			<DashboardCard title="Sales" subtitle="Test" body="body" />
		</div>
	)
}

type DashboardCardProps = {
	title: string
	subtitle: string
	body: string
}

const DashboardCard = ({ title, subtitle, body }: DashboardCardProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{subtitle}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{body}</p>
			</CardContent>
		</Card>
	)
}

export default AdminDashboard
