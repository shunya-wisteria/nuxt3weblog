import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";

export type About = {
  about?: string;
  author?: string;
  desc?: string;
  prof?: MicroCMSImage | null;
  sns?: any;
}