import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: 'img[appPreview]',
})
export class PreviewDirective implements OnChanges {
  @Input()
  file: File;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    const el = this.el;
    const reader = new FileReader();
    reader.onload = (event) => {
      el.nativeElement.src = event.target.result;
    };
    reader.readAsDataURL(this.file);
  }
}
