import type { Metadata } from "next";
import GuideArticle, { guideMetadata } from "../GuideArticle";

const SLUG = "best-bridal-makeup-artist-in-delhi";
export const metadata: Metadata = guideMetadata(SLUG);
export default function Page() {
  return <GuideArticle slug={SLUG} />;
}
