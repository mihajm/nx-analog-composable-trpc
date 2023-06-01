import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NoteRouter } from '@test/shared/note/data-access/note-router';

@Component({
  selector: 'test-note-provider',
  standalone: true,
  imports: [CommonModule],
  template: `<button (click)="createNote()">Create a note</button>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteProviderComponent {
  @Input({ required: true }) router!: NoteRouter; // should probably be done through DI, but this is simpler

  protected createNote() {
    this.router.note.create.mutate({ title: 'A note' });
  }
}
