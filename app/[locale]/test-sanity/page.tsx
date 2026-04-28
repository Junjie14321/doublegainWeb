import { client } from '@/lib/sanity.client'

async function getProducts() {
  const query = `*[_type == "product"]{
    _id,
    name,
    slug,
    "category": category->name,
    description,
    tags
  }`

  const products = await client.fetch(query)
  return products
}

export default async function TestSanityPage() {
  const products = await getProducts()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sanity Connection Test</h1>

      <div className="bg-green-100 p-4 rounded mb-4">
        <p className="font-semibold">✅ Connected to Sanity!</p>
        <p>Found {products.length} product(s)</p>
      </div>

      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(products, null, 2)}
      </pre>
    </div>
  )
}
