// Se utiliza para tratar el tipo de respuestas que devuelve el backend
export interface Response {
    exito: number;
    mensaje: string;
    data: any;
}