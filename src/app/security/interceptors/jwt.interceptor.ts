import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiauthService } from "src/app/services/apiauth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(
        private apiauthService: ApiauthService
    ) {

    }

    // Si el usuario esta logeado, le añadimos el token a todas las llamadas http que hagamos
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const usuario = this.apiauthService.usuarioData;

        if (usuario) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${usuario.token}`
                }
            })
        }

        return next.handle(request);
    }
}