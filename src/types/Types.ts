export type TData = {
  title: string;
  _id: string;
  transcript: [TContent];
};

export interface ILoading {
  width?: number;
  height?: number;
}
export interface IForm {
  chatId?: any | string;
}
export interface IConversation {
  item: {
    role: string;
    content: string;
    title: string;
  };
  chatId?: string | any;
  title?: string | any;
}
export type TConversation = {
  role: string;
  content: string;
  title: string;
};

export type TContent = {
  title: string;
  transcript: [
    {
      role: string;
      content: string;
      title: string;
    }
  ];
};
