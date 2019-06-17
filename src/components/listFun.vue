<template lang="pug">
	transition(
		appear
		appear-active-class="fade-enter-active"
	)
		div
			button.button.is-link(@click="toggleFilters()")
				span.icon.is-small
					i.fas.fa-filter
				span Filtros
			form(id="filter-form"	style="display: none" @submit="applyFilters") 
				.field
						label.label Nome
						.control
								input.input(type='text', id="nomeFilt" v-model="nome" placeholder='Nome' name="nome")
				.field
						label.label Cargo
						.control
								input.input(type='text', id="cargoFilt" v-model="cargo" placeholder='Cargo' name="cargo")
				.field
						label.label Idade
						.control
								input.input(type='number' min="0"	id="idadeFilt" v-model="idade" placeholder='Idade' name="idade")
				
				.field.is-grouped
						.control
								button.button.is-success(id="submit" type="submit")
									span.icon.is-small
										i.fas.fa-filter
									span Filtrar
									.control
								button.button.is-danger(id="limpar" @click="limparFilters")
									span.icon.is-small
										i.fas.fa-eraser
									span Limpar Filtros
			table.table
				thead
						tr 
							th Nome
							th Cargo
							th Idade
				tbody
					tr(v-for='f in funs')
						td {{ f.nome }}
						td {{ f.cargo }}
						td {{ f.idade }}

</template>

<script>
import axios from "axios";

export default {
  name: "fun-list",
  props: [],
  data: function() {
    return {
      funs: [],
      filter_show: false,
      nome: null,
      idade: null,
      cargo: null
    };
  },

  created: function() {
    this.getFun();
  },

  methods: {
    getFun() {
      axios
        .get("http://localhost:5010/api/v1/funcionarios")
        .then(response => {
          this.funs = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    toggleFilters() {
      var el = document.getElementById("filter-form");
      if (el.style.display == "block") el.style.display = "none";
      else el.style.display = "block";
    },
    limparFilters() {
      this.nome = null;
      this.cargo = null;
      this.idade = null;
      this.getFun();
    },
    applyFilters(e) {
      e.preventDefault();
      // this.nome = document.getElementById("nomeFilt").value;
      // this.cargo = document.getElementById("cargoFilt").value;
      // this.idade = document.getElementById("idadeFilt").value;

      axios
        .get("http://localhost:5010/api/v1/funcionarios", {
          params: { nome: this.nome, cargo: this.cargo, idade: this.idade }
        })
        .then(response => {
          this.funs = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped lang='sass'>
.table
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1)
	border-radius: 10px
	margin: 10px auto
	width: 90%

#filter-form
	// border: 2px solid black
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2)
	border-radius: 10px
	padding: 20px
	width: 60%
	max-width:600px
	height: 325px
	margin: 20px auto 30px
</style>