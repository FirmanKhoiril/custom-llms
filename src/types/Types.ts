export type TData = {
  title: string;
  _id: string;
  transcript: [TContent];
};

export interface IConversation {
  item: {
    role: string;
    content: string;
    title: string;
  };
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
