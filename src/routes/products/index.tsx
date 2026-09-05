import { Link, createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { INDEXABLE_PRODUCTS, getProductDescription, getProductImage } from "@/lib/products";
import { BRAND_NAME, buildSeoMeta, webPageJsonLd } from "@/lib/seo";

const title = `Products | ${BRAND_NAME}`;
const description =
  "Explore Old Glory Soda's marble-neck goli soda and PET collection, including six flagship flavours, Cola and Diet Cola.";
const path = "/products";

export const Route = createFileRoute("/products/")({
  component: ProductsIndex,
  head: () => {
    const seo = buildSeoMeta({ title, description, path });
    return {
      ...seo,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            ...webPageJsonLd({ title, description, path }),
          }),
        },
      ],
    };
  },
});

function ProductsIndex() {
  return (
    <div id="top" className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />
      <main className="px-5 pb-20 pt-32 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <span className="text-xs font-bold tracking-widest text-accent-primary uppercase">
            Old Glory collection
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase tracking-[0.015em] sm:text-6xl">
            Every bottle. One proud legacy.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            Browse the six signature marble-neck flavours and the Old Glory Cola collection. Open a
            product for ingredients, pack options and its complete nutritional facts.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INDEXABLE_PRODUCTS.map((product, index) => {
              const image = getProductImage(product);
              return (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-3xl border border-border-theme bg-bg-surface shadow-lg"
                >
                  <Link
                    to="/products/$slug"
                    params={{ slug: product.slug }}
                    className="group block h-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-bg-muted">
                      <picture className="block h-full w-full">
                        {image.optimizedSrc && (
                          <source srcSet={image.optimizedSrc} type="image/webp" />
                        )}
                        <img
                          src={image.src}
                          alt={`Old Glory ${product.name}`}
                          width={image.width}
                          height={image.height}
                          loading={index < 2 ? "eager" : "lazy"}
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                        />
                      </picture>
                    </div>
                    <div className="p-6">
                      <p className="text-[11px] font-semibold tracking-widest text-accent-primary uppercase">
                        {product.packaging === "glass"
                          ? "Marble-neck signature"
                          : "Cola collection"}
                      </p>
                      <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-[0.015em]">
                        {product.name}
                      </h2>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-muted">
                        {getProductDescription(product)}
                      </p>
                      <span className="mt-5 inline-flex text-xs font-bold tracking-wider text-accent-primary uppercase">
                        View product details →
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
