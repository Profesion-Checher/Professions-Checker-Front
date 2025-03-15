<script setup>
</script>

<template>
  <header class="header">
    <nav class="nav-bar">
      <h1 class="app-name">Professions Checker</h1>
      <div class="nav-buttons">
        <RouterLink to="/" class="nav-option">Inicio</RouterLink>
        <RouterLink to="/professions" class="nav-option">Profesiones</RouterLink>
        <RouterLink to="/companies" class="nav-option">Empresas</RouterLink>
        <RouterLink to="/about" class="nav-option">Nosotros</RouterLink>
      </div>
    </nav>
  </header>  
</template>

<style scoped>
  /*
  :root {
    --primary-color: #DC3545 ; Rojo
    --secondary-color: #F8F9FA ; Blanco
    --tertiary-color: #343A40; Gris

    --text-color: #212529; 
    --hover-color: #C82333;

    --font-size-base: 16px;
    --font-family: Arial, sans-serif;
  }
  */

  /* Estilos del header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--primary-color);
  padding: 20px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.header:hover {
  transform: translateY(-10px);
}


/* Barra de navegación con flexbox */
.nav-bar {
  display: flex;
  align-items: center;
  width: 90%;
  justify-content: space-between;
}

/* Estilos del nombre de la aplicación */
.app-name {
  font-size: 24px;
  font-weight: bold;
  color: var(--secondary-color);
  margin: 0;
}

.nav-buttons {
  display: flex;
  gap: 20px;
}


/* Estilos de los enlaces */
.nav-option {
  color: var(--secondary-color);
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  padding: 8px 12px;
  transition: background-color 0.3s, color 0.3s;
}

/* Efecto hover */
.nav-option:hover {
  background-color: var(--secondary-color);
  color: var(--hover-color);
  border-radius: 5px;
}
</style>
