import { Component, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/shared/api/user.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { distinctUntilChanged, debounceTime, switchMap, map, first } from 'rxjs/operators';
import { Message } from 'src/app/shared/models/message';
import { ChatService } from 'src/app/shared/api/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './page-chat.component.html',
    styleUrls: ['./page-chat.component.scss']
})
export class PageChatComponent {
    title = 'ClientApp';
    txtMessage: string = '';
    uniqueID: string = new Date().getTime().toString();
    messages = new Array<Message>();
    message = new Message();


    constructor(private chatService: ChatService, private _ngZone: NgZone) {
        this.subscribeToEvents();
    }
    ngOnInit(): void {
    }

    sendMessage(): void {
        if (this.txtMessage) {
            this.message = new Message();
            this.message.clientuniqueid = this.uniqueID;
            this.message.type = "sent";
            this.message.message = this.txtMessage;
            this.message.date = new Date();
            this.messages.push(this.message);
            this.chatService.sendMessage(this.message);
            this.txtMessage = '';
        }
    }
    private subscribeToEvents(): void {

        this.chatService.messageReceived.subscribe((message: Message) => {
            this._ngZone.run(() => {
                if (message.clientuniqueid !== this.uniqueID) {
                    message.type = "received";
                    this.messages.push(message);
                }
            });
        });
    }

}
