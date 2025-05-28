import Link from "next/link";
import Image from "next/image";

export default function SplashScreen() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Link
          href="/onboarding1"
          className="text-white text-xl font-bold flex items-center gap-2"
        >
          <Image
            src="/rentalq-icon.svg"
            alt="RentalQ Logo"
            width={180}
            height={38}
            priority
          />
        </Link>
      </main>
      <footer
        className="font-medium row-start-3 flex gap-[24px] flex-wrap items-center justify-center"
        style={{ color: "#61A9FB" }}
      >
        RentalQ © 2025 All Rights Reserved.
      </footer>
    </div>
  );
}
