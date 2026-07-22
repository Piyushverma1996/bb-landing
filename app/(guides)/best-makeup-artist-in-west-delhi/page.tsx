import type { Metadata } from "next";
import GuideArticle, { guideMetadata } from "../GuideArticle";

const SLUG = "best-makeup-artist-in-west-delhi";
export const metadata: Metadata = guideMetadata(SLUG);
export default function Page() {
  return <GuideArticle slug={SLUG} />;
}
