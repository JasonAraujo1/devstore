import { api } from "@/app/data/api";
import type { Product } from "@/app/data/types/products";
import Image from "next/image";
import Link from "next/link";

async function getFeaturedProducts(): Promise<Product[]> {
	const response = await api("/products/featured", {
		next: {
			revalidate: 1, //1 hour
		},
	});

	const products = await response.json();

	return products;
}

export default async function HomeLoading() {
	const [highLightedProduct, ...otherProducts] = await getFeaturedProducts(); //aqui o primeiro produto vai ser o de maior destaque, e os demais produtos vão ser concatenados em um array chamado 'otherProducts'
	//resumo:
	//estou fazendo o fetch de dados dos produtos da api diretamente da home ultilizando
	//um componente server side, a requisição para trazer os dados dos produtos nao ta
	//sendo feita no navegador(isso ajuda na indeçação e diversos fatores quando usa o
	//react

	return (
		<div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
			<Link
				href={`/product/${highLightedProduct.slug}`}
				className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
			>
				<Image
					src={highLightedProduct.image}
					alt=""
					width={1200}
					height={1200}
					quality={100}
					className="group-hover:scale-105 transition-transform duration-500"
				/>

				<div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
					<span className="text-sm truncate">{highLightedProduct.title}</span>
					<span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
						{highLightedProduct.price.toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL",
							minimumFractionDigits: 0,
							maximumFractionDigits: 0,
						})}
					</span>
				</div>
			</Link>

			{otherProducts.map((product) => {
				return (
					<Link
						key={product.id}
						href={`/product/${product.slug}`}
						className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
					>
						<Image
							src={product.image}
							alt=""
							width={1200}
							height={1200}
							quality={100}
							className="group-hover:scale-105 transition-transform duration-500"
						/>

						<div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
							<span className="text-sm truncate">{product.title}</span>
							<span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
								{product.price.toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL",
									minimumFractionDigits: 0,
									maximumFractionDigits: 0,
								})}
							</span>
						</div>
					</Link>
				);
			})}
		</div>
	);
}
