import AuthScreen from "@/components/home/auth-screen/AuthScreen";
import HomeScreen from "@/components/home/home-screen/HomeScreen";
import { getKindeServerSession } from "@/lib/auth";

export default async function Home() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	
	return <main>{user ? <HomeScreen /> : <AuthScreen />}</main>;
}
