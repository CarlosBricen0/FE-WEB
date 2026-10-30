"use client";
import { ProductTile } from "components-front-end/creator/components/ProductTile";
import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "components-front-end/creator/ui/card";
import { formatMoney, cn } from "@/lib/utils";
import ZoomedImage from "./ZoomedImage";
import { Button, buttonVariants } from "components-front-end/creator/ui/button";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleProductArchiveAction } from "@/app/secret-dashboard/actions";
import { useToast } from "components-front-end/creator/ui/use-toast";

const ProductCard = ({ product, adminView = false }: { product: import("@prisma/client").Product; adminView?: boolean }) => {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const { mutate: toggleArchive, isPending } = useMutation({
		mutationKey: ["toggleArchive"],
		mutationFn: async () => await toggleProductArchiveAction(product.id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
			toast({
				title: "Success",
				description: `Product ${product.isArchived ? "unarchived" : "archived"}`,
			});
		},
		onError: (error) => {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		},
	});

  return <ProductTile name={product.name} price={`${formatMoney(product.price, product.currency)} ${product.currency}`} image={<ZoomedImage imgSrc={product.image} />} status={product.isArchived ? 'Archived' : 'In stock'} action={adminView ? <Button className="w-full" variant="outline" onClick={() => toggleArchive()} disabled={isPending}>{product.isArchived ? 'Unarchive' : 'Archive'}</Button> : <Button asChild className="w-full"><Link href={`/merch/${product.id}`}>Buy</Link></Button>} />;
};
export default ProductCard;
