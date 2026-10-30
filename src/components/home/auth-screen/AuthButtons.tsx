"use client";
import { Button } from "components-front-end/creator/ui/button";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
export default function AuthButtons() { return <div className="flex flex-col md:flex-row gap-3"><Button asChild variant="outline" className="flex-1"><RegisterLink>Sign up</RegisterLink></Button><Button asChild className="flex-1"><LoginLink>Login</LoginLink></Button></div>; }
