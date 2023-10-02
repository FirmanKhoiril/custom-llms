export type TData = {
  chatId: string;
  _id: string;
  transcript: TConversation[];
};
export interface IData {
  data: {
    chatId: string;
    _id: string;
    transcript: [TContent];
  };
}
export type Type = {
  input: string;
  title: string | any;
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
    contentBot: {
      createdAt: string;
      _id: string;
      title: string;
      role: string;
      content: string;
    };
    createdAt: string;
    _id: string;
    title: string;
  };
  chatId?: string | any;
  i?: number | any;
  title?: string | any;
}
export type TConversation = {
  role: string;
  content: string;
  contentBot: {
    createdAt: string;
    _id: string;
    title: string;
    role: string;
    content: string;
  };
  createdAt: string;
  title: string;
  _id: string;
};

export type TContent = {
  chatId: string | any;
  transcript: [
    {
      role: string;
      content: string;
      contentBot: {
        createdAt: string;
        _id: string;
        title: string;
        role: string;
        content: string;
      };
      createdAt: string;
      title: string;
      _id: string;
    }
  ];
};
