import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import {Socket, Server} from 'socket.io';

@WebSocketGateway(3001)
export class OrderGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    wsClients: Array<Socket> = new Array<Socket>();

    handleConnection(client: Socket): void {
        console.log(`New connecting... socket id:`);
        this.wsClients.push(client)
    }

    handleDisconnect(client: Socket): void {
        
        console.log(`Disconnection... socket id:`);
        for (let i = 0; i < this.wsClients.length; i++) {
            if (this.wsClients[i] === client) {
              this.wsClients.splice(i, 1);
              break;
            }
        }
    }

    sendMessage(message: any) {
        
        const broadCastMessage = JSON.stringify(message);
        for (let c of this.wsClients) {
            c.send(broadCastMessage);
        }
    }
}