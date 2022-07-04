import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator } from '@angular/forms';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor() {}
  contactForm!: FormGroup;
  ngOnInit(): void {
    this.initContactForm();
  }

  initContactForm() {
    // this.contactForm = this.formBuilder.group({
    //   name: '',
    //   email: ['', [Validators.required, Validators.email]],
    //   subject: '',
    //   message: ['', [Validators.required, Validators.minLength(10)]],
    // });
  }

  submit() {}
}
