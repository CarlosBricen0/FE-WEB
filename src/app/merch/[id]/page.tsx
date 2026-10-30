import { getKindeServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import BaseLayout from "@/components/BaseLayout";
import ProductCard from "@/components/ProductCard";
import UnderlinedText from "@/components/decorators/UnderlinedText";
import ProductCheckout from "./ProductCheckout";
import { api } from "@/lib/backend";
import type { Product } from "@/lib/types";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
	if (!(await getKindeServerSession().isAuthenticated())) redirect("/");
 const { id } = await params;
	const currentProduct = (await api<Product[]>("/v1/products")).find(product => product.id === id);

	const products = await api<Product[]>("/v1/products");

	if (!currentProduct || currentProduct.isArchived) return notFound();

	return (
		<BaseLayout renderRightPanel={false}>
			<div className='px-3 md:px-7 my-20'>
				<ProductCheckout product={currentProduct} />

				<h1 className='text-3xl text-center mt-20 mb-10 font-bold tracking-tight'>
					More product from{" "}
					<UnderlinedText className='decoration-wavy underline-offset-8'>OnlyHorse</UnderlinedText>
				</h1>
				<div className='grid gap-5 grid-cols-1 md:grid-cols-2'>
					{products.filter(product => product.id !== id).map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</BaseLayout>
	);
};
export default Page;
