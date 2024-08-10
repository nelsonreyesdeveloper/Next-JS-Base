import { blockRenderer, getPageData, getPageMetadata } from "../data/loades";
import type { Page, SectionProps } from "@/lib/types/types";
import LayoutPage from "@/components/layout/LayoutPage";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import { SectionPage } from "@/components/layout/SectionPage";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props) {
  const response = await getPageMetadata(params.slug);
  return {
    title: response.data[0].title,
    description: response.data[0].description,
  };
}

export default async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const pages = await getPageData(params.slug);

  if (pages.data.length === 0) {
    throw new Error("Page not found");
  }

  const page: Page = pages.data[0];
  const { sections } = page;

  return (
    <LayoutPage>
      <SectionPage sectionLayoutType={page.layoutType} bgColor={"bg-white"}>
        <Header></Header>
      </SectionPage>

      {sections.map((block: SectionProps) => blockRenderer(block, params.slug))}

      <SectionPage sectionLayoutType={page.layoutType} bgColor={"bg-white"}>
        <Footer></Footer>
      </SectionPage>
    </LayoutPage>
  );
}
