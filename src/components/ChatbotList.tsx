import Markdown from "react-markdown";

interface MessageItem {
  role: string;
  content: string;
}

type ChatbotListProps = {
  messages: MessageItem[];
  setMessages: React.Dispatch<React.SetStateAction<MessageItem[]>>;
};

const defaultMessages = [{role : 'user', content : 'Generate me a recipe.'}];

const ChatbotList: React.FC<ChatbotListProps> = ({ messages, setMessages }) => {
  const handleTextboxChange = (event: any) => {
    let message = { role: "user", content: event.target.value };
    let updatedMessages = [...messages];
    const lastIdx = updatedMessages.length - 1;
    if (updatedMessages[lastIdx].role === "user") {
      updatedMessages[updatedMessages.length - 1] = message;
    } else {
      updatedMessages.push(message);
    }

    setMessages(updatedMessages);
  };

  const messageToHTML = (message: MessageItem, idx: number) => {
    // const user = message.role === 'user' ? 'You' : 'AI';
    const borderColor =
      message.role === "user" ? "border-amber-500" : "border-gray-500";

    const inner =
      (idx < messages.length - 1 || message.role === 'assistant') ? (
        <div className="markdown">
          <Markdown>{message.content}</Markdown>
        </div>
      ) : (
        <textarea
          className="w-full focus:outline-none focus:ring-0 "
          onChange={handleTextboxChange}
          placeholder="Ask AI..."
        ></textarea>
      );

    return (
      <li
        className={"w-full border-1 p-2 my-2 overflow-y-scroll " + borderColor + " rounded-md"}
        key={idx}
      >
        <div className='flex flex-col'>
        {idx < messages.length -1 ? <p className='text-gray-900 font-bold text-2xl mb-2'>{message.role === 'user' ? 'You' : 'AI'}</p> : ''}
        {inner}
        </div>
        
      </li>
    );
  };

  return (
    <div className="flex flex-col w-full items-center m-2 ">
      
      <div className='flex flex-row items-center'>
      <h1>Chat History</h1>
      <button className='mx-2 border-1 rounded-sm px-1 bg-amber-300 text-gray-900 hover:bg-amber-200' onClick={() => setMessages(defaultMessages)}>Reset</button>
      </div>
      <div className="w-full overflow-y-scroll">
      <ul className="flex flex-col items-baseline">
        {messages.map((item, idx) => messageToHTML(item, idx))}
      </ul>
    </div>
    </div>
  );
};

export default ChatbotList;
