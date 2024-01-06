import type { TopLink } from "./toplink";
import type { Post } from "./post";
import type { MicroCMSImage } from "microcms-js-sdk"

export type PageInfo = {
  title?: string;
  subTitle?: string;
  author?: string;
  portalEyecatch?: MicroCMSImage;
  portalEyecatchCom?: string|null;
  pickupEntry?: Post;
  topLink1?: TopLink;
  topLink2?: TopLink;
  topLink3?: TopLink;
}