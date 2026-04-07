import { articles } from "@/lib/articles";
import { notFound } from "next/navigation";
import ArticleDetail from "./ArticleDetail";

export function generateStaticParams() {
    return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);
    if (!article) notFound();
    return <ArticleDetail article={article} />;
}
