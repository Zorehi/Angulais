import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  questions: {question: string, answer: boolean, how: string}[] = [
    {
      question: 'Les voitures electriques produisent plus de Co2',
      answer: false,
      how: 'Vrai pour la prod faux pour le long terme'
    },
    {
      question: ' Les océans sont des réserves à Co2',
      answer: true,
      how: 'Vrai mais l\'acidification des eaux peut nuire à la biodiversité'
    },
    {
      question: 'Les politiques écologiques suffisent à endiguer le problème',
      answer: false,
      how: 'Faux la majorité est d’accord sur l\'existence du réchauffement climatique'
    },
    {
      question: 'Les hivers froids cesseront d’exister',
      answer: false,
      how: 'Faux des temperatures extreme arriveront toujours voir plus fréquent'
    },
    {
      question: 'Les scientifiques redoutent la fonte des glaces à cause de la potentielle monté des eaux',
      answer: false,
      how: 'Faux ils redoutent plus l’effet boule de neige de la libération de grande qté de méthane dans l\'atmosphère'
    },
    {
      question: 'Les BRICS sont les principaux acteurs du réchauffement climatique',
      answer: false,
      how: 'Faux, tous les pays industrialisés sont responsables du réchauffement climatique'
    },
    {
      question: 'Il n’y a pas d’alternative sérieuse au kérosène dans les avions',
      answer: true,
      how: 'Vrai l\'hydrogène n’est pas une solution viable il peut être utilisé qu\'à une faible proportion'
    },
    {
      question: 'Des grandes mégalopole comme Tokyo ou New York seront victimes du réchauffement climatique',
      answer: true,
      how: 'Vrai elles sont construites sous le niveau de la mer donc la montée des eaux est un risque'
    },
    {
      question: 'L’Homme s’est toujours adapté spontanément',
      answer: false,
      how: 'Faux on a aucune preuve que notre société puisse s’adapter à ces changements'
    }
  ];
}
