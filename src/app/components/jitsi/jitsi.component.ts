import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import {Router} from '@angular/router';

declare var JitsiMeetExternalAPI: any;

@Component({
    selector: 'app-jitsi',
    templateUrl: './jitsi.component.html',
    styleUrls: ['./jitsi.component.scss']
})
export class JitsiComponent implements OnInit, AfterViewInit {
    domain = 'meet.jit.si';
    room: any;
    options: any;
    api: any;
    user: any;

    @Input() id: string;
    @Input() name?: string;
    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.room = this.id;
        this.user = {
            name: this.name || 'Anonymous user'
        }
    }

    ngAfterViewInit(): void {
        this.options = {
            roomName: this.room,
            configOverwrite: { prejoinPageEnabled: false },
            interfaceConfigOverwrite: {
                // overwrite interface properties
            },
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: {
                displayName: this.user.name
            }
        };

        this.api = new JitsiMeetExternalAPI(this.domain, this.options);

        // Event handlers
        this.api.addEventListeners({
            readyToClose: this.handleClose,
            participantLeft: this.handleParticipantLeft,
            participantJoined: this.handleParticipantJoined,
            videoConferenceJoined: this.handleVideoConferenceJoined,
            videoConferenceLeft: this.handleVideoConferenceLeft,
            audioMuteStatusChanged: this.handleMuteStatus,
            videoMuteStatusChanged: this.handleVideoStatus
        });
    }

    handleClose = () => {
        console.log('handleClose');
    };

    handleParticipantLeft = async (participant) => {
        console.log('handleParticipantLeft', participant); // { id: "2baa184e" }
        const data = await this.getParticipants();
    };

    handleParticipantJoined = async (participant) => {
        console.log('handleParticipantJoined', participant);
        const data = await this.getParticipants();
    };

    handleVideoConferenceJoined = async (participant) => {
        console.log('handleVideoConferenceJoined', participant);
        const data = await this.getParticipants();
    };

    handleVideoConferenceLeft = () => {
        this.router.navigateByUrl('/home');
    };

    handleMuteStatus = (audio) => {
        console.log('handleMuteStatus', audio); // { muted: true }
    };

    handleVideoStatus = (video) => {
        console.log('handleVideoStatus', video); // { muted: true }
    };

    getParticipants() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.api.getParticipantsInfo()); // get all participants
            }, 500)
        });
    }
}
