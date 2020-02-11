/*
 * Exercice pour l'apprentissage de vue.js
 * Cours venant de Vue Mastery <https://www.vuemastery.com/courses>
 */



var app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        description: 'Une paire de bas de laine moelleuse et virtuelle.',
        // back up
        // image: 'liaisons/images/vmSocks-green-onWhite.jpg',
        // on va y aller par index à la place
        // pour entrer dans le tableau de la variation en cours
        enSolde: true,
        variationEnCours: 0,
        lien_VM: 'https://www.vuemastery.com/',
        lien_plus: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
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
                varQut: 9,
            },
            {
                varId: 552,
                varCouleur: "Bleu",
                varImage: 'liaisons/images/vmSocks-blue-onWhite.jpg',
                stylesCouleurs: {
                    'background-color': 'blue',
                },
                varQut: 10,
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
        // back up
        // majProduct(varImage) {
        //     this.image = varImage;
        // }
        // on màj le produit en entier pas seulement l'image
        majProduct(index) {
            this.variationEnCours = index;
            // console.log(index);
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variations[this.variationEnCours].varImage;
        },
        inventaire() {
            return this.variations[this.variationEnCours].varQut;
        },
        solde() {
            if (this.enSolde === true) {
                return this.brand + ' ' + this.product + ' sont en solde !';
            }
        }
    }
});
