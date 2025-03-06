import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatbotService } from '@/app/services/ChatBotService';
import { FormsModule } from '@angular/forms';

// Déclarer TidioChatApi comme une variable globale
declare const TidioChatApi: any;

@Component({
  selector: 'help-center-banner',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './banner.component.html',
  styles: ``,
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit, OnDestroy {
  userMessage: string = '';
  private tidioScript!: HTMLScriptElement;

  constructor(
    private chatbotService: ChatbotService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // Charger dynamiquement le script Tidio
    this.tidioScript = this.renderer.createElement('script');
    this.tidioScript.src = '//code.tidio.co/kwrw4szydtorxb1eetgqkiistclkio1r.js';
    this.tidioScript.async = true;
    this.renderer.appendChild(document.body, this.tidioScript);
  }

  ngOnDestroy() {
    // Supprimer le script Tidio lorsque le composant est détruit
    if (this.tidioScript) {
      this.renderer.removeChild(document.body, this.tidioScript);
    }
  }

  openChatbot() {
    // Ouvrir le chatbot Tidio
    if (window.TidioChatApi) {
      window.TidioChatApi.open();
    } else {
      console.error('TidioChatApi is not available.');
    }
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      // Envoyer le message au backend
      this.chatbotService.sendMessage(this.userMessage).subscribe({
        next: (response) => {
          console.log('Chatbot response:', response);
        },
        error: (err) => {
          console.error('Failed to send message:', err);
        },
      });
      this.userMessage = ''; // Effacer le champ de saisie après l'envoi
    }
  }
}