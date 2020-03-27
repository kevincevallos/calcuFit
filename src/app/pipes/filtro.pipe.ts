import { Pipe, PipeTransform } from '@angular/core';
import { Alimento } from '../alimento';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(alimentos: Alimento[], texto: string): Alimento[] {
    if (texto.length === 0) {
      return alimentos;
    }
    texto == texto.toLowerCase();

    return alimentos.filter(alimento => {
      return alimento.nombreAlimento.toLowerCase().includes(texto);
    });
  }

}
