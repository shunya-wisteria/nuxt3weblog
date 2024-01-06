import type { MicroCMSImage } from "microcms-js-sdk";

export type TopLink = {
  fieldId?: string;
  title?: string;
  url?: string;
  photo?: MicroCMSImage;
  external?: boolean
}