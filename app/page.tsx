import QueryExplainer from "@/components/query-explainer";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="absolute top-0  left-0 z-0 pointer-events-none select-none max-md:hidden  ">
        <img
          src="/gradient.svg"
          alt="Background Gradient"
          className="w-[31.25rem] h-[31.25rem]   max-md:scale-y-[-1]"
          draggable="false"
        />
      </div>

      <div className="absolute   left-0 z-0 pointer-events-none select-none bottom-0 md:hidden ">
        <img
          src="/gradient.svg"
          alt="Background Gradient"
          className="w-[31.25rem] h-[31.25rem]   max-md:scale-y-[-1]"
          draggable="false"
        />
      </div>

      {/* Right gradient - rotated */}
      <div className="absolute top-0 right-0 z-0 pointer-events-none select-none">
        <img
          src="/gradient.svg"
          alt="Background Gradient "
          className="w-[31.25rem] h-[31.25rem] scale-x-[-1] max-md:hidden"
          draggable="false"
        />
      </div>
      <div className="container  mx-auto py-8 px-0 relative z-10">
        <QueryExplainer />
      </div>
    </main>
  );
}
