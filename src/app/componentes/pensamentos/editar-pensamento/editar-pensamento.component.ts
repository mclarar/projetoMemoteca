import { Component, OnInit } from '@angular/core';

import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lowercaseValidator } from "./lowercase"

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css'],
})
export class EditarPensamentoComponent implements OnInit {

  form! : FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {};

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.form = this.formBuilder.group({
        id: [pensamento.id],
        conteudo: [
          pensamento.conteudo,
          Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/), 
          ]),
        ],
        autoria: [
          pensamento.autoria,
          Validators.compose([
            Validators.required,
            lowercaseValidator,
            Validators.minLength(3),
            // Validators.pattern('^[a-z ]*$')
          ]),
        ],
        modelo: [pensamento.modelo],
      });

      console.log(`FormConteudo: ${this.form.get('id')?.value}; FormConteudo: ${this.form.get('conteudo')?.value}`);    
    });   
  };

  editarPensamento() {
    this.service.editar(this.form.value).subscribe(() => {
      alert("Pensamento Editado")
      this.router.navigate(['/listarPensamento']);
    })
  };

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  };

  habilitarBotao(){
    return this.form.valid ? 'botao' : 'botao__desabilitado'
  }
};
