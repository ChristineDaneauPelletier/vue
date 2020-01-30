/**
 * @author Christine Daneau-Pelletier <christine.daneau.pelletier@gmail.com>
 */

export class Intro {
    //////////////////////////////////////////////////////
    // ATTRIBUTS //
    //////////////////////////////////////////////////////
    private refBtnCommencer:HTMLInputElement = null;

    private sortirIntro_lier:any = null;
    private debuterQuiz_lier:any = null;


    //////////////////////////////////////////////////////
    // MÉTHODES //
    //////////////////////////////////////////////////////

    // Constructeur & initialiser
    ///////////////////////////////////////////////////////////////////////////////
    public constructor() {
        // Déclaration des variables
        this.refBtnCommencer = document.querySelector('.boutonCommencer');

        // Écouteurs d'évènements
        this.sortirIntro_lier = this.sortirIntro.bind(this);

        // // // // // // // Animations d'entrée // // // // // // //
        $('.intro__titre').addClass('slideInDown--2');
        $('.description').addClass('slideInDown--1');
        $('.boutonCommencer').addClass('slideInUp--1').one('click', this.sortirIntro_lier);
        $('.boutonCommencer__lien').addClass('disabled');
        setTimeout(this.initialiser, 200);

    }

    /**
     * Définit l'état initial de l'App
     */
    private initialiser():void {
        // // // // // // // Animations d'entrée // // // // // // //
        $('.intro').addClass('inspecteurIntro--anim transition');
    }

    private sortirIntro():void {
        $('.intro__titre').removeClass('slideInDown--2').addClass('slideOutUp--1');
        $('.description').removeClass('slideInDown--1').addClass('slideOutUp--2');
        $('.boutonCommencer').removeClass('slideInUp--1 disabled').addClass('slideOutDown--1');
        $('.intro').removeClass('inspecteurIntro--anim');
        setTimeout(this.debuterQuiz, 800);
    }

    private debuterQuiz():void {
        $( location ).attr("href", "quiz.html");
    }
}