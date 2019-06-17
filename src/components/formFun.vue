<template lang="pug">
	transition(
		appear
		appear-active-class="fade-enter-active"
	)
		form(id="fun-form" @submit="checkForm") 
				.field
						label.label Nome
						.control
								input.input(type='text', id="nome" v-model="nome" placeholder='Nome' name="nome")
				.field
						label.label Cargo
						.control
								input.input(type='text', id="cargo" v-model="cargo" placeholder='Cargo' name="cargo")
				.field
						label.label Idade
						.control
								input.input(type='number' min="0"	id="idade" v-model="idade" placeholder='Idade' name="idade")
				
				.field.is-grouped
						.control
								button.button.is-success(id="submit" type="submit")
									span.icon.is-small
										i.fas.fa-check
									span Inserir
						p.help.is-success(v-if="success") Funcionário inserido

								

		

</template>

<script>
import axios from "axios";

export default {
  name: "fun-form",
  props: [],
  data: function() {
    return {
      errors: [],
      nome: null,
      idade: null,
      cargo: null,
      success: null
    };
  },
  methods: {
    checkForm: function(e) {
      e.preventDefault();

      document.getElementById("nome").classList.remove("is-danger");
      document.getElementById("idade").classList.remove("is-danger");
      document.getElementById("cargo").classList.remove("is-danger");

      this.success = null;

      if (
        this.nome &&
        this.cargo &&
        !isNaN(this.idade - parseFloat(this.idade))
      ) {
        var bodyFormData = new FormData();
        bodyFormData.set("nome", this.nome);
        bodyFormData.set("idade", this.idade);
        bodyFormData.set("cargo", this.cargo);

        document.getElementById("submit").classList.add("is-loading");

        var self = this;
        axios({
          method: "post",
          url: "http://localhost:5010/api/v1/funcionarios",
          data: bodyFormData,
          config: { headers: { "Content-Type": "multipart/form-data" } }
        })
          .then(function(response) {
            console.log(response);
            document.getElementById("submit").classList.remove("is-loading");
            self.success = true;
          })
          .catch(function(response) {
            console.log(response);
            document.getElementById("submit").classList.remove("is-loading");
          });
      }

      if (!this.nome) {
        document.getElementById("nome").classList.add("is-danger");
      }
      if (!this.idade) {
        document.getElementById("idade").classList.add("is-danger");
      }
      if (!this.cargo) {
        document.getElementById("cargo").classList.add("is-danger");
      }
      console.log(this.nome, this.cargo, this.idade);
    }
  }
};
</script>

<style scoped lang='sass'>
</style>