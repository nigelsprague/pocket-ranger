<script setup>

</script>

<template>
  <!-- + Readme/About Page of app problem statement, concept, description, contributors, and languages/tools used -->
  <div class="container-fluid p-0">
    <div class="sectional light justify-content-evenly">
      <div>
        <img src="../assets/img/pr-logo-alt.png" alt="alt pocket ranger logo" class="sectional-img">
      </div>
      <div class="w-50">
        <h1>About Pocket Ranger</h1>
        <p>For Pocket Ranger, we looked at the existing process of researching and visiting national parks and decided
          that we wanted to improve and streamline the experience by making an app that has all the needed information
          in
          one spot and allows the user to keep up-to-date on alerts and events in selected national parks.</p>
      </div>
    </div>
    <div class="sectional justify-content-evenly">
      <div class="w-50 text-end">
        <h2>Concepts and Tools Used</h2>
        <p>To do this, we wanted to retrieve and display the relevant data from the National Parks Service API using
          HTML,
          CSS, and JS while utilizing the frameworks of Bootstrap, ExpressJs, and Vue. We also employ Mongoose and
          MongoDB in our backend.</p>
        <p>Our maps are powered using the HERE Maps API.</p>
      </div>
      <div>
        <img src="../assets/img/vue-logo.png" alt="vue logo" class="sectional-img ms-3">
      </div>
    </div>
    <div>
      <div class="sectional light">
        <div class="w-70">
          <h2>Contributors</h2>
          <div class="d-flex align-items-center">
            <div>
              <img src="" alt="">
            </div>
            <div>
              <h4>Autumn Page</h4>
              <p>Bio here</p>
              <h2>
                <a href="https://github.com/seasonofleaves">
                  <i class="mdi mdi-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/autumneckley/">
                  <i class="mdi mdi-linkedin"></i>
                </a>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div class="sectional justify-content-end">
        <div class="w-70 text-end">
          <div>
            <h4>Matthew Marchal</h4>
            <p>I was initially introduced to web and software development in high school, and pursued it for a couple
              years after, but took an extended break from programming for many years. CodeWorks has been a huge help on
              my journey to refamiliarize myself with the development world and the Pocket Ranger site specifically has
              been a great opportunity to collaborate with others and practice with skills and technologies we all were
              interested in working with.</p>
            <h2>
              <a href="https://github.com/santyclause">
                <i class="mdi mdi-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/matthewmarchal/">
                <i class="mdi mdi-linkedin"></i>
              </a>
            </h2>
          </div>
          <div>
            <img src="" alt="">
          </div>
        </div>
      </div>
      <div class="sectional light">
        <div class="w-70">
          <div>
            <img src="" alt="">
          </div>
          <div>
            <h4>Nigel Sprague</h4>
            <p>Hello, I am Nigel. Aside from learning web and software development skills, I am spending most of my time
              skateboarding, reading, or (most likely) working in filmmaking and the arts. With a passion for
              storytelling, a deep appreciation for the visual, and an ever expanding development toolset, I am excited
              to see where I can take the skills I have learned from the fall 2024 Codeworks cohort. Pocket Ranger
              allowed me to work both collaboratively and creatively on a team, gaining a better understanding of a
              project's journey from start to finish. Thank you to the Codeworks instructors, and to you for visiting
              our
              page.</p>
            <h2>
              <a href="https://github.com/nigelsprague">
                <i class="mdi mdi-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/nigelsprague/">
                <i class="mdi mdi-linkedin"></i>
              </a>
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sectional {
  display: flex;
  align-items: center;
  padding: 2em;
}

.sectional-img {
  max-width: 20vw;
}

.light {
  background-color: var(--offwhite);
}

.w-70 {
  width: 70%;
}

@media (max-width: 768px) {
  .sectional {
    flex-direction: column;
  }
}
</style>