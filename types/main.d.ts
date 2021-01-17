/// <reference path="./transaction.d.ts" />

export type PageLink = {
  self: string;
  first: string;
  last: string;
};

export type ObjectLink = {
  0: {
    rel: string;
    uri: string;
  };
  self: string;
};

export type Meta = {
  pagination: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  };
};
