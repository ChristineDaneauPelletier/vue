/*
 * Exercice pour l'apprentissage de vue.js
 * Cours venant de Vue Mastery <>
 */

// Add a link to your data object, and use v-bind to sync it up
// with an anchor tag in your HTML.
// Hint: you’ll be binding to the href attribute.

var app = new Vue({
    el: '#app',
    data: {
        product: 'Bas',
        description: 'Une paire de bas de laine moelleuse et virtuelle.',
        image: 'liaisons/images/vmSocks-green-onWhite.jpg',
        lien_VM: 'https://www.vuemastery.com/',
        lien_plus: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        inventaire: 8,
        puer: false,
        details: ["80% coton", "20% polyester", "Non gendré"],
        variations: [
            {
                varId: 551,
                varCouleur: "Vert"
            },
            {
                varId: 552,
                varCouleur: "Bleu"
            }
        ],
        grandeurs: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        panier: 0,
    },

    methods: {
        ajouter: function () {
            this.panier += 1;
        }
    }
});
