import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rich-text-area',
  templateUrl: './rich-text-area.component.html',
  styleUrls: ['./rich-text-area.component.css']
})
export class RichTextAreaComponent {
  activateRTL(editor) {
    editor.format('align', 'right')
    editor.format('direction', 'rtl')
    console.log(editor);
  }
}
