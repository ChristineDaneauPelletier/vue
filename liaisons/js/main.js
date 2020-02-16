/*
 * Exercice pour l'apprentissage de vue.js
 * Cours venant de Vue Mastery <https://www.vuemastery.com/courses>
 */

// ** exemple de base pour le 2 ways data binding
// Vue.component('produit__avis', {
//     props: {},
//
//     // HTML
//     //---------------------------------------------------------
//     template: `
//     <div><input v-model="valeur" type="text"></div>
//     `,
//
//     // VARIABLES
//     //---------------------------------------------------------
//     data() {
//         return{
//             valeur: null,
//         }
//     }
// });
Vue.component('produit__avis', {
    props: {},

    // HTML
    //---------------------------------------------------------
    template: `
    <form class="review-form" @submit.prevent="onSubmit" novalidate >
    
    <p v-if="arrErreurs.length"></p>
        <b>Veuillez corriger ces erreur(s) : </b>
        <ul>
        <li v-for="erreur in arrErreurs">{{ erreur }}</li>
</ul>
    <p>
        <label for="nom">Nom : </label>
        <input v-model="valueNom" id="nom" type="text" required >
    </p>
    <p>
        <label for="avis">Avis : </label>
        <textarea v-model="valueAvis" id="avis" cols="30" rows="10" required></textarea>
    </p>
    <p>
        <label for="note">Note : </label>
        <select v-model.number="valueNote" id="note" required >
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
        </select>
    </p>
    <p>
        <p>Recommenderiez-vous ce produit ?</p>
        <label for="oui">Oui</label>
        <input v-model="valueRecommender" id="oui" value="oui" type="radio" name="recommender" required >
        <label for="non">Non</label>
        <input v-model="valueRecommender" id="non" value="non" type="radio" name="recommender" >
    </p>
    <p>
        <input type="submit" value="Soumettre">
    </p>
    </form>
    `,

    // VARIABLES
    //---------------------------------------------------------
    data() {
        return{
            valueNom: null,
            valueAvis: null,
            valueNote: null,
            valueRecommender: null,
            arrErreurs: [],
        }
    },

    // MÉTHODES
    //---------------------------------------------------------
    methods: {
        onSubmit() {
            if (this.valueNom && this.valueNote && this.valueAvis && this.valueRecommender) {
                let produitAvis = {
                    nom: this.valueNom,
                    avis: this.valueAvis,
                    note: Number(this.valueNote),
                    recommender: this.valueRecommender,
                };

                this.$emit('avis-soumis', produitAvis);

                // reset
                this.valueNom = null;
                this.valueAvis = null;
                this.valueNote = null;
                this.valueRecommender = null;
                this.arrErreurs.splice(0);
            }
            else {
                if (!this.valueNom) {
                    this.arrErreurs.push('Veuillez entrer votre nom.');
                }
                if (!this.valueNote) {
                    this.arrErreurs.push('Veuillez selectionner une note sur 5.');
                }
                if (!this.valueAvis) {
                    this.arrErreurs.push('Veuillez composer un avis.');
                }
                if (!this.valueRecommender) {
                    this.arrErreurs.push('Veuillez dire oui ou non.');
                }
            }
        }
    }

});

Vue.component('produit__details', {
    props: {
        details: {
            type: Array,
            required: true,
        },
        dark: {
            type: Boolean,
            required: true,
        }
    },

    // HTML
    //---------------------------------------------------------
    template: `

                <!-- ------------------------------------------------------------------ -->
                <!-- DÉTAILS - DARK MODE / BOUCLE FOREACH -->
                <!-- ------------------------------------------------------------------ -->
                <!--La classe darkMode est là seulement si le data dark est à true-->
                <!--On aurait pu l'écrire comme ça: darkMode: dark === true-->
                <ul :class="{ darkMode: dark }">
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>`,
});

