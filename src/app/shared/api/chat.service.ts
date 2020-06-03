import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Message } from '../models/message';
import { environment } from 'src/environments/environment';

@Injectable()
export class ChatService {
    public host: string = environment.SERVER_API_URL;
    
    private apiUrlMessageHub = this.host + 'MessageHub'
    messageReceived = new EventEmitter<Message>();
    connectionEstablished = new EventEmitter<Boolean>();

    private connectionIsEstablished = false;
    private _hubConnection: HubConnection;

    constructor() {
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }

    sendMessage(message: Message) {
        this._hubConnection.invoke('NewMessage', message);
    }

    private createConnection() {
        this._hubConnection = new HubConnectionBuilder()
            .withUrl(this.apiUrlMessageHub)
            .build();
    }

    private startConnection(): void {
        this._hubConnection
            .start()
            .then(() => {
                this.connectionIsEstablished = true;
                console.log('Hub connection started');
                this.connectionEstablished.emit(true);
            })
            .catch(err => {
                console.log('Error while establishing connection, retrying...');
                setTimeout(function () { this.startConnection(); }, 5000);
            });
    }

    private registerOnServerEvents(): void {
        this._hubConnection.on('MessageReceived', (data: any) => {
            this.messageReceived.emit(data);
        });
    }
}    