export interface ResponseStatus {
  code: number;
  id?: number;
}

export interface DBStructure {
  id: number;
  title: string;
  url: string;
  previewUrl: string; // url 一つを使って、frontend から、前に単語をつけることもできますが、あれは危ないんでしょう？
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImageDetail {
  id: number;
  title: string;
  url: string;
  author: string;
  createdAt: Date | number;
  updatedAt: Date | number;
}

export interface ImagePreview {
  id: number;
  title: string;
  previewUrl: string;
}

export interface UploadForm {
  title: string;
  author: string;
}
