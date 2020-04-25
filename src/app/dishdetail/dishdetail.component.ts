import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from 'src/app/shared/dish';
import { Params } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service'
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish:Dish;
  dishIds: string[];
  prev:string;
  next:string;
  addCommentForm: FormGroup;
  addComment: Comment;
  @ViewChild('cform') commentFormDirective;
  rating:number=5;

  formErrors={
    'author':'',
    'comment':''
  };

  validationMessage={
    'author':{
      'required':'Author Name is required.',
      'minlength': 'Author Name must be atleast 2 characters long',
      'maxlength': 'Author name can not be more than 25 characters long'
    },
    'comment':{
      'required':'Comment is required.',
      'minlength': 'Comment must be atleast 2 characters long',
    }
  }

  constructor(private dishService:DishService,
    private route:ActivatedRoute,
    private location:Location,
    private fb: FormBuilder) {
      this.createForm();
     }

  ngOnInit(): void {
    this.dishService.getDishIds()
    .subscribe((dishIds)=> this.dishIds=dishIds);
    this.route.params.pipe(switchMap((params:Params)=>this.dishService.getDish(params['id'])))
    .subscribe((dish)=>{this.dish=dish ; this.setPrevNext(dish.id)});
  }

  setPrevNext(dishId:string){
    const index= this.dishIds.indexOf(dishId);
    this.prev=this.dishIds[(this.dishIds.length+index-1)%this.dishIds.length];
    this.next=this.dishIds[(this.dishIds.length+index+1)%this.dishIds.length];
  }

  goBack():void{
    this.location.back();
  }

  createForm(){
    this.addCommentForm=this.fb.group({
      author:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      comment:['',[Validators.required,Validators.minLength(2)]],
      rating:this.rating
    });
    this.addCommentForm.valueChanges
    .subscribe(data=>this.onValueChanged(data));
    this.onValueChanged();

  }
  onValueChanged(data?:any){
    if (!this.addCommentForm){
      return;
    }
    const form = this.addCommentForm;
    for( const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field]='';
        const control= form.get(field);
        if(control && control.dirty && !control.valid){
          const messages=this.validationMessage[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field]+=messages[key]+' ';
            }
          }
        }
      }
    }
  }

  onSubmit(){
    this.addComment=this.addCommentForm.value;
    this.addComment.date= new Date().toISOString();
    this.dish.comments.push(this.addComment);
    this.commentFormDirective.resetForm();
    this.addCommentForm.reset({
      author:'',
      comment:'',
      rating:this.rating
    });
  }
}
