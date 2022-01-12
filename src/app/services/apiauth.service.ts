import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { LoginComponent } from "../login/login.component";
import { Login } from "../models/login";
import { Response } from "../models/response";
import { Usuario } from "../models/usuario";

const httpOption = {
    headers: new HttpHeaders({
      'Contend-Type': 'application/json'
    })
  };

@Injectable({
    providedIn: 'root'
})
export class ApiauthService {
    url: string = 'https://localhost:44322/api/user/login';

    private usuarioSubject: BehaviorSubject<Usuario | null> =  new BehaviorSubject<Usuario | null>(null);

    public usuario: Observable<Usuario | null> = new Observable<Usuario | null>();

    public get usuarioData(): Usuario | null {
        return this.usuarioSubject.value;
    }

    constructor( private _http: HttpClient){
        var jsonUser = localStorage.getItem('usuario');
        if (jsonUser != null) {
            this.usuarioSubject = new BehaviorSubject<Usuario | null>(JSON.parse(jsonUser));
        }
        this.usuario = this.usuarioSubject.asObservable();
        
    }

    login(login: Login): Observable<Response>{
        // Pipe permite analizar los datos que devuelve la llamada antes de guardarlos
        return this._http.post<Response>(this.url, login, httpOption).pipe(
            map(res => {
                if(res.exito == 1) {
                    const user: Usuario = res.data;
                    localStorage.setItem('usuario',JSON.stringify(user));
                    this.usuarioSubject.next(user);
                }
                return res;
            })
        );
    }

    logout(){
        localStorage.removeItem('usuario');
        this.usuarioSubject.next(null);
    }
}