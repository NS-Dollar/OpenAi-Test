import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, NgIf],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  form = { name: '', email: '', message: '' };
  sent = false;
  async submit() {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.form)
    });
    this.sent = true;
    this.form = { name: '', email: '', message: '' };
  }
}
