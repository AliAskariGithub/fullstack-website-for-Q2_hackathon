import Food from "@/components/Food";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="absolute top-96 left-1/2">
          <Image
            src={"/showcase.png"}
            alt="showcase"
            width={200}
            height={200}
            className="w-full"
          />
        </div>
        <Food />
      </div>
    </>
  );
}
