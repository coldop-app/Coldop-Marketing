import Image from "next/image";
import Link from "next/link";

export function BrandMark() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      aria-label="Coldop Home"
    >
      <Image
        src="/icon-192x192.webp"
        alt="Coldop logo"
        width={40}
        height={40}
        priority
        className="size-10 rounded-full border bg-white object-contain p-0.5"
      />

      <div className="flex flex-col">
        <span className="font-heading text-lg leading-none font-bold tracking-tight">
          Coldop
        </span>

        <span className="text-primary mt-0.5 text-[9px] font-semibold uppercase tracking-widest">
          Estd. 2023
        </span>
      </div>
    </Link>
  );
}