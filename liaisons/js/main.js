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
        brand: 'Vue Mastery',
        product: 'Socks',
        description: 'Une paire de bas de laine moelleuse et virtuelle.',
        image: 'liaisons/images/vmSocks-green-onWhite.jpg',
        lien_VM: 'https://www.vuemastery.com/',
        lien_plus: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        inventaire: 1,
        puer: false,
        details: ["80% coton", "20% polyester", "Non gendré"],
        dark: true,
        classesCommunes: {
            ombre: true,
            darkMode: false
        },
        stylesCouleursCommun: {
            'border': '4px solid #ddd',
            'margin-left': '10px',
        },
        variations: [
            {
                varId: 551,
                varCouleur: "Vert",
                varImage: 'liaisons/images/vmSocks-green-onWhite.jpg',
                stylesCouleurs: {
                    'background-color': 'green',
                },
            },
            {
                varId: 552,
                varCouleur: "Bleu",
                varImage: 'liaisons/images/vmSocks-blue-onWhite.jpg',
                stylesCouleurs: {
                    'background-color': 'blue',
                },
            }
        ],
        grandeurs: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        panier: 0
    },
    methods: {
        ajouter() {
            this.panier += 1;
        },
        retirer() {
            this.panier -= 1;
        },
        majProduct(varImage) {
            this.image = varImage;
            this.addClass('couleurBas--on');
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        }
    }
});
