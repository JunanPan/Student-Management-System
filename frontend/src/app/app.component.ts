import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from './student';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  
  public students: Student[] = [];
  public updateStudent:Student | undefined;
  public deleteStudent: Student | undefined;
  constructor(private studentService:StudentService){}

  ngOnInit(): void {
    this.getStudents();
  }

  public getStudents(): void{
    this.studentService.getStudents().subscribe(
      (response:Student[])=>{
        this.students=response
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
      );
  }

  public onAddStudent(addForm: NgForm):void{
    document.getElementById('add-student-form')?.click();
    this.studentService.addStudent(addForm.value).subscribe(
      (response:Student)=>{
        console.log(response);
        this.getStudents();
        addForm.reset();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateStudent(student: Student):void{
    document.getElementById('add-student-form')?.click();
    this.studentService.updateStudent(student).subscribe(
      (response:Student)=>{
        console.log(response);
        this.getStudents();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  public onDeleteStudent(studentId: number|undefined):void{
    this.studentService.deleteStudent(studentId).subscribe(
      (response:void)=>{
        console.log(response);
        this.getStudents();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

  public searchStudents(key:string):void{
    const results:Student[] = [];
    for (const student of this.students){
      if(student.name.toLowerCase().indexOf(key.toLowerCase())!==-1||
         student.email.toLowerCase().indexOf(key.toLowerCase())!==-1||
         student.major.toLowerCase().indexOf(key.toLowerCase())!==-1||
         student.phone.toLowerCase().indexOf(key.toLowerCase())!==-1)
         {
        results.push(student)
      }
    }
    this.students=results;
    // if (results.length===0||key===''){
    //   this.getStudents();
    // }
    if (key===''){
      this.getStudents();
    }
  }

  public onOpenModal(student:Student|undefined,mode:string):void{
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addStudentModal');
    }
    else if(mode==='update'){
      this.updateStudent = student;
      button.setAttribute('data-target','#updateStudentModal');
    }
    else if(mode==='delete'){
      this.deleteStudent = student;
      button.setAttribute('data-target','#deleteStudentModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
