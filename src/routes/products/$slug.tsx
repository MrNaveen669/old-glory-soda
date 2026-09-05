import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { NutritionFacts } from "@/components/site/nutrition-facts";
import {
  INDEXABLE_PRODUCTS,
  getPackLabel,
  getProductPageData,
  productJsonLd,
} from "@/lib/products";
import { BRAND_NAME, breadcrumbJsonLd, buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const page = getProductPageData(params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const title = `${loaderData.product.name} | ${BRAND_NAME}`;
    const seo = buildSeoMeta({
      title,
      description: loaderData.description,
      path: loaderData.path,
      image: loaderData.image.src,
      imageAlt: `Old Glory ${loaderData.product.name}`,
    });

    return {
      ...seo,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              productJsonLd(loaderData),
              breadcrumbJsonLd([
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: loaderData.product.name, path: loaderData.path },
              ]),
            ],
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const page = Route.useLoaderData();
  const { product, image, description, variants } = page;

  return (
    <div id="top" className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />
      <main className="pb-20 pt-24 sm:pt-28">
        <article>
          <div className="mx-auto max-w-6xl px-5">
            <nav aria-label="Breadcrumb" className="py-5 text-xs text-text-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link to="/" className="hover:text-accent-primary hover:underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/products" className="hover:text-accent-primary hover:underline">
                    Products
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-text-primary">
                  {product.name}
                </li>
              </ol>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
              <div className="overflow-hidden rounded-3xl border border-border-theme bg-bg-surface shadow-2xl">
                <picture className="block h-full w-full">
                  {image.optimizedSrc && <source srcSet={image.optimizedSrc} type="image/webp" />}
                  <img
                    src={image.src}
                    alt={`Old Glory ${product.name}`}
                    width={image.width}
                    height={image.height}
                    fetchPriority="high"
                    decoding="async"
                    className="aspect-[4/3] h-full w-full object-cover"
                  />
                </picture>
              </div>

              <header>
                <p className="text-xs font-bold tracking-[0.18em] text-accent-primary uppercase">
                  {page.category}
                </p>
                <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-tight tracking-[0.015em] sm:text-6xl">
                  {product.name}
                </h1>
                <p className="mt-5 text-base leading-relaxed text-text-muted sm:text-lg">
                  {description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-accent-cta/60 bg-accent-cta/10 px-4 py-2 text-sm font-bold text-accent-cta">
                    From ₹{Math.min(...variants.map((variant) => variant.price ?? 0))}
                  </span>
                  <span className="rounded-full border border-border-theme px-4 py-2 text-sm text-text-muted">
                    In stock
                  </span>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/"
                    hash="stores"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent-cta px-7 py-3 text-sm font-bold uppercase tracking-wider text-bg-base transition-transform hover:scale-105"
                  >
                    Find Old Glory
                  </Link>
                  <Link
                    to="/products"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-border-theme px-7 py-3 text-sm font-semibold text-text-primary hover:border-accent-primary hover:text-accent-primary"
                  >
                    View all products
                  </Link>
                </div>
              </header>
            </div>

            <section className="mt-16" aria-labelledby="pack-nutrition-heading">
              <h2
                id="pack-nutrition-heading"
                className="font-display text-3xl font-bold uppercase tracking-[0.015em] sm:text-4xl"
              >
                Packs &amp; nutritional facts
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base">
                Each bottle formulation is shown separately so its ingredients and nutritional facts
                remain tied to that exact pack.
              </p>

              <div className="mt-8 grid gap-6 xl:grid-cols-2">
                {variants.map((variant) => (
                  <section
                    key={variant.id}
                    className="rounded-3xl border border-border-theme bg-bg-surface p-5 shadow-lg sm:p-7"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-bold tracking-widest text-accent-primary uppercase">
                          {variant.packaging === "glass" ? "Glass range" : "PET range"}
                        </p>
                        <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-[0.015em]">
                          {getPackLabel(variant)}
                        </h2>
                      </div>
                      <span className="rounded-full bg-accent-cta px-4 py-2 font-display text-lg font-bold text-bg-base">
                        ₹{variant.price}
                      </span>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-xs font-bold tracking-widest text-text-primary uppercase">
                        Ingredients
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {variant.ingredients}
                      </p>
                    </div>

                    {variant.nutrition ? (
                      <NutritionFacts nutrition={variant.nutrition} accent={variant.color} />
                    ) : (
                      <p className="mt-5 rounded-2xl border border-border-theme p-5 text-sm text-text-muted">
                        Nutritional information coming soon
                      </p>
                    )}
                  </section>
                ))}
              </div>
            </section>

            <section
              className="mt-16 border-t border-border-theme pt-10"
              aria-labelledby="related-heading"
            >
              <h2 id="related-heading" className="font-display text-2xl font-bold uppercase">
                Explore more Old Glory flavours
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {INDEXABLE_PRODUCTS.filter((item) => item.slug !== product.slug).map((item) => (
                  <Link
                    key={item.id}
                    to="/products/$slug"
                    params={{ slug: item.slug }}
                    className="rounded-full border border-border-theme px-4 py-2 text-sm text-text-muted transition hover:border-accent-primary hover:text-accent-primary"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
