import { unstable_noStore as noStore } from "next/cache";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";

import qs from "qs";
import { SectionProps } from "@/lib/types/types";
import AboutUsHome from "@/components/layout/home/AboutUsHome";
import { SectionPage } from "@/components/layout/SectionPage";

export const revalidate = 3600; // revalidate the data at most every hour

const baseUrl = getStrapiURL();

async function fetchData(url: string) {
  noStore();
  const authToken = null; // we will implement this later getAuthToken() later
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken ? `Bearer ${authToken}` : "",
    },
  };

  try {
    const response = await fetch(url, headers);
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export function blockRenderer(block: SectionProps, slug: string) {
  // if (slug === "home") {
  //   switch (block.identifier) {
  //     case "homepage.about-us":
  //       return <SectionPage key={block.id} sectionLayoutType={block.layoutType || ''} bgColor={block.bgColor}><AboutUsHome /></SectionPage>;
  //     default:
  //       return null;
  //   }
  // }


  return null;
}

export async function getPageData(slug: string) {
  const url = new URL("/api/pages", baseUrl);

  url.search = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      sections: {
        populate: {
          image: {
            populate: true,
          },
          headline: {
            populate: true,
          },
          paragraph: {
            populate: true,
          },
          button: {
            populate: true,
          },
          identifier: {
            populate: true,
          },
          bgcolor: {
            populate: true,
          },
          layoutType: {
            populate: true,
          }

        },
      },
    },
    fields: ["title", "slug", "layoutType", "description"],
    pagination: {
      pageSize: 10,
      page: 1,
    },
    publicationState: "live",
  });

  return await fetchData(url.href);
}

export const getPageMetadata = async (slug: string) => {
  const url = new URL("/api/pages", baseUrl);

  url.search = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    fields: ["title", "description"],
    pagination: {
      pageSize: 10,
      page: 1,
    },
    publicationState: "live",
  });

  return await fetchData(url.href);
};

export async function getGlobalPage() {
  const url = new URL("/api/setting", baseUrl);

  url.search = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.SociaLink",
    ],
  });

  return await fetchData(url.href);
}
