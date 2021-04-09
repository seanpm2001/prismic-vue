import type { ApiOptions } from "@prismicio/client/types/Api";

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const PrismicKey = "prismic";

export type ClientOptions = Record<string, never>;
export type DOMOptions = Record<string, never>;
export interface ComponentsOptions {
  link: {
    anchorTag: string;
    frameworkLink: string;
    blankTargetRelAttribute: string;
  };
}

export interface PrismicPluginOptions {
  endpoint: string;
  apiOptions?: ApiOptions;

  linkResolver?: LinkResolver;
  htmlSerializer?: HtmlSerializer<string>;

  client?: boolean | DeepPartial<ClientOptions>;
  dom?: boolean | DeepPartial<DOMOptions>;
  components?: boolean | DeepPartial<ComponentsOptions>;
}

export enum PrismicPluginError {
  MissingEndpoint = "[@prismicio/vue] Property `endpoint` is mandatory"
}

// Fields
export type RichTextField = RichTextBlock[];

interface LinkFieldRaw extends Partial<LinkResolverDoc> {
  url?: string;
}

export interface LinkField extends LinkFieldRaw {
  link_type?: string;
  _linkType?: string;
  linkType?: string;
  value?: { document: LinkFieldRaw; isBroken?: boolean };
  target?: string;
}

export interface ImageField {
  url: string;
  alt?: string;
  copyright?: string;
}

export interface EmbedField {
  html: string;
  embed_url?: string;
  type?: string;
  provider_name?: string;
}

// Missing types from underlying kits
export interface LinkResolverDoc {
  id: string;
  uid: string;
  type: string;
  tags: string[];
  lang: string;
  slug?: string;
  isBroken?: boolean;
}

export type LinkResolver = (doc: LinkResolverDoc) => string;

export interface RichTextSpan {
  start: number;
  end: number;
  type: string;
  text: string;
}

export interface RichTextBlock {
  type: string;
  text: string;
  spans: RichTextSpan[];
}

export type HtmlSerializer<T> = (
  type: string,
  element: RichTextBlock | RichTextSpan,
  text: string | null,
  children: T[],
  index: number
) => T | null;