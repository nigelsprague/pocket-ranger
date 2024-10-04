<script setup>
import Navbar from './components/Navbar.vue';



</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="container py-3">
      <section class="row text-cream justify-content-between align-items-center">
        <div class="col-5">
          <div class="d-flex justify-content-between">
            <a class="mdi mdi-facebook" href="https://www.facebook.com/nationalparkservice"> Facebook</a>
            <a class="mdi mdi-youtube" href="https://www.youtube.com/nationalparkservice"> Youtube</a>
          </div>
          <div class="d-flex justify-content-between">
            <a class="mdi mdi-twitter" href="https://x.com/natlparkservice"> Twitter</a>
            <a class="mdi mdi-instagram" href="https://www.instagram.com/nationalparkservice/"> Instagram</a>
          </div>
        </div>
        <div class="col-5">
          <div>
            <a class="footer-links" href="https://www.nps.gov/index.htm">NPS WEBSITE</a>
            <span> | </span>
            <a class="footer-links" href="https://www.nps.gov/aboutus/faqs.htm">NPS FAQ</a>
            <span> | </span>
            <a class="footer-links" href="https://www.usa.gov/">USA.GOV</a>
            <br />
            <a class="footer-links" href="https://www.nps.gov/aboutus/contactus.htm">CONTACT NATIONAL PARK SERVICE</a>
          </div>
        </div>
      </section>
    </div>
  </footer>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

footer {
  background-color: var(--bs-primary);
}

a {
  color: unset;
}

a:hover {
  text-decoration: underline;
}

.footer-links {
  font-size: smaller;
}
</style>
