import Image from "next/image";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import ContentArea from "@/components/layout/ContentArea";

export default function Home() {
  return (
    <>
      <Sidebar />
      <Header />
      <ContentArea>
        <div className="rounded-lg border bg-white p-6">
          <div className="mb-6">
            <textarea
              className="w-full resize-none rounded-lg border p-4 focus:border-[#6C5CE7] focus:outline-none"
              placeholder="What's on your mind?"
              rows={4}
            />
            <div className="mt-2 flex items-center justify-between text-sm">
              <button className="text-[#6C5CE7]">Add Media</button>
              <span className="text-gray-500">234/280</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((id) => (
                <Image
                  key={id}
                  src={`https://picsum.photos/32/32?random=${id}`}
                  alt="Platform"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                />
              ))}
            </div>
            <div className="flex space-x-3">
              <button className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
                Clone
              </button>
              <button className="rounded-lg bg-[#6C5CE7] px-4 py-2 text-sm text-white hover:bg-[#5B4ED1]">
                Publish
              </button>
            </div>
          </div>
        </div>
      </ContentArea>
    </>
  );
}
