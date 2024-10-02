import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /**@type {import('./models/Park.js').Park[]} */
  parks: [],
  /**@type {import('./models/Park.js').Park} */
  activePark: null,

  parkList: 'acad,arch,badl,bibe,bisc,blca,brca,cany,care,cave,chis,cong,crla,cuva,dena,deva,drto,ever,jeff,gaar,glac,glba,grca,grsa,grte,grba,grsm,gumo,hale,havo,hosp,indu,isro,jotr,katm,kefj,kova,lacl,lavo,maca,meve,mora,neri,noca,npsa,olym,pefo,pinn,redw,romo,sagu,seki,shen,thro,viis,voya,whsa,wica,wrst,yell,yose,zion'
})

