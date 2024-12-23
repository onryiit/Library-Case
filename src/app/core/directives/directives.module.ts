import { NgModule } from '@angular/core';
import { HighlightDirective } from './highlight/highlight.directive';
import { EnterKeyDirective } from './keyPress/keyPress.directive';


@NgModule({
  declarations: [HighlightDirective,EnterKeyDirective ],
  imports: [],
  providers: [],
  bootstrap: [],
  exports: [HighlightDirective,EnterKeyDirective ],
})
export class DirectiveModule {}
