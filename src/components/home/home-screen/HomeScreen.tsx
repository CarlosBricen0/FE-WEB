import BaseLayout from "@/components/BaseLayout";
import UserProfile from "./UserProfile";
import Posts from "./Posts";
import prisma from "@/db/prisma";
import { getUserProfileAction } from "@/app/update-profile/actions";
import { notFound } from "next/navigation";

const HomeScreen = async () => {
	const admin = await prisma.user.findUnique({ where: { ...(process.env.ADMIN_USER_ID ? { id: process.env.ADMIN_USER_ID } : { email: (process.env.ADMIN_EMAIL || "").toLowerCase() }) }, select: { id: true, name: true, image: true } });
	const user = await getUserProfileAction();

	if (!user) return notFound();
 if (!admin) return <p className="p-10">The creator profile is not configured. Ask the administrator to sign in first.</p>;

	return (
		<BaseLayout>
			<UserProfile />
			<Posts currentUserId={user.id} admin={admin!} isSubscribed={user?.isSubscribed} />
		</BaseLayout>
	);
};
export default HomeScreen;
