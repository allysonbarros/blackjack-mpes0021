import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private jogo_iniciado;
  private mostrar_cartas;

  private baralho;
  private cartas_jogador;
  private valor_jogador;
  private cartas_mesa;
  private valor_mesa;

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
    this.jogo_iniciado = false;
    this.mostrar_cartas = false;

    this.baralho = new Array();
    this.cartas_jogador = new Array();
    this.cartas_mesa = new Array();
    this.valor_jogador = 0;
    this.valor_mesa = 0;

    this.embaralhar_cartas();
    this.distribuir_cartas_iniciais();
  }

  iniciar_jogo() {
    this.jogo_iniciado = true;
  }

  embaralhar_cartas() {
    let cartas = new Array();
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
    this.baralho = cartas.sort(function() { return 0.5 - Math.random() });
  }

  distribuir_cartas_iniciais() {
    this.puxar_carta();
    this.puxar_carta();
  }

  puxar_carta() {
    let carta;

    carta = this.baralho.pop();
    this.cartas_jogador.push(carta);
    this.valor_jogador += this.get_valor_carta(carta);
    console.log('Jogador: ' + this.valor_jogador);
      
    carta = this.baralho.pop();
    this.cartas_mesa.push(carta);
    this.valor_mesa += this.get_valor_carta(carta);
    console.log('Mesa: ' + this.valor_mesa);
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
}
