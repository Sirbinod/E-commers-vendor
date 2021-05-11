import axios from 'axios';

export const SCATA_START = 'SCATA_START';
export const LOAD_NEW_CATA = 'LOAD_NEW_CATA';

const catachkStart = ()=>{
    return {
        type:SCATA_START
    }
}
function loadcatas(catas) {
  return {
    type: LOAD_NEW_CATA,
    catas,
  };
}


export const getcategorystart = () => dispatch=>{
       dispatch(catachkStart());
  
axios({
  method: 'get',
  url: 'https://haatbazaar.herokuapp.com/api/v1/public/category/main/list',
  })
  .then(function (response) {
    dispatch(loadcatas(response.data.data));

    })
    .catch(function (error) {
      console.log(error)
    
  });


}



