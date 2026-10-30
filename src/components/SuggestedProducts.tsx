import { api } from "@/lib/backend";
import type { Product } from "@/lib/types";
import SuggestedProduct from "./SuggestedProduct";

const SuggestedProducts = async () => {
	const products = await api<Product[]>("/v1/products");

	return (
		<div
			className='lg:w-2/5 hidden lg:flex flex-col gap-3 px-2 sticky top-0 right-0
    h-screen ml-3'
		>
			<div className='flex flex-col gap-2 mt-20'>
				<p className='uppercase text-muted-foreground font-semibold tracking-tight'>Recommended Products</p>
				<div className='grid grid-cols-2 gap-4'>
					{products.slice(0,4).map((product) => (
						<SuggestedProduct key={product.id} product={product} />
					))}
				</div>
			</div>
		</div>
	);
};
export default SuggestedProducts;
