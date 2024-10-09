import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /**@type {import('./models/Park.js').Park[]} */
  parks: [],
  favoritedParks: [],
  visitedParks: [],
  parkQuery: '',
  currentPage: 0,
  totalPages: 0,
  displayCurrentPage: 0,
  /**@type {import('./models/Park.js').Park} */
  activePark: null,
  /**@type {import('./models/ThingsToDo.js').ThingsToDo[]} */
  thingsToDo: [],
  /**@type {import('./models/Alert.js').Alert[]} */
  alerts: [],
  /**@type {import('./models/Article.js').Article[]} */
  articles: [],
  /** @type {import('./models/Post.js').Post[]} */
  posts: [],
    /** @type {import('./models/Review.js').Review[]} */
    reviews: [],
  /** @type {import('./models/Follower.js').Follower[]} */
  followers: [],
  mapMarkers: [],
  parkList: 'acad,arch,badl,bibe,bisc,blca,brca,cany,care,cave,chis,cong,crla,cuva,dena,deva,drto,ever,jeff,gaar,glac,glba,grca,grsa,grte,grba,grsm,gumo,hale,havo,hosp,indu,isro,jotr,katm,kefj,kova,lacl,lavo,maca,meve,mora,neri,noca,npsa,olym,pefo,pinn,redw,romo,sagu,seki,shen,thro,viis,voya,whsa,wica,wrst,yell,yose,zion'
})

