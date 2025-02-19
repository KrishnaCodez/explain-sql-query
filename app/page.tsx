import QueryExplainer from "@/components/query-explainer"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">SQL Query Explainer</h1>
      <QueryExplainer />
    </main>
  )
}

