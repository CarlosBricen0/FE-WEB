import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "components-front-end/creator/ui/card";
import { formatMoney, cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "components-front-end/creator/ui/button";
import ZoomedImage from "./ZoomedImage";
import type { Product } from "@/lib/types";

const SuggestedProduct = ({ product }: { product: Product }) => {
	return (
		<Card className='flex flex-col'>
			<CardHeader className='px-2 flex flex-row items-center justify-between space-y-0 pb-0'>
				<CardTitle className='text-sm font-medium'>
					<p className='w-28 text-ellipsis overflow-hidden text-nowrap'>{product.name}</p>
				</CardTitle>

				<div>
					
					<span className='text-sm'>{formatMoney(product.price, product.currency)}</span>
				</div>
			</CardHeader>
			<CardContent className='flex flex-col flex-1 gap-2 p-2'>
				<ZoomedImage imgSrc={product.image} className='h-44' />
				<div className='flex justify-center mt-auto'>
					<Link href={`/merch/${product.id}`} className={cn("w-full", buttonVariants({ size: "sm" }))}>
						Buy
					</Link>
				</div>
			</CardContent>
		</Card>
	);
};
export default SuggestedProduct;
