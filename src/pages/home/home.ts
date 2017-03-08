import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private jogo_iniciado;
  private jogo_encerrado;
  private vez;
  private mostrar_cartas;

  private qtd_baralhos;
  private baralho;
  private cartas_jogador;
  private valor_jogador;
  private cartas_banca;
  private valor_banca;
  private ganhador;

  private lista_naipes = [
    {
      nome: 'Espadas',
      nome_img: 'spades'
    }, {
      nome: 'Copas',
      nome_img: 'hearts'
    }, {
      nome: 'Paus',
      nome_img: 'clubs'
    }, {
      nome: 'Ouros',
      nome_img: 'diamonds'
    }
  ];

  private valores_cartas = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

  constructor(public navCtrl: NavController) {
    // this.jogo_iniciado = false;
    this.jogo_iniciado = true;
    this.jogo_encerrado = false;
    this.vez = 'Jogador';
    this.mostrar_cartas = false;

    this.qtd_baralhos = 2;
    this.baralho = new Array();
    this.cartas_jogador = new Array();
    this.cartas_banca = new Array();
    this.valor_jogador = 0;
    this.valor_banca = 0;

    this.embaralhar_cartas();
    this.distribuir_cartas_iniciais();
  }

  iniciar_jogo() {
    this.jogo_iniciado = true;
  }

  embaralhar_cartas() {
    let cartas = new Array();
    for(let i=0; i<this.qtd_baralhos; i++) {
      this.lista_naipes.forEach(naipe => {
        this.valores_cartas.forEach(valor => {
          let carta = {
            naipe: naipe,
            valor: valor,
            img: `/assets/svg/${ valor }_of_${naipe.nome_img}.svg`
          }
          cartas.push(carta);
        });
      });
    }
    this.baralho = cartas.sort(function() { return 0.5 - Math.random() });
  }

  distribuir_cartas_iniciais() {
    this.puxar_carta('Jogador',true);
    this.puxar_carta('Banca',true);
    this.puxar_carta('Jogador',true);
    this.puxar_carta('Banca',true);
  }

  puxar_carta(player, mostrar_valor=false) {
    let carta = this.baralho.pop();
    carta.visivel = mostrar_valor;

    if (player == "Jogador") {
      this.cartas_jogador.push(carta);
      this.valor_jogador += this.get_valor_carta(carta);
      console.log('Jogador: ' + this.valor_jogador);

      if (this.valor_jogador >= 21) {
        this.encerrar_jogo();
      }
      
    } else {
      this.cartas_banca.push(carta);
      this.valor_banca += this.get_valor_carta(carta);
      console.log('Mesa: ' + this.valor_banca);

      if (this.valor_banca >= 21) {
        this.encerrar_jogo();
      }
    }
  }

  encerrar_jogo() {
    this.jogo_encerrado = true;
    this.cartas_banca.forEach(carta => {
      carta.visivel = true;
    });

    if (this.valor_banca > 21) {
      this.ganhador = 'Jogador';
      console.log('O Jogador venceu!');
    } else if (this.valor_jogador > 21) {
      this.ganhador = 'Banca';
      console.log('A Banca venceu!');
    } else if (this.valor_jogador > this.valor_banca) {
      this.ganhador = 'Jogador';
      console.log('O Jogador venceu!');
    } else if (this.valor_jogador < this.valor_banca) {
      this.ganhador = 'Banca';
      console.log('A Banca venceu!');
    } else {
      this.ganhador = null;
      console.log('Empate!');
    }
  }

  passar_vez_para(player) {
    this.vez = player;

    if (player == "Banca") {
      if (this.valor_banca <= 17) {
        this.puxar_carta('Banca', false);
      }
      this.passar_vez_para('Jogador');
    }
  }

  reiniciar_jogo() {
    this.jogo_iniciado = true;
    this.jogo_encerrado = false;
    this.vez = 'Jogador';
    this.mostrar_cartas = false;

    this.qtd_baralhos = 2;
    this.baralho = new Array();
    this.cartas_jogador = new Array();
    this.cartas_banca = new Array();
    this.valor_jogador = 0;
    this.valor_banca = 0;

    this.embaralhar_cartas();
    this.distribuir_cartas_iniciais();
  }

  get_valor_carta(carta) {
    let valor;

    switch(carta.valor) {
      case 'ace':
        valor = 1;
        break;
      case 'jack':
        valor = 10;
        break;
      case 'queen':
        valor = 10;
        break;
      case 'king':
        valor = 10;
        break;
      default:
        valor = +carta.valor;
    }

    return valor;
  }

  get cartas_a_serem_viradas_jogador() {
    return Array(5-this.cartas_jogador.length).fill('');
  }

  get cartas_a_serem_viradas_banca() {
    return Array(5-this.cartas_banca.length).fill('');
  }
}
