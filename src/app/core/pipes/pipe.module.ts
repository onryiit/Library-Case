import { NgModule } from '@angular/core';

import { UpperCase } from './upperCasePipe.pipe';
import { TimeTransform } from './timeTransform.pipe';


@NgModule({
  declarations: [UpperCase,
    TimeTransform
  ],
  imports: [],
  providers: [],
  bootstrap: [],
  exports: [UpperCase,TimeTransform],
})
export class PipeModule {}
