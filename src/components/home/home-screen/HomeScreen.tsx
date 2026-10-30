import BaseLayout from "@/components/BaseLayout";
import UserProfile from "./UserProfile";
import Posts from "./Posts";
import { api } from "@/lib/backend";
import type { CreatorProfile } from "@/lib/types";
import { getUserProfileAction } from "@/app/update-profile/actions";
import { notFound } from "next/navigation";

const HomeScreen = async () => {
	const admin = await api<CreatorProfile | null>("/v1/creator", "GET", undefined, false);
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
