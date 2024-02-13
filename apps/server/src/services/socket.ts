import { Server } from "socket.io";
import { Redis } from "ioredis";

const pub = new Redis({
  host: "redis-2ca988c0-scalable-chat0.a.aivencloud.com",
  port: 13164,
  username: "default",
  password: "AVNS_lucPH6dLiytRVYv0xfJ",
});
const sub = new Redis({
  host: "redis-2ca988c0-scalable-chat0.a.aivencloud.com",
  port: 13164,
  username: "default",
  password: "AVNS_lucPH6dLiytRVYv0xfJ",
});
class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init Socket Server...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });

    sub.subscribe("MESSAGES");
  }

  public initListeners() {
    const io = this.io;
    console.log("Initialize socket listeners...");

    io.on("connect", (socket) => {
      console.log(`New Socket Connected: ${socket.id}`);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New Message Received", message);

        //publish this message to redis
        //sending message from socket server to redis
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    
  sub.on('message', async(channel, message) => {
    if(channel === 'MESSAGES') {
        console.log('new msg from redis', message)
        io.emit('message',message);
    }
  })
  }


  get io() {
    return this._io;
  }
}

export default SocketService;
