import { Component, OnInit } from '@angular/core';

import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lowercaseValidator } from '../editar-pensamento/lowercase';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      conteudo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/), 
        ]),
      ],
      autoria: [
        '',
        Validators.compose([
          Validators.required,
          lowercaseValidator,
          Validators.minLength(3)
        ]),
      ],
      modelo: ['modelo1'],
    });
  }

  criarPensamento(): void {

    if (this.form.valid) {
      this.service.criar(this.form.value).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(){
    return this.form.valid ? 'botao' : 'botao__desabilitado'
  }
}