Vue.component('produit', {
    props: {
      premium: {
          type: Boolean,
          required: true,
      }
    },

    // HTML
    //---------------------------------------------------------
    template: ` <div id="app">

        <div class="product">

            <!-- ------------------------------------------------------------------ -->
            <!-- BINDING SUR LA SRC -->
            <!-- ------------------------------------------------------------------ -->
            <div class="product-image">
                <img :src="image" />
            </div>

            <div class="product-info">

                <!-- ------------------------------------------------------------------ -->
                <!-- UTILISATION DE DATA (SIMPLE)-->
                <!-- ------------------------------------------------------------------ -->
                <h1>{{ title }}</h1>

                <!-- ------------------------------------------------------------------ -->
                <!-- CONDITIONS DANS :CLASS / ? -->
                <!-- ------------------------------------------------------------------ -->
                <p :style="{ 'padding': '20px' }" :class="[dark? classesCommunes: '' ]">{{ description }}</p>


                <!-- ------------------------------------------------------------------ -->
                <!-- MINI TEMPLATE POUR LES DÉTAILS -->
                <!-- ------------------------------------------------------------------ -->
                <produit__details :details="details" :dark="dark"></produit__details>

                <!-- ------------------------------------------------------------------ -->
                <!-- UTILISATION DU PROPS PREMIUM / SHIPPING-->
                <!-- ------------------------------------------------------------------ -->
                <p>L'utilisateur est premium : {{ premium }}</p>
                <p>Livraison : {{ livraison }}</p>
                
                <!-- ------------------------------------------------------------------ -->
                <!-- CONDITIONS IF ELSE -->
                <!-- ------------------------------------------------------------------ -->
                <!--Quantité en inventaire-->
                <p v-if="inventaire >= 10">En stock</p>
                <p v-else-if="inventaire < 10 && inventaire > 0">
                    Bientôt en rupture de stock !
                    <br>Quantité restante : {{ inventaire }}
                </p>
                <p v-else>Présentement en rupture de stock</p>

                <!--En solde (rabais)-->
                <p v-if="enSolde === true">{{ solde }}</p>

                <!-- ------------------------------------------------------------------ -->
                <!-- GRANDEURS - BOUTON RADIO -->
                <!-- ------------------------------------------------------------------ -->
                <ul class="liste__radio">
                    <li v-for="grandeur in grandeurs">
                        <!--Ici, on utilise le v-bind (:) pour avoir des attributs (id et for) dynamiques! :D -->
                        <input
                          type="radio"
                          name="grandeur"
                          :id="grandeur"
                          class="screen-reader-only">
                        <label :for="grandeur">{{ grandeur }}</label>
                    </li>
                </ul>

                <!-- ------------------------------------------------------------------ -->
                <!-- BOÎTES DE COULEUR / VARIATIONS - BIND DES OBJETS DE STYLES / CLASS -->
                <!-- ------------------------------------------------------------------ -->
                <div class="flex">
                    <div v-for="(variation, index) in variations"
                         @mouseover="majProduct(index)"
                         :key="variation.varId"
                         class="couleurBas"
                         :class="classesCommunes">
                        Voir en {{ variation.varCouleur }}
                       <span class="color-box"
                             :style="[ variation.stylesCouleurs, stylesCouleursCommun ]"></span>
                    </div>
                </div>

                <!-- ------------------------------------------------------------------ -->
                <!-- HYPERLIEN DYNAMIQUE ET SHOW CONDITIONNEL -->
                <!-- ------------------------------------------------------------------ -->
                <p>
                    <a :href="lien_plus">Plus de bas<span v-show="puer"> puants </span>!</a>
                </p>

            </div>
            
            <!-- ------------------------------------------------------------------ -->
            <!-- LE PANIER ET SES BOUTONS - ÉVÉNEMENTS / DISABLED / === -->
            <!-- ------------------------------------------------------------------ -->
    
            <div class="flex boutons">
                <!--Ici, on utilise le v-on (@) pour ajouter des écouteurs d'événement -->
                <!--Utilisation de binding (:) pour l'activation / classe d'activation des boutons-->
                <button @click="ajouter"
                        :disabled="inventaire === 0"
                        :class="{ disabledButton: inventaire === 0 }">
                    Ajouter au panier</button>
                <button @click="retirer"
                        :disabled="arrPanier === 0"
                        :class="{ disabledButton: arrPanier === 0 }">
                    Retirer du panier</button>
            </div>

            <!-- ------------------------------------------------------------------ -->
            <!-- AVIS DES ACHETEURS -->
            <!-- ------------------------------------------------------------------ --> 
            <div class="avis">
                <h2>Avis des acheteurs</h2>
                <p v-if="arrAvis == 0">Il n'y a aucun avis pour le moment.</p>
                <ul>
                    <li v-for="avis in arrAvis">
                    <p>Nom : {{ avis.nom }}</p>
                    <p>Note : {{ avis.note }}</p>
                    <p>Avis : {{ avis.avis }}</p>
                    <p>Recommenderait : {{ avis.recommender }}</p>
                    </li>
                </ul>
            </div>
                <produit__avis @avis-soumis="ajouterAvis"></produit__avis>
            
        </div>

    </div> `,

    // VARIABLES
    //---------------------------------------------------------
    data() {
        return {
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
            arrPanier: null,
            arrAvis: []
        }
    },

    // METHODES
    //---------------------------------------------------------
    methods: {
        ajouter: function() {
            this.$emit('ajouter-au-panier', this.variations[this.variationEnCours].varId)
        },
        retirer() {
            this.$emit('retirer-du-panier', this.variations[this.variationEnCours].varId)
        },
        // back up
        // majProduct(varImage) {
        //     this.image = varImage;
        // }
        // on màj le produit en entier pas seulement l'image
        majProduct(index) {
            this.variationEnCours = index;
            // console.log(index);
        },
        ajouterAvis(produitAvis) {
            this.arrAvis.push(produitAvis);
        }
    },

    // DONNÉES CALCULÉES
    //---------------------------------------------------------
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
        },
        livraison() {
            if (this.premium === true) {
                return 'Gratuit';
            }
            else {
                return '2.99 $'
            }
        }
    }
});



var app = new Vue({
    el: '#app',

    // VARIABLES
    //---------------------------------------------------------
    data: {
        premium: false,
        arrPanier: [],
    },

    // METHODES
    //---------------------------------------------------------
    methods: {
        MAJajoutPanier(id) {
            this.arrPanier.push(id);
        },
        // bug!! ?????????????????????????????????
        MAJretirerPanier(id) {
            for( var i = 0; i < this.arrPanier.length; i++){
                if ( this.arrPanier[i] === id) {
                    this.arrPanier.splice(i, 1);
                }
            }
        },
    },

    // DONNÉES CALCULÉES
    //---------------------------------------------------------
});
