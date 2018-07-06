
/**
 * Relation Modeling can be done in 2 ways:
 * 1.Using references (Normalization)
 * let author = {
 *  name:'Ejmin'
 * }
 * 
 * let course = {
 * 
 *  //this will be the id string of the autor ejmin
 *  author:'id'
 * }
 * 
 * 2.Using embedded Documents (Denormalization)
 * 
 * let course = {
 *  author: {
 *      name:'Ejmin'
 *  }
 * }
 * 
 * 3. Hybrid 
 * let author ={
 *  name: 'Mosh'
 * }
 * 
 * let course = {
 *  author:{
 *   id: 'ref',
 *   name: 'Ejmin', 
 *  }
 * }
 */

 