import { trpc } from "@web/app/trpc";

export default async function Home() {
  var greeting, products;

  try {
    greeting = await trpc.hello.query({ name: 'Tom' });
    products = await trpc.getProducts.query();
  } catch (e) {
    console.log(e);
  }

  return <div>
    <p>greeting: {JSON.stringify(greeting, null, 2)}</p>
    <p>products: {JSON.stringify(products, null, 2)}</p>
  </div>;
}
