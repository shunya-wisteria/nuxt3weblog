import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";
import type { Category } from "./category";
import type { Tag } from "./tag"

export type Post = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  revisedAt?: string;
  title?: string;
  abstract?: string;
  eyecatch?: MicroCMSImage | null;
  toc?: boolean;
  body?: string;
  category?: Category;
  tags?: (MicroCMSListContent & Tag) | null;
  body_old?: string | null;
}
