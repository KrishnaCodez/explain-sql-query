import QueryExplainer from "@/components/query-explainer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto py-8">
        <QueryExplainer />
      </div>
    </main>
  );
}
