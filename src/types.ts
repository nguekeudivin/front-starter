export interface ImageFile {
  file: File | undefined;
  src: string;
  id: string;
}

export interface VideoFile {
  file: File | undefined;
  src: string;
  id: string;
}

export type ID = string | number;
