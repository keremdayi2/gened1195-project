interface MessageItem {
    role: string;
    content: string;
  }

type ChatbotListProps = {
    messages : MessageItem[],
    setMessages : React.Dispatch<React.SetStateAction<MessageItem[]>>;
};

const ChatbotList : React.FC<ChatbotListProps>= ({messages, setMessages}) => {

    const handleTextboxChange = (event: any) => {
        let message = {role : 'user', content : event.target.value};
        let updatedMessages = [...messages];
        const lastIdx = updatedMessages.length-1;
        if (updatedMessages[lastIdx].role === 'user') {
            updatedMessages[updatedMessages.length-1] = message;
        } else {
            updatedMessages.push(message);
        }
        
        setMessages(updatedMessages);
    };

    const messageToHTML = (message : MessageItem, idx : number) => {
        // const user = message.role === 'user' ? 'You' : 'AI';
        const borderColor = message.role === 'user' ? 'border-amber-500' : 'bolder-gray-500';

        if (idx < messages.length - 1) {
            return (<li className={"border-1 " + borderColor} key={idx}>{message.content}</li>);
        } else {
            return <li className={"border-1 " + borderColor} key={idx}><input type='text' placeholder={message.content} onChange={handleTextboxChange}></input></li>
        }

        
    };

    return <div className="w-full">
        <ul className='flex flex-col items-baseline'>
        {messages.map((item, idx) => messageToHTML(item, idx))}
    </ul>
        </div>
};

export default ChatbotList;