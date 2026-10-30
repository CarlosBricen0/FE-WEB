export type Creator = { id: string; name: string; image: string | null };
export type FeedComment = { id: string; text: string; createdAt: string; user: Creator };
export type FeedPost = { id: string; text: string; mediaUrl: string | null; mediaType: string | null; isPublic: boolean; likes: number; createdAt: string; comments: FeedComment[]; likesList: { userId: string }[] };

export type Profile = Creator & {email: string; isAdmin: boolean; isSubscribed: boolean};
export type Product = {id: string; name: string; image: string; price: number; currency: string; isArchived: boolean};
export type CreatorProfile = Creator & {imageCount: number; videoCount: number; totalLikes: number};
export type Plan = {id: string; name: string; months: number; amount: number | null};
export type Shipping = {address: string; city: string; state: string; postalCode: string};
export type OrderSummary = {product: Product; isPaid: boolean; paymentStatus: string; price: number; currency: string; size: string; shippingAddress: (Shipping & {country: string}) | null};
export type Billing = {subscription: {status: string; price: number; currency: string; endDate: string; providerSubscriptionId: string | null} | null; hasAccess: boolean};
export type Dashboard = {totalRevenue: string; totalSales: number; totalSubscriptions: number; recentSales: {user: {name:string;email:string;image:string|null}; price:number;currency:string;orderDate:string}[]; recentSubscriptions: {user: {name:string;email:string;image:string|null};price:number;currency:string;startDate:string}[]};
