import { AfterViewInit, Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

declare const ZegoUIKitPrebuilt: any;

@Component({
  selector: 'app-videocall',
  standalone: true,
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.scss'],
})
export class VideocallComponent implements AfterViewInit {
  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    const roomID = this.route.snapshot.queryParamMap.get('roomID') || Math.floor(Math.random() * 10000).toString();
    const userID = Math.floor(Math.random() * 10000).toString();
    const userName = this.route.snapshot.queryParamMap.get('username') || `userName${userID}`;

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
  }
}
