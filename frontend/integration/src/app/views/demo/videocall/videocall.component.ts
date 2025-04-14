import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common'

declare const ZegoUIKitPrebuilt: any;

@Component({
  selector: 'app-videocall',
  standalone: true,
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.scss'],
  imports: [NgIf],
})
export class VideocallComponent implements OnInit {
  roomID!: string
  userID!: string
  userName!: string
  started = false

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.roomID =
      this.route.snapshot.queryParamMap.get('roomID') ||
      Math.floor(Math.random() * 10000).toString()
    this.userID = Math.floor(Math.random() * 10000).toString()
    this.userName = `user${this.userID}`
  }

  startCall(): void {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(() => {
        this.initZego(this.roomID, this.userID, this.userName)
        this.started = true
      })
      .catch((err) => {
        console.error('❌ Permission error:', err)
        alert(
          '🚫 Autorisez la caméra et le micro (pas besoin de HTTPS ici car on est sur localhost).'
        )
      })
  }

  private initZego(roomID: string, userID: string, userName: string) {
    try {
      const appID = 624742073;
      const serverSecret = 'daead3937ccbfa4b4133779d31baaada';

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: document.querySelector('#root'),
        sharedLinks: [
          {
            name: 'Personal link',
            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        turnOnMicrophoneWhenJoining: true,
        turnOnCameraWhenJoining: true,
        showMyCameraToggleButton: true,
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: true,
        showTextChat: true,
        showUserList: true,
        maxUsers: 2,
        layout: 'Auto',
        showLayoutButton: false,
      });
    } catch (error) {
      console.error("ZEGOCLOUD initialization failed", error);
    }
  }
}
