import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleComponent} from './article/article.component';
import {ColouredTextComponent} from './coloured-text/coloured-text.component';
import {HeaderComponent} from './header/header.component';
import {SafeTdComponent} from './safe-td/safe-td.component';
import { DropdownComponent } from './dropdown/dropdown.component';



@NgModule({
  declarations: [
    ArticleComponent,
    ColouredTextComponent,
    HeaderComponent,
    SafeTdComponent,
    DropdownComponent,
  ],
  exports: [
    ArticleComponent,
    ColouredTextComponent,
    HeaderComponent,
    SafeTdComponent,
    DropdownComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
