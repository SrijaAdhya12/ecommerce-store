'use client'

import { emailOrderHistory } from '@/actions/orders'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState, useFormStatus } from 'react-dom'

const MyOrderPage = () => {
	const [data, action] = useFormState(emailOrderHistory, {})
	return (
		<form className="max-2xl mx-auto">
			<Card>
				<CardHeader>
					<CardTitle>My Orders</CardTitle>
					<CardDescription>
						Enter your email and we will email you your order history and download links.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input type="email" required name="email" id="email" />
						{data.error && <p className="text-red-500">{data.error}</p>}
					</div>
				</CardContent>
				<CardFooter>{data.message ? <p>{data.message}</p> : <SubmitButton />}</CardFooter>
			</Card>
		</form>
	)
}

const SubmitButton = () => {
	const { pending } = useFormStatus()
	return (
		<Button type="submit" className="w-full bg-black text-white" disabled={pending}>
			{pending ? 'Loading...' : 'Submit'}
		</Button>
	)
}

export default MyOrderPage
