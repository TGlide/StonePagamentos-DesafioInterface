<template lang="pug">
  transition(
    appear
    appear-active-class="fade-enter-active"
  )
    .card
      .card-img(:style="{ backgroundImage: `url('${card.img}')` }")
      .container
          h1.card-title {{ card.title }}
</template>

<script>
export default {
  name: "card",
  props: ["card"]
};
</script>

<style lang="sass" scoped>
$primary-color: #0db14b
.card 
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2) 
	transition: 0.3s 
	border-radius: 20px 
	min-width: 500px
	width: 50% 
	max-width: 610px 
	margin: 20px auto 
	text-align: center 
	color: $primary-color
  
	&:hover 
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3) 
		background-color: $primary-color
		color: white 
		cursor: pointer 
.card-img 
	min-height: 275px 
	background-size: 610px 
	overflow: hidden 
	background-repeat: no-repeat 
	background-position: center center 
	border-radius: 20px 20px 0 0 
	img 
		max-width: 100% 
		height: auto 
		border-radius: 20px 20px 0 0 
.container 
	padding: 5px 16px 
.card-title
	font-family: 'Montserrat', sans-serif
	font-weight: bold
</style>
