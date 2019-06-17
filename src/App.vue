<template lang="pug">
	#app

		div#back
			a.button.is-primary(v-if='state=="consulta"' @click="toggleState('index')")
				span.icon
					i.fas.fa-arrow-left

		#index(v-if="state!='consulta'")
			.columns(v-for="c in cardList")
				card(v-bind:card="c" v-bind:key="c.id" @click.native="toggleState(c.state)")

		#consultFunc(v-if="state=='consulta'")
			fun_list

		#funFormModal.modal
			.modal-background(@click="closeModal()")
			.modal-card.form-card
				.modal-card-body
					fun_form
			button.modal-close.is-large(aria-label="close" @click="closeModal()")
		
		
</template>

<script>
import card from "./components/card.vue";
import fun_list from "./components/listFun.vue";
import fun_form from "./components/formFun.vue";

// Variables
var cardList = [
  {
    id: 0,
    img: "/images/card1.jpg",
    title: "Consulta Funcionários",
    state: "consulta"
  },
  {
    id: 1,
    img: "/images/card2.jpg",
    title: "Inserir Funcionário",
    state: "insert"
  }
];

// App
export default {
  name: "app",
  components: {
    card,
    fun_list,
    fun_form
  },
  data: function() {
    return {
      cardList: cardList,
      state: "index",
      funList: [],
      title: "Stone API"
    };
  },
  methods: {
    toggleState: function(ns) {
      this.state = ns;
      if (ns == "insert") this.openModal();
    },
    openModal: function() {
      document.getElementById("funFormModal").classList.add("is-active");
      document.getElementById("funFormModal").style.opacity = 1;
    },
    closeModal: function() {
      document.getElementById("funFormModal").classList.remove("is-active");
      this.toggleState("index");
    }
  }
};
</script>

<style lang="sass">
@import "bulma/sass/utilities/_all.sass"
@import "bulma/sass/grid/columns.sass"

#app 
	font-family: "Avenir", Helvetica, Arial, sans-serif 
	-webkit-font-smoothing: antialiased 
	-moz-osx-font-smoothing: grayscale 
	text-align: center 
	color: #2c3e50 
	margin-top: 20px 
body 
	padding: 20px 
	font: 14px "Lucida Grande", Helvetica, Arial, sans-serif 
a 
	color: #00B7FF 
#header 
	text-align: center 
.header-img 
	max-height: 100px 
#back
	padding: 10px
	text-align: left
.form-card
	border-radius: 5px

#funFormModal 
	opacity: 0

.fade-enter-active 
	animation: appear 1s 
@keyframes appear 
	0%
		opacity: 0
	100% 
		opacity: 1

</style>
