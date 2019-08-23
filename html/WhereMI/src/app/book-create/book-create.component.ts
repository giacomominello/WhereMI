import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
selector: 'app-book-create',
templateUrl: './book-create.component.html',
styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

books = { isbn: '', title: '' , author: '', publisher: ''};
message = '';
constructor(private http: HttpClient, private router: Router) { }

ngOnInit() {

}

saveBook() {
const httpOptions = {
headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
};
this.http.post('/api/book', this.books, httpOptions).subscribe(resp => {
console.log(resp);
this.router.navigate(['books']);
}, err => {
this.message = err.error.msg;
});
}
}