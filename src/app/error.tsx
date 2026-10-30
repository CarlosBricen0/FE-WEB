"use client";
import { Button } from "components-front-end/creator/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) { return <main className="max-w-xl p-10 mx-auto space-y-5"><h1 className="text-2xl font-bold">Unable to load this page</h1><p>Please try again. If the problem persists, check that the application services are configured.</p><Button onClick={reset}>Try again</Button></main> }
