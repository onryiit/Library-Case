import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appEnterKey]'
})
export class EnterKeyDirective {
  @Output() enterPressed = new EventEmitter<void>();

  @HostListener('document:keydown.enter', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    this.enterPressed.emit();
  }
}
