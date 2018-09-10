import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  selectedFile: File = null;

  @Input()
  imageUrl: string;

  @Output()
  output: EventEmitter<File> = new EventEmitter<File>();

  constructor() { }

  ngOnInit() {
  }

  detectFiles(event) {
    this.selectedFile = event.target.files[0];
    this.readUrl(event.target);
    this.output.emit(this.selectedFile);
  }

  readUrl(input) {
    if(input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e) => {
        // @ts-ignore
        if (e.target.result) {
          // @ts-ignore
          this.imageUrl = e.target.result;
        }
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

}
