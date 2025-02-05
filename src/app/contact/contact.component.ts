import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, visibility, expand }  from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType= ContactType;
  @ViewChild('fform') feedbackFormDirective;
  feed: Feedback;
  feedbackErrMess:string;
  flag:boolean;
    formErrors={
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':''
  };

  validationMessage={
    'firstname':{
      'required':  'First name is required',
      'minlength': 'First name must be atleast 2 characters long',
      'maxlength': 'First name can not be more than 25 characters long'
    },
    'lastname':{ 
      'required':  'last name is required',
      'minlength': 'last name must be atleast 2 characters long',
      'maxlength': 'last name can not be more than 25 characters long'
    },
    'telnum':{
      'required':  'Tel. number is required',
      'pattern':  'Tel. number must contain only numbers'
    },
    'email':{
      'required':  'Email is required',
      'email':  'Email not in valid format'
    }
  };
 
  constructor(private fb : FormBuilder,
    private feedbackService: FeedbackService) {
    this.createForm();
   }
   
  ngOnInit(): void {
  }

  createForm(){
    this.feedbackForm=this.fb.group({
      firstname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      lastname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      telnum: [0,[Validators.required,Validators.pattern]],
      email: ['',[Validators.required,Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackForm.valueChanges
    .subscribe(data=>this.onValueChanged(data));
    this.onValueChanged();  //(re)set form validation messages
  }

  onValueChanged(data?: any){
    if(!this.feedbackForm){
      return ;
    }
    const form = this.feedbackForm;
    for( const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)){
        //clear previous messages if any
        this.formErrors[field]='';
        const control= form.get(field);
        if(control && control.dirty && !control.valid){
          const messages= this.validationMessage[field];
          for (const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field]+=messages[key]+' ';
            }
          }
        }
      }
    }
  }

  onSubmit(){
    this.flag=true;
    this.feed=this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackService.submitFeedback(this.feed)
      .subscribe(feedback=>{setTimeout(()=>{this.feedback=feedback;this.flag=false;
        setTimeout(()=>this.feedback=null,5000)
        },2000)},  
      err=>{this.feedbackErrMess=err});
     this.feedbackFormDirective.resetForm();
    this.feedbackForm.reset({
        firstname:'',
        lastname:'',
        telnum:0,
        email:'',
        agree:false,
        contacttype:'None',
        message:''
      });
   
  }
}
