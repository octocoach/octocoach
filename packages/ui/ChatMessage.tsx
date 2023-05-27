import * as Unicons from "@iconscout/react-unicons";

export const ChatMessage = ({
  text,
  name,
  time,
  side
}: {
  text: string;
  name: string;
  time: Date;
  side: "start" | "end";
}) => (
  <div className={`chat chat-${side}`}>
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <Unicons.UilRobot />
      </div>
    </div>
    <div className="chat-header">
      <span className="mr-2">{name}</span>
      <time className="text-xs opacity-50">{time.toDateString()}</time>
    </div>
    <div className="chat-bubble">{text}</div>
    <div className="chat-footer opacity-50">Delivered</div>
  </div>
);
