import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import appConfig from "@/settings";
import Image from "next/image";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-green-800">
              <Image
              src={appConfig.logoUrl}
              height={300}
              width={300}
              alt="Sahel Coders"
              />
      <div className="space-y-6 text-center">

        <h1 className={cn(
          "text-5xl font-semibold text-[#DF7413] drop-shadow-md",
          font.className,
        )}>
          🔐 {appConfig.appName}
        </h1>
        <p className="text-white text-lg">
          {appConfig.websiteDescription}
        </p>
        <div>
          {/* <LoginButton  asChild>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton> */}
          <Link href="/test">
              <Button variant="secondary" size="lg">
                Dashboard
              </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
