import { Component } from '@angular/core';
import { NoteProviderComponent } from '@test/client/note/feature/note-provider';
import { injectTRPCClient } from '../../trpc-client';

@Component({
  selector: 'demo-home',
  standalone: true,
  imports: [NoteProviderComponent],
  template: `<test-note-provider [router]="router"></test-note-provider>`,
})
export default class HomeComponent {
  protected readonly router = injectTRPCClient();
}
