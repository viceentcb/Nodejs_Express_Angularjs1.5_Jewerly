const axios = require('axios');
const { createApolloFetch } = require('apollo-fetch');


exports.cities = async () => {
  try {
    const res = await axios.get('http://b0d6a13d1629:3001/api/graphql', {

      params: {
        query: `
          {
            cities{
              slug
              name
              shop{
                slug
                name
              }
            }
          }
        `
      }
    })
    return (res.data.data.cities);
  } catch (err) {
    console.error(err);
  }
}

const uri = 'http://b0d6a13d1629:3001/api/graphql';
const apolloFetch = createApolloFetch({ uri });
let query = `
            {
              shops{
                slug
                name
                city{
                  slug
                  name
                }
              }
            }
          `;

exports.shops = async () => {
  try {
    const res = await apolloFetch({ query })
    return(res.data.shops)
  }catch (err){
    console.log(err)
  }
}

