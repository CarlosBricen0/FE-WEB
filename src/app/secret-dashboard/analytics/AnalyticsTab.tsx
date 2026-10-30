import { MetricCard } from "components-front-end/creator/components/MetricCard";
import { Avatar, AvatarFallback, AvatarImage } from "components-front-end/creator/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "components-front-end/creator/ui/card";
import { formatMoney } from "@/lib/utils";
import { DollarSign } from "lucide-react";
import { getDashboardData } from "../actions";

const AnalyticsTab = async () => {
	const { totalRevenue, totalSubscriptions, totalSales } = await getDashboardData();
	return (
		<>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5"><MetricCard title="Ingresos netos registrados (CLP)" value={totalRevenue} /><MetricCard title="Paid sales" value={totalSales} /><MetricCard title="Active subscriptions" value={totalSubscriptions} /></div>

			<div className='flex flex-wrap gap-5 my-5'>
				<RecentSubscriptions />
				<RecentSales />
			</div>
		</>
	);
};
export default AnalyticsTab;

const RecentSubscriptions = async () => {
	// const recentSubscriptions = [
	// 	{
	// 		user: {
	// 			name: "John Doe",
	// 			email: "john@email.com",
	// 			image: "",
	// 		},
	// 		price: 10_00,
	// 	},
	// 	{
	// 		user: {
	// 			name: "Jane Doe",
	// 			email: "jane@email.com",
	// 		},
	// 		price: 20_00,
	// 	},
	// ];

	const { recentSubscriptions } = await getDashboardData();
	return (
		<Card className='flex-1'>
			<CardHeader className='px-3'>
				<CardTitle>Recent Subscriptions</CardTitle>
			</CardHeader>
			<CardContent className='grid gap-8 px-3'>
				{recentSubscriptions.length === 0 && (
					<p className='text-sm text-muted-foreground'>No recent subscriptions</p>
				)}

				{recentSubscriptions.map((subscription) => (
					<div className='flex items-center gap-2' key={subscription.user.email}>
						<Avatar className='hidden h-9 w-9 sm:flex'>
							<AvatarImage
								src={subscription.user.image || "/user-placeholder.png"}
								alt='Avatar'
								className='object-cover'
							/>
							<AvatarFallback>{subscription?.user?.name![0] || ""}</AvatarFallback>
						</Avatar>
						<div className='grid gap-1'>
							<p className='text-xs font-medium leading-none'>{subscription.user.name}</p>
							<p className='text-xs text-muted-foreground'>{subscription.user.email}</p>
						</div>
						<div className='ml-auto font-medium'>+{formatMoney(subscription.price, subscription.currency)}</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

const RecentSales = async () => {
	// const recentSales = [
	// 	{
	// 		user: {
	// 			name: "John Doe",
	// 			email: "john@email.com",
	// 			image: "",
	// 		},
	// 		price: 10_00,
	// 	},
	// 	{
	// 		user: {
	// 			name: "Jane Doe",
	// 			email: "jane@email.com",
	// 			image: "",
	// 		},
	// 		price: 20_00,
	// 	},
	// ];

	const { recentSales } = await getDashboardData();
	return (
		<Card className='flex-1'>
			<CardHeader className='px-3'>
				<CardTitle>Recent Sales</CardTitle>
			</CardHeader>
			<CardContent className='grid gap-8 px-3'>
				{recentSales.length === 0 && <p className='text-sm text-muted-foreground'>No recent sales</p>}
				{recentSales.map((order) => (
					<div className='flex items-center gap-2' key={order.user.email}>
						<Avatar className='hidden h-9 w-9 sm:flex'>
							<AvatarImage
								src={order.user.image || "/user-placeholder.png"}
								alt='Avatar'
								className='object-cover'
							/>
							<AvatarFallback>
								<p>{order?.user?.name![0] || ""}</p>
							</AvatarFallback>
						</Avatar>
						<div className='grid gap-1'>
							<p className='text-xs font-medium leading-none'>{order.user.name}</p>
							<p className='text-xs text-muted-foreground'>{order.user.email}</p>
						</div>
						<div className='ml-auto font-medium'>{formatMoney(order.price, order.currency)}</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

